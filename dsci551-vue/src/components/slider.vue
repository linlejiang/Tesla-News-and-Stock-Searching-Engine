<template>
  <div ref="slider" id="price_slider"></div>
</template>

<script>
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import { bus } from '../main';
export default {
  name: "slider",
  props: ["selected"],
  components: {
  },
  data() {
    return {
      minPrice: this.selected[0],
      maxPrice: this.selected[1]
    };
  },
  methods: {
    createSlider() {
      const a = this.selected[0];
      const b = this.selected[1];
      const that = this;
      this.minPrice = (a + (b - a) / 3).toString();
      this.maxPrice = (b - (b - a) / 3).toString();
      const slider = noUiSlider.create(this.$refs.slider, {
        start: [a + (b - a) / 3, b - (b - a) / 3],
        connect: true,
        range: {
          min: a,
          max: b
        },
        step: 1,
        format: wNumb({
          decimals: 0
        }),
        tooltips: true
      });
      this.new_slider = slider;
      slider.on("set", function(values, handle) {
        this[handle ? "minPrice" : "maxPrice"] = values[handle];
        that.minPrice = this.get()[0];
        that.maxPrice = this.get()[1];
        bus.$emit("price_update", [+that.minPrice, +that.maxPrice]);
      });
    },
  },
  watch: {
    selected() {
      let a = this.selected[0];
      let b = this.selected[1];
      this.new_slider.updateOptions({
        range: {
            'min': a,
            'max': b
        },
        start: [a + (b - a) / 3, b - (b - a) / 3],
      });
    },
  },
  mounted() {
    this.createSlider();
  }
};
</script>
