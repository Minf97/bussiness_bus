<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted(){
    console.log(3333)
    //知识库
    //备件管理
    //派单管理
    let Knowledge_base_data = [
      {
        id_:"001",
        name: "离心泵",
        company:"下侧",
        country:"中国大陆",
        time: "2022/7"
      }
    ]
    let dispatch_data = [
     {
        _id:"001",
        name:"零件1",
        damage:"左侧耗损",
        status:"派送中",
        time:"2022/7/20",
        record:"记录"

      },{
        _id:"002",
        name:"零件2",
        damage:"右侧耗损",
        status:"派送中",
        time:"2022/7/20",
        record:"记录"
      }
    ]
    let spm_data = [
      {
        name: "轴轮",
        company: "20x20",
        founder: "中国石化设计院",  //供应商
        time: "2022/7/1"  
}
    ]
    window.localStorage.setItem("Knowledge_base",JSON.stringify(Knowledge_base_data) )?"":window.localStorage.setItem("Knowledge_base",JSON.stringify(Knowledge_base_data) )
    window.localStorage.setItem("dispatch",JSON.stringify(dispatch_data))?"":window.localStorage.setItem("dispatch",JSON.stringify(dispatch_data))
    window.localStorage.setItem("spm_data",JSON.stringify(spm_data))? "":window.localStorage.setItem("spm_data",JSON.stringify(spm_data))

  }
};
</script>

<style>
#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #48576a;
  margin-top: 0px;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
