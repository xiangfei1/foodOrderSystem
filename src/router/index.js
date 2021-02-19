import Vue from "vue";
import Router from "vue-router";
import adminLogin from "@/components/back/adminLogin";
import resInfo from "@/components/back/restaurant/restaurantInfo";
import resGoods from "@/components/back/restaurant/restaurantGoods";
import resPay from "@/components/back/restaurant/restaurantPay";
import resDispatcher from "@/components/back/restaurant/restaurantDispatcher";
import resClassify from "@/components/back/restaurant/restaurantClassify";

import resAccount from "@/components/back/restaurant/restaurantAccount";
import update from "@/components/back/option/update";
import add from "@/components/back/option/add";
import comment from "@/components/back/option/comment";

import home from "@/components/forward/home";
import login from "@/components/forward/login";
import register from "@/components/forward/register";
import userInfo from "@/components/forward/show/userInfo";
import goodsInfo from "@/components/forward/show/goodsInfo";
import shopCar from "@/components/forward/show/shopCar";
import search from "@/components/forward/show/search";
// import { userInfo } from 'os';

Vue.use(Router);

export default new Router({
  routes: [
    // 后台
    {
      path: "/adminLogin",
      name: "adminLogin",
      component: adminLogin
    },
    {
      path: "/restaurantinfo",
      name: "resInfo",
      component: resInfo
    },
    {
      path: "/restaurantgoods",
      name: "resGoods",
      component: resGoods
    },
    {
      path: "/restaurantpay",
      name: "resPay",
      component: resPay
    },
    {
      path: "/restaurantaccount",
      name: "resAccount",
      component: resAccount
    },
    {
      path: "/restaurantdispatcher",
      name: "resDispatcher",
      component: resDispatcher
    },
    {
      path: "/goodsInfo/update/:gID",
      name: "update",
      component: update
    },
    {
      path: "/goodsAdd/add",
      name: "add",
      component: add
    },
    {
      path: "/comment/:gID",
      name: "comment",
      component: comment
    },
    {
      path: "/restaurantclassify",
      name: "resClassify",
      component: resClassify
    },

    // 前台
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/userinfo/:id",
      name: "userInfo",
      component: userInfo
    },
    {
      path: "/goodsInfo/:gID",
      name: "goodsinfo",
      component: goodsInfo
    },
    {
      path: "/shopCar",
      name: "shopcar",
      component: shopCar
    },
    {
      path: "/search",
      name: "search",
      component: search
    }
  ]
});
