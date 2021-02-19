<template>
  <div class="slider">
    <el-carousel height="300px" direction="vertical" :autoplay="true">
      <el-carousel-item v-for="(item,index) in imglist" :key="index">
        <img :src="item" alt="" style="width: 100%;height: 100%;">
      </el-carousel-item>
    </el-carousel>
    <div class="slider-tab">
      <ul>
        <li class="i1">
          <span class="li-span">
            <i></i>
            菜谱大全
            <b></b>
          </span>
            <!-- 菜谱大全内容 -->
          <ul class="sub">
              <li>
                  <a href="#">
                      一周热门
                  </a>
              </li>
              <li>
                  <a href="#">
                      早餐
                  </a>
              </li>
          </ul>
        </li>
        <li class="i2">
          <span class="li-span">
            <i></i>
            食材大全
            <b></b>
          </span>
          <!-- 食材大全 -->
          <ul class="sub">
              <li>
                  <a href="#">
                      西红柿
                  </a>
              </li>
              <li>
                  <a href="#">
                      土豆
                  </a>
              </li>
              <li>
                  <a href="#">
                      小龙虾
                  </a>
              </li>
          </ul>
        </li>
        <li class="i3">
          <span class="li-span">
            <i></i>
            饮食健康
            <b></b>
          </span>
            <!-- 饮食健康内容 -->
            <ul class="sub">
              <li>
                  <a href="#">
                      食疗食补
                  </a>
              </li>
              <li>
                  <a href="#">
                      饮食常识
                  </a>
              </li>
              <li>
                  <a href="#">
                      气血双补
                  </a>
              </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imglist: [
        '/static/img/一本满足.jpg',
        '/static/img/平底锅甜品.jpg',
        '/static/img/春季养生.jpg'
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.slider {
  width: 800px;
  height: 300px;
  position: relative;
  .slider-tab {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 300px;
    z-index: 999;
    background: rgba(68, 68, 68, 0.4);
    padding: 30px 0;
    ul {
      list-style: none;
      li {
        display: block;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        .li-span {
          box-sizing: content-box;
          display: block;
          color: #fff;
          height: 20px;
          line-height: 20px;
          padding: 20px 0;
          i,
          b {
            width: 20px;
            height: 20px;
            float: left;
            margin: 0 10px 0 20px;
            background: rgba(0, 0, 0, 0) url("/static/img/icon.png") no-repeat
              scroll 0 0 / auto 20px;
          }
          b {
            background-position: -100px;
            float: right;
          }
        }
        .sub {
            position: absolute;
            top: 0;
            left: 197px;
            z-index: 999;
            background: #fff;
            padding: 22px 0;
            box-shadow: 3px 2px 5px rgba(0,0,0,.2);
            width: 0px;
            height: 302px;
            transition: all .5s;
            overflow-x: hidden;
            a {
                float: left;
                width: 130px;
                height: 45px;
                text-align: center;
                line-height: 45px;
                overflow: hidden;;
                text-decoration: none;
                margin:  0 0 10px 0;
                color: #000;
            }
            a:hover {
                color: #ff6767;
            }
        }
      }
      li:hover {
        background-color: #ff6767;
        .sub {
            width: 130px;
        }
      }
      li.i2 {
        i {
          background-position: -20px 0;
        }
      }
      li.i3 {
        i {
          background-position: -120px 0;
        }
      }
    }
  }
}
</style>
