<template>
  <div class="navbar">
    <i class="iconfont icon-back" v-show="$store.getters.Show" @click="$router.go(-1)"></i>
    
    {{message}}
  </div>
</template>

<script>
import { reactive,inject,toRefs } from "vue";
import {useStore} from 'vuex'
export default {
    name:"NavBar",
    setup(props){
        const store=useStore()
        const state = reactive({
            message:inject("title")
        })
        return {...toRefs(state)}
    }

}
</script>

<style lang="scss" scoped>
.navbar {
  height: 44px;
  line-height: 44px;
  width: 100%;
  background-color: #42bd56;
  text-align: center;
  color: white;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}
.icon-back {
  position: absolute;
  left: 10px;
  font-size: 20px;
}
</style>