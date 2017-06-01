<!-- app主页面 -->
<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  const ERR_OK = 0; // 设置一个状态的变量码 声明一个变量
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created() {
      console.log(1);
//        成功之后的回调
      this.$http.get('../static/data.json').then((response) => {
        response = response.body;
        this.seller = response.seller;
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="less">
  @import "common/less/mixin/mixin.less";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, .1));
    .tab-item {
      flex: 1;
      text-align: center;
    }
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93)
    }
    & .active {
      color: rgb(240, 20, 20);
    }
  }

</style>
