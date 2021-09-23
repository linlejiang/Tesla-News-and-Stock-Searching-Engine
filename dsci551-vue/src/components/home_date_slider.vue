<template>
  <div>
      <b-col ref="homeDateSlider" id="home_date_slider"></b-col>
  </div>
</template>

<script>
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import { bus } from '../main';
export default {
  name: "home_date_slider",
  data() {
    return {
      minDate: "1432364400000",
      maxDate: "1486105200000"    
    };
  },
  methods: {
    timestamp(a,b,c) {
        return new Date(a,b,c).getTime();
    },
    nth(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    formatDate(date) {
        let months = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        return date.getDate() + this.nth(date.getDate()) + " " +
            months[date.getMonth()] + " " +
            date.getFullYear();
    },
    createSlider() {
        const that = this;
        const home_date_slider = noUiSlider.create(this.$refs.homeDateSlider, {
            start: [this.timestamp(2015,4,23), this.timestamp(2017,1,3)],
            connect: true,
            range: {
            min: this.timestamp(2012,4,23),
            max: this.timestamp(2020,1,3)
            },
            step: 24 * 60 * 60 * 1000,
            format: wNumb({
            decimals: 0
            }),
        });
        home_date_slider.on("update", function(values, handle) {
            this[handle ? 'minDate' : 'maxDate'] = values[handle];
            that.minDate = this.get()[0];
            that.maxDate = this.get()[1];
            bus.$emit("home_date_update", [that.minDate, that.maxDate]);
            let dateValues = [
                document.getElementById('event-start'),
                document.getElementById('event-end')
            ];
            dateValues[handle].innerHTML = that.formatDate(new Date(+values[handle]));
        });
    },
  },
  mounted() {
    this.createSlider();
  }
};
</script>
