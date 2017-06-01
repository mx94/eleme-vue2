<!-- 商品评价页 -->
<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.score"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送到时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></rating-select><div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingSelect from  '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/data';
  import BScroll from 'better-scroll';
  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {
      star,
      split,
      ratingSelect
    },
    created() {
      this.$http.get('../static/data.json').then((res) => {
        res = res.body;
        this.ratings = res.ratings;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true // 可以点击 把click设置为true
            });
          });
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        // 只有内容并且没有内容
        if (this.onlyContent && !text) {
          return false;
        }
        // 全部评价
        if (this.selectType === ALL) {
          return true;
        } else {
          // 选中的评价
          return type === this.selectType;
        }
      }
    }
  };
</script>
<style lang="less">
  @import "../../common/less/index";

  @block: inline-block;
  @12: 12px;
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        width: 127px;
        border-right: 1px solid rgba(7, 17, 27, .1);
        padding: 6px 0;
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          line-height: @12;
          font-size: @12;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }
        .rank {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          margin-bottom: 8px;
          line-height: 18px;
          font-size: 0;
          .title {
            display: @block;
            vertical-align: top;
            line-height: 18px;
            font-size: @12;
            color: rgb(7, 17, 27);
          }
          .star {
            display: @block;
            vertical-align: top;
            margin: 0 @12;
          }
          .score {
            display: @block;
            font-size: @12;
            color: rgb(255, 153, 0);
            line-height: 18px;
            vertical-align: top;
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: @12;
            color: rgb(7, 17, 27);
          }
          .delivery {
            font-size: @12;
            color: rgb(147, 153, 159);
            margin-left: @12;
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, .1));
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: @12;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 4px;
            line-height: @12;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            .star {
              display: @block;
              margin-right: 6px;
              vertical-align: top;
            }
            .delivery {
              display: @block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: @12;
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up, .item {
              display: @block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .item {
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, .1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
            .time {
              position: absolute;
              top: 0;
              font-size: 10px;
              right: 0;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }

  }

</style>
