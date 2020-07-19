import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    isShowBack:false
  },
  getters:{
    Show:(state:any)=>{
      return state.isShowBack
    }
  },
  mutations: {
    setShowBack(state:any,payload:any){


      state.isShowBack=payload
      // console.log(state)

    }
  },
  actions: {
  },
  modules: {
  }
});
