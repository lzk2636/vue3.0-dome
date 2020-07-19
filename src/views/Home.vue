<template>
  <div class="home">
    <!-- 导航栏 -->
    <Navbar title="电音" />
    <!-- 正在热映 -->
    <div class="section">
      <div class="type-title">
        <span>正在热映</span>
        <div class="more" @click="goToList('in_theaters')">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in inTheaters" :key="item.id">
          <router-link :to="'/detail/'+item.id">
            <img :src="item.images.small" />
            <span
              class="title"
            >{{item.title.length > 6 ? item.title.substr(0,6)+'...' : item.title}}</span>
            <span v-if="item.rating.average==0" class="no-score">暂无评分</span>
            <div v-else class="star-box">
              <!-- block 是微信提供给我们的一个占位标签,渲染之后页面上看不到 -->
              <div v-for="(subitem,index) in item.startArr" :key="index">
                <span v-if="subitem===1" class="orange">★</span>
                <span v-else class="gray">★</span>
              </div>
              {{item.rating.average}}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="type-title">
        <span>即将上映</span>
        <div class="more" @click="goToList('coming_soon')">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in comingSoon" :key="item.id">
          <router-link :to="'/detail/'+item.id">
            <img :src="item.images.small" />
            <span
              class="title"
            >{{item.title.length > 6 ? item.title.substr(0,6)+'...' : item.title}}</span>
            <span v-if="item.rating.average==0" class="no-score">暂无评分</span>
            <div v-else class="star-box">
              <!-- block 是微信提供给我们的一个占位标签,渲染之后页面上看不到 -->
              <div v-for="(subitem,index) in item.startArr" :key="index">
                <span v-if="subitem===1" class="orange">★</span>
                <span v-else class="gray">★</span>
              </div>
              {{item.rating.average}}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="type-title">
        <span>Top250</span>
        <div class="more" @click="goToList('top250')">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in top250" :key="item.id">
          <router-link :to="'/detail/'+item.id">
            <img :src="item.images.small" />
            <span
              class="title"
            >{{item.title.length > 6 ? item.title.substr(0,6)+'...' : item.title}}</span>
            <span v-if="item.rating.average==0" class="no-score">暂无评分</span>
            <div v-else class="star-box">
              <!-- block 是微信提供给我们的一个占位标签,渲染之后页面上看不到 -->
              <div v-for="(subitem,index) in item.startArr" :key="index">
                <span v-if="subitem===1" class="orange">★</span>
                <span v-else class="gray">★</span>
              </div>
              {{item.rating.average}}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moveList, getComingSoon, getTop250 } from "../api/movice";
import {
  reactive,
  ref,
  toRefs,
  onMounted,
  provide,
  onBeforeUnmount,
  onUnmounted
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Navbar from "../components/Narbar";
export default {
  name: "Home",
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = new reactive({
      inTheaters: [],
      comingSoon: [],
      top250: []
    });
    const message2 = new ref("你是错的,我是对的");
    message2.value = "在你眼中,我就是这样子的吗";
    // 函数
    const currentMovice = async () => {
      const res = await moveList({ start: 0, count: 30 });
      state.inTheaters = res.data.subjects;
      state.inTheaters.forEach(element => {
        element.startArr = [];
        const num = Math.floor(element.rating.stars / 10);
        for (let i = 1; i <= 5; i++) {
          if (i > num) {
            element.startArr.push(0);
          } else {
            element.startArr.push(1);
          }
        }
      });
    };

    const currentComing = async () => {
      const res = await getComingSoon({ start: 0, count: 50 });
      state.comingSoon = res.data.subjects;
      state.comingSoon.forEach(element => {
        element.startArr = [];
        const num = Math.floor(element.rating.stars / 10);
        for (let i = 1; i <= 5; i++) {
          if (i > num) {
            element.startArr.push(0);
          } else {
            element.startArr.push(1);
          }
        }
      });
    };
    const currentTop = async () => {
      const res = await getTop250({ start: 0, count: 500 });
      state.top250 = res.data.subjects;
      state.top250.forEach(item => {
        item.startArr = [];
        const num = Math.floor(item.rating.stars / 10);
        for (let i = 0; i < 5; i++) {
          let count = i < num ? 1 : 0;
          item.startArr.push(count);
        }
      });
    };
    const goToList = type => {
      router.push("/list/" + type);
    };
    // 函数钩子
    provide("title", "美丽电影");
    onMounted(() => {
      currentMovice();
      currentComing();
      currentTop();
         store.commit("setShowBack", false);
    });
    onUnmounted(() => {
      store.commit("setShowBack", true);
    });

    return {
      ...toRefs(state),
      goToList
    };
  }
};
</script>
<style lang="scss" scoped>
.home {
  padding-bottom: 15px;
  padding-top: 10px;
  .section {
    padding-top: 44px;
    .type-title {
      height: 20px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 18px;
      }
      .more {
        font-size: 13px;
        color: #43c74d;
      }
    }
    .scroll-view {
      margin-top: 10px;
      /* 要能够滚动 */
      width: 100%;
      display: flex;
      overflow: auto;
      white-space: nowrap;
      height: 100%;
      // margin-left: 5px;
      // margin-right: 5px;
      .item a {
        width: 85px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-left: 5px;
        padding-right: 5px;
        img {
          width: 85px;
          height: 123px;
        }
        .title {
          margin-top: 2px;
          font-size: 12px;
        }
      }
    }
    .scroll-view::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
