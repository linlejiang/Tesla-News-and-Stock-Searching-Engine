import Vue from 'vue'
import Router from 'vue-router'
import Stock from '@/components/Stock'
import Tarticle from '@/components/Article'
import TeslaArticles from '@/components/TeslaArticles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TeslaArticles',
      component: TeslaArticles,
      props: true
    },
    {
      path: '/stock',
      name: 'stock',
      component: Stock,
      props: true
    },
    {
      path: '/:article_id',
      name: 'article',
      component: Tarticle,
      props: true
    }
  ]
})
