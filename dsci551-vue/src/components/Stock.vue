<template>
<!-- 这里决定网页样式 -->
<!-- b-container, b-row, b-col 用于网页布局 -->
  <div id="stock">
    <center><h1>Tesla Stock</h1></center>
    <b-container class="date-container">
      <b-row class="date-visual">
        <b-col cols="4"></b-col>
        <b-col cols="3" id="event-start" class="auto"></b-col>
        <b-col cols="3" id="event-end" class="auto"></b-col>
        <b-col></b-col>
      </b-row>
      <b-row align-h="between" align-v="center">
        <b-col cols="2">
          Date (range):
        </b-col>
        <b-col cols="10">
          <!-- 调用date-slider组件 -->
        <date-slider ></date-slider>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row align-h="between" align-v="center">
        <b-col cols="1">
          <!-- 调用stockdropdown组件 -->
          <stockDropdown/>
        </b-col>
        <b-col cols="10">
          <!-- 调用price slider的组件，bind了selected的数据 -->
        <price-slider :selected="selected" ></price-slider>
        </b-col>
      </b-row>
    </b-container>
      <p></p>
      <b-container>
      <b-row align-h="around">
        <b-col cols="2.5" class="mx-auto">
          <!-- 按钮，点击促发fetchData函数 -->
          <b-button @click="fetchData" variant="outline-primary">Search Stock Data</b-button>
        </b-col>
        <!-- <b-col cols="1.5" class="mx-auto">
          <b-button @click="searchArticle" variant="outline-primary">Search Article</b-button>
        </b-col> -->
      </b-row>
    </b-container>
    <b-container class="date-container">
      <!-- 制作表格，:items=是用来绑定表格数据的，fields相当于header，其他为表格特性设置 -->
      <b-table sticky-header :items="stock" :fields="fields" @row-clicked="back_home" :striped="striped" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left :hover="hover" head-variant="dark" responsive="sm"></b-table>
    </b-container>
  </div>
</template>

<script>
// 这里是写代码的地方
// 调用子组件及其他需要的文件
import db from "./firebaseInit";
import slider from "./slider";
import dropdown from "./stock_dropdown"
import date_slider from "./date_slider"
import { bus } from '../main'
export default {
  name: "stock",
  // 这个vue instance的data
  data() {
    return {
      selected: [26, 674],
      dateRange: null,
      priceRange: [242, 458],
      stockDate: '',
      sortBy: 'Date',
      sortDesc: false,
      striped: true,
      hover: true,
      result: [],
      stock: [],
      dates: [],
      // table用
      fields: [
          { key: 'Date', sortable: true },
          { key: 'Open', sortable: true },
          { key: 'High', sortable: true },
          { key: 'Low', sortable: true },
          { key: 'Close', sortable: true },
          { key: 'Volume', sortable: true }
      ]
    };
  },
  // 调用的子组件要在这里注册，前边的key是我给他们的命名，在template里面你可以看见它们的tag
  components: {
    'date-slider': date_slider,
    'price-slider': slider,
    'stockDropdown': dropdown
  },
  // 需要使用的函数在这里定义
  methods: {
    fetchData () {
      // clear data
      this.result = [];
      this.stock = [];
      // firebase query data, note that only one range query can be made each time
      db.collection('stock')
      .where("date",">=",`${this.dateRange[0]}`)
      .where("date","<=",`${this.dateRange[1]}`)
      .get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(this.priceRange);
          if (this.selected[0] === 26 && this.selected[1] === 674 && doc.data().Open <= this.priceRange[1] && doc.data().Open >= this.priceRange[0]) {          
            const res = {
                        'Date': new Date(parseInt(doc.data().date)).toISOString().slice(0,10),
                        'Open': doc.data().Open,
                        'High': doc.data().High,
                        'Low': doc.data().Low,
                        'Close': doc.data().Close,
                        'Volume': doc.data().Volume
            };
            this.result.push(res);
          } else if (this.selected[0] === 26 && this.selected[1] === 785 && doc.data().High <= this.priceRange[1] && doc.data().High >= this.priceRange[0]) {
            const res = {
                        'Date': new Date(parseInt(doc.data().date)).toISOString().slice(0,10),
                        'Open': doc.data().Open,
                        'High': doc.data().High,
                        'Low': doc.data().Low,
                        'Close': doc.data().Close,
                        'Volume': doc.data().Volume
            };
            this.result.push(res);
          } else if (this.selected[0] === 25 && this.selected[1] === 674 && doc.data().Low <= this.priceRange[1] && doc.data().Low >= this.priceRange[0]) {
            const res = {
                        'Date': new Date(parseInt(doc.data().date)).toISOString().slice(0,10),
                        'Open': doc.data().Open,
                        'High': doc.data().High,
                        'Low': doc.data().Low,
                        'Close': doc.data().Close,
                        'Volume': doc.data().Volume
            };
            this.result.push(res);
          } else if (this.selected[0] === 26 && this.selected[1] === 295 && doc.data().Close <= this.priceRange[1] && doc.data().Close >= this.priceRange[0]) {
            const res = {
                        'Date': new Date(parseInt(doc.data().date)).toISOString().slice(0,10),
                        'Open': doc.data().Open,
                        'High': doc.data().High,
                        'Low': doc.data().Low,
                        'Close': doc.data().Close,
                        'Volume': doc.data().Volume
            };
            this.result.push(res);
          } else if (this.selected[0] === 375800 && this.selected[1] === 47065000 && doc.data().Volume <= this.priceRange[1] && doc.data().Volume >= this.priceRange[0]) {
            const res = {
                        'Date': new Date(parseInt(doc.data().date)).toISOString().slice(0,10),
                        'Open': doc.data().Open,
                        'High': doc.data().High,
                        'Low': doc.data().Low,
                        'Close': doc.data().Close,
                        'Volume': doc.data().Volume
            };
            this.result.push(res);
          }
          })
        },
      );
      this.stock = this.result
      // this.dates = this.result;
    },
    // click the row will take back to the home page, with article on that date displayed
    back_home(row) {
      this.stockDate = row.Date;
      // redirect to the home page (which is 'TeslaArticles'), and also passing the data there!
      this.$router.push({ name: 'TeslaArticles', params: { date: this.stockDate } })
    },
  },
  watch: {
    // dates() {
    //   console.log(this.dates);
    //   // bus.$emit("backHomeSearch", this.dates)
    // }
  },
  // vue 组件被created（vue instance生命周期概念）的时候运行的东西，在这里我用来更新data，这些更新是子组件的event触发的[tips：子组件与父组件的通信（如data传递）是通过event来实现的（子组件里的$emit，对应父组件里面的相应event函数）]
  created() {
    // 我用that来指代这个vue instance，因为bus里面的this指代的是bus这个vue instance，它是我用来传data的载体
    const that = this;
    // 当stock attribute的选项改变时，改变相应的range数据
    bus.$on('updateRange', data => {
      that.selected = data;
    });
    // 传递用户滑动stock attribute 那边 slider的数据
    bus.$on('price_update', data => {
      that.priceRange = data;
    });
    // 传递用户滑动date attribute 那边 slider的数据
    bus.$on('date_update', data => {
      that.dateRange = data;
    });
  },
  // vue instance生命周期概念，比较常用
  mounted() {
    // const dates = this.result.map(function(o) { return o.Date; });
    // console.log(this.result)
  }
};
</script>

<style scoped>
/* 这里用来设置style */
h1 {
  margin-top: 2em;
  margin-bottom: 1.5em;
}
.date-container {
  margin-top: 1.5em;
  margin-bottom: 2.8em;
}
.date-visual {
  margin-bottom: 1.7em;
}
</style>