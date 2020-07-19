<template>
  <div class="list-box">
    <Narbar />
    <div class="items">
      <div class="item" v-for="item in list" :key="item.id">
        <router-link :to="'/detail/'+item.id">
          <img :src="item.images.small" />
          <span class="title">{{item.title.length > 6 ? item.title.substr(0,6)+'...' : item.title}}</span>
          <div v-if="item.rating.average==0" class="no-score">暂无评分</div>
          <div v-else class="star-box">
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
</template>
<script>
import { reactive, toRefs, onMounted, provide, ref } from "vue";
import { getMovieList } from "@/api/movice";
import { useRoute } from "vue-router";
import Narbar from "@/components/Narbar";
export default {
  components: {
    Narbar
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      list: []
    });
    const getList = async () => {
      const res = await getMovieList({
        type: route.params.type,
        start: 0,
        count: 500
      });
      console.log(res.data.title);
      const trtle = ref(res.data.title);
      data.list = res.data.subjects;
      data.list.forEach(item => {
        let num = Math.floor(item.rating.stars / 10);
        item.startArr = [];
        for (let i = 0; i < 5; i++) {
          let count = num > i ? 1 : 0;
          item.startArr.push(count);
        }
      });
    };

    onMounted(() => {
      const title = getList();
    });
    switch (route.params.type) {
      case "in_theaters":
        provide("title", "正在上映的电影-北京");
        break;
      case "coming_soon":
        provide("title", "即将上映的电影");
        break;
      case "top250":
        provide("title", "豆瓣电影Top250");
        break;
    }

    return {
      ...toRefs(data)
    };
  }
};
</script>
<style lang="scss" scoped>
/* 底部区域布局 */
.list-box {
  padding-bottom: 15px;
  .items {
    padding-top: 44px;
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-top: 5px;
      width: 33.33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 170px;
      }
      .title {
        margin-top: 2px;
        font-size: 12px;
      }
    }
  }
}
</style>