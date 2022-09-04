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
  mounted() {
    console.log(3333)
    //车辆信息
    let carInfo = [{
      "name": "M762",
      "brand": "",
      "category": "big",
      "engine": "6000CC",
      "gearbox": "6档手自一体",
      "drivingMode": 0,
      "energy": 0,
      "seatNumber": 48,
      "yearStyle": "2013款",
      "price": null,
      "status": 0,
      "id": "e85310e6-895a-55ea-e9b9-46a20ebb5887"
    }, {
      "name": "M766",
      "brand": "",
      "category": "middle",
      "engine": "4000CC",
      "gearbox": "5档手动",
      "drivingMode": 0,
      "energy": 0,
      "seatNumber": 23,
      "yearStyle": "2013款",
      "price": null,
      "status": 1,
      "badArea": 2,
      "id": "6d66c4d4-b54f-c910-0624-3df2dbcc993d"
    }, {
      "name": "B303",
      "brand": "",
      "category": "small",
      "engine": "3000CC",
      "gearbox": "7档双离合",
      "drivingMode": 0,
      "energy": 3,
      "seatNumber": 13,
      "yearStyle": "2018款",
      "price": null,
      "status": 2,
      "people": 0,
      "id": "c3b477ca-e192-6763-7b56-e1be9c161375"
    },
      {
        "name": "B414",
        "brand": "",
        "category": "double",
        "engine": "9000CC",
        "gearbox": "7档双离合",
        "drivingMode": 1,
        "energy": 3,
        "seatNumber": 54,
        "yearStyle": "2018款",
        "price": null,
        "status": 3,
        "id": "c3b477ca-e192-6763-7b56-e1be9c161372"
      }
    ]
    //知识库
    //备件管理
    //派单管理
    let Knowledge_base_data = [
      {
        id_: "001",
        name: "离心泵",
        company: "下侧",
        country: "中国大陆",
        time: "2022/7",
        amount: 2
      },
      {
        id_: "002",
        name: "轴轮",
        company: "车头",
        country: "中国大陆",
        time: "2022/7",
        amount: 1
      },
      {
        id_: "003",
        name: "螺丝",
        company: "车身",
        country: "中国大陆",
        time: "2022/7",
        amount: 12
      }
    ]
    let spm_data = [
      {
        name: "轴轮",
        company: "20x20",
        founder: "中国石化设计院",
        time: "2022/7/1",
        total: 100
      },
      {
        name: "离心泵",
        company: "70x30",
        founder: "中国石化设计院",
        time: "2022/7/1",
        total: 1000
      },
      {
        name: "螺丝",
        company: "5x5",
        founder: "中国石化设计院",
        time: "2022/7/1",
        total: 10000
      }
    ]
    window.localStorage.getItem("Knowledge_base") ? "" : window.localStorage.setItem("Knowledge_base", JSON.stringify(Knowledge_base_data))
    window.localStorage.getItem("spm_data") ? "" : window.localStorage.setItem("spm_data", JSON.stringify(spm_data))
    window.localStorage.getItem("carInfo") ? "" : window.localStorage.setItem("carInfo", JSON.stringify(carInfo))
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
