<template>
<!-- 这里决定网页样式 -->
<!-- b-container, b-row, b-col 用于网页布局 -->
  <div id="TeslaArticles">
    <center><h1>Tesla Article Search Engine</h1></center>
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
          <!-- 调用home-date-slider组件 -->
        <home-date-slider></home-date-slider>
        </b-col>
      </b-row>
    </b-container>
    <p></p >
    <b-container class="d-flex justify-content-center">
      <b-row align-v="center" align-h="between">
        <b-col cols="1.7">
          <b-form-select v-model="searchField" :options="search_options"></b-form-select>
          </b-col>
        <b-col cols="4">
          <b-form-input type="text" v-model="keyword" name="keyword" placeholder="Keyword"></b-form-input>
        </b-col>
        <b-col cols="1.7" >
          <b-form-select v-model="groupField" :options="group_options"></b-form-select>
        </b-col>
        <b-col align-h="end">
        <b-button @click="sqlArticle" variant="outline-primary">Search Article</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="date-container">
      <!-- 制作表格，:items=是用来绑定表格数据的，fields相当于header，其他为表格特性设置 -->
      <b-table sticky-header :items="articles" :fields="fields" @row-clicked="to_article" :striped="striped" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left :hover="hover" :fixed="fixed" head-variant="dark" responsive="sm"></b-table>
        <!-- <template #cell(Details)="row">
          <router-link v-bind:to="{name: 'article', params: {article_id: articles.article_id}}"> -->
            <!-- Need to change the button event !!!!! -->
            <!-- <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            </b-button>
          </router-link>
        </template> -->
    </b-container>
  </div>
</template>

<script>
// 这里是写代码的地方
// 调用子组件及其他需要的文件
import mysqlService from './mysqlService'
import home_date_slider from "./home_date_slider"
import { bus } from '../main'
export default {
  name: "TeslaArticles",
  // 调用的子组件要在这里注册，前边的key是我给他们的命名，在template里面你可以看见它们的tag
  components: {
    'home-date-slider': home_date_slider
  },
  // 这个vue instance的data
  data() {
    return {
      dateRange: null,
      keyword: '',
      searchField: 'Headline',
      search_options: [
        {value: 'Headline', text: 'Headline'},
        {value: 'Publisher', text: 'Publisher'},
        {value: 'Content', text: 'Content'},
        {value: 'Topic', text: 'Topic'},
      ],
      groupField: 'Date',
      group_options: [
        {value: 'Date', text: 'Date'},
        {value: 'Headline', text: 'Headline'},
        {value: 'Publisher', text: 'Publisher'},
        {value: 'Topic', text: 'Topic'},
      ],
      striped: true,
      hover: true,
      articles: [],

      // table用
      fields: [
          { key: 'Date', sortable: true},
          { key: 'article_id', sortable: true},
          { key: 'Headline', sortable: true},
          { key: 'Publisher', sortable: true},
          { key: 'Topic', sortable: true},
      ]
    };
  },
  // 需要使用的函数在这里定义
  methods: {
    // begin query articles in sql
    // given the size of table, I think it might be a good idea to put a button "details" under the content field, where users could click and be directed to the article page
    // retrieveArticles() {
    //   mysqlService.getAll()
    //     .then(response => {
    //       this.articles = response.data;
    //       console.log(response.data)
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   })
    // },

    sqlArticle () {
        console.log(this.searchField); // headline
        console.log(this.groupField); // date
        console.log(this.dateRange);
        console.log(this.keyword);
        //console.log(new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10));
        let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
        let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
        //console.log(start_date);
        //console.log(end_date);

        if (this.keyword == '') {
          let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
          let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
          mysqlService.getAll(this.groupField, start_date, end_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }

        else if (this.searchField == "Topic") {
          let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
          let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
          mysqlService.get_topic(this.keyword, this.groupField, start_date, end_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }

        else if (this.searchField == "Publisher") {
          let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
          let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
          mysqlService.get_publisher(this.keyword, this.groupField, start_date, end_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }

        else if (this.searchField == "Headline") {
          let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
          let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
          mysqlService.get_headline(this.keyword, this.groupField, start_date, end_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }

        else if (this.searchField == "Content") {
          let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
          let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
          mysqlService.get_content(this.keyword, this.groupField, start_date, end_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }

        if (this.searchField == "article_id") {
          let start_date = new Date(parseInt(this.dateRange[0])).toISOString().slice(0,10);
          let end_date = new Date(parseInt(this.dateRange[1])).toISOString().slice(0,10);
          mysqlService.get_articleId(this.keyword, this.groupField, start_date, end_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }

        /*mysqlService.getAll()
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })*/
    },

    // 实现跳转到对应article page的功能
    to_article (row){
      this.id = row.article_id;
      this.title = row.Headline;
      this.date = row.Date;
      this.publisher = row.Publisher;
      this.topic = row.Topic;
      console.log(this.topic);
      // redirect to the home page (which is 'TeslaArticles'), and also passing the data there!
      this.$router.push({ name: 'article', params: {id: this.id, title: this.title, publisher: this.publisher, topic:this.topic, date:this.date} })
    }
  },
  // vue 组件被created（vue instance生命周期概念）的时候运行的东西，在这里我用来更新data，这些更新是子组件的event触发的 [tips：子组件与父组件的通信（如data传递）是通过event来实现的（子组件里的$emit，对应父组件里面的相应event函数）]
  created() {
    // 我用that来指代这个vue instance，因为bus里面的this指代的是bus这个vue instance，它是我用来传data的载体
    const that = this;
    // 传递用户滑动date attribute 那边 slider的数据
    bus.$on('home_date_update', data => {
      that.dateRange = data;
      // console.log(that.dateRange)
    }); 

    // to access the selected row (date) from the stock page, we need to use this.$route.params.date!!! 
    // And do the sql article search with this parameter!! Note that we can only access it in/after the created lifecycle!!
    // call the 'sqlArticle' function to query the corresponding data here
    //console.log("I am the props", this.$route.params.date)
    if (typeof this.$route.params.date !== "undefined") {
          //console.log('back from stock');
          //console.log(this.$route.params.date);
          mysqlService.get_single_date(this.$route.params.date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        } else if (typeof this.$route.params.select_date !== "undefined") {
          //console.log('back from stock');
          //console.log(this.$route.params.date);
          mysqlService.get_single_date(this.$route.params.select_date)
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        } else if (typeof this.$route.params.select_topic !== "undefined") {
          //console.log('back from stock');
          //console.log(this.$route.params.date);
          mysqlService.get_topic(this.$route.params.select_topic, this.groupField, '2012-05-23', '2020-02-03')
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        } else if (typeof this.$route.params.select_publisher !== "undefined") {
          //console.log('back from stock');
          //console.log(this.$route.params.date);
          mysqlService.get_publisher(this.$route.params.select_publisher, this.groupField, '2012-05-23', '2020-02-03')
          .then(response => {
            this.articles = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        }
  },

  watch:{
    sqlArticle () {
      console.log(this.$route.params.date);
    },
  }
};
</script>

<style scoped>
  h1 {
    margin-top: 2em;
    margin-bottom: 1.7em;
  }
  .date-container {
    margin-top: 1.5em;
    margin-bottom: 2.8em;
  }
  .date-visual {
    margin-bottom: 1.7em;
  }
</style>