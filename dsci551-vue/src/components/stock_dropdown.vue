<template>
  <b-form-select v-model="selected" :options="options" class="stock-form-select" @change="slider_update_Range"></b-form-select>
</template>

<script>
import { bus } from '../main';
export default {
    name: "stock_dropdown",
    data() {
        return {
            selected: [26, 674],
            options: [
                {value: [26, 674], text: 'Open'},
                {value: [26, 785], text: 'High'},
                {value: [25, 674], text: 'Low'},
                {value: [26, 295], text: 'Close'},
                {value: [375800, 47065000], text: 'Volume'}
            ]
        }
    },
    methods: {
        slider_update_Range(e){
            bus.$emit("updateRange", this.selected)
        }
    },
};
</script>

<style scoped>
    .stock-form-select {
    width: 105px;
  }
</style>
