<template>
    <div id = "Tarticle">
        <!--<table>
            <thead>
            <tr>
                <th>{{this.article_title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Topic: {{this.article_topic}}</td>
            </tr>
            <tr>
                <td>Publisher: {{this.article_publisher}}</td>
            </tr>
            <tr>
                <td>{{this.article_content}}</td>
            </tr>
            </tbody>
            </table>-->
      <center><h1>{{ this.article_title }}</h1> 
        <h4 @click="select_date"><b>Date: </b>{{ this.article_date }}</h4>
        <h4 @click="select_topic"><b>Topic: </b>{{ this.article_topic }}</h4>
        <h4 @click="select_publisher"><b>Publisher: </b>{{ this.article_publisher }}</h4>
        <p>{{ this.article_content }}</p >
      </center>
    </div>
</template>

<script>
import mysqlService from './mysqlService'
export default {
    name: 'Tarticle',
    data () {
        return {
            article_id : this.$route.params.id,
            article_title : this.$route.params.title,
            article_date : this.$route.params.date,
            article_publisher : this.$route.params.publisher,
            article_topic : this.$route.params.topic,
            article_content : '',
        }
    },

    methods: {
        get_content() {
            mysqlService.get_articleId(this.article_id)
          .then(response => {
            this.article_content = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
        },
        select_date () {
          this.$router.push({ name: 'TeslaArticles', params: { select_date: this.article_date } })
        },       
        select_topic () {
          this.$router.push({ name: 'TeslaArticles', params: { select_topic: this.article_topic } })
        },
        select_publisher () {
          this.$router.push({ name: 'TeslaArticles', params: { select_publisher: this.article_publisher } })
        },
    },

    created() {
        mysqlService.get_articleId(this.article_id)
          .then(response => {
            this.article_content = response.data;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
    }
}
</script>

<style scoped>
  table {
    margin-top: 6em;
    margin-bottom: 1.7em;
  }
  h1 {
    margin-top: 2em;
    margin-bottom: 1.7em;
  }
  th {
  display: table-cell;
  vertical-align: inherit;
  font-weight: bold;
  text-align: center;
  }
  .date-container {
    margin-top: 1.5em;
    margin-bottom: 2.8em;
  }
  .date-visual {
    margin-bottom: 1.7em;
  }
</style>