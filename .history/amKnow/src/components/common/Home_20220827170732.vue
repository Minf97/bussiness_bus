<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <Header></Header>
    </el-col>
    <el-col :span="24" class="remain">
      <LeftNav :navMenus="menuData"></LeftNav>
      <Main :navMenus="menuData"></Main>
    </el-col>
  </el-row>
</template>
<script>
import LeftNav from "@/components/common/LeftNav";
import Main from "@/components/common/Main";
import Header from "@/components/common/Header";
import store from "@/vuex/store";
export default {
  name: "Home",
  components: {
    LeftNav,
    Main,
    Header
  },
  store,
  data() {
    return {
      menuData: [
        {
          //一级
          entity: {
            id: "AM",
            name: "车辆管理",
            icon: "icon iconfont icon-box",
            path: "automobileMng"
          },
          //二级
          childs: [
            {
              entity: {
                id: "AIM",
                name: "车辆信息",
                icon: "",
                path: "automobileInfMng"
              }
            },
            {
              entity: {
                id: "ABM",
                name: "车辆状态",
                icon: "",
                path: "automobileBrandMng"
              }
            }
          ]
        },
        {
          //一级
          entity: {
            id: "SM",
            name: "保修管理",
            icon: "icon iconfont icon-similarproduct",
            path: "stockManage"
          }
        },
        {
          //一级
          entity: {
            id: "PM",
            name: "计划管理",
            icon: "icon iconfont icon-viewgallery",
            path: "Plan_management"
          },
        },
        {
          //一级
          entity: {
            id: "KB",
            name: "知识库",
            icon: "icon iconfont icon--folder",
            path: "Knowledge_base"
          },
        },
        {
          //一级
          entity: {
            id: "SPM",
            name: "备件管理",
            icon: "icon iconfont icon-viewgallery",
            path: "Spare_parts_management"
          },
        },
        {
          //一级
          entity: {
            id: "DM",
            name: "派单管理",
            icon: "icon iconfont icon-viewgallery",
            path: "Dispatch_management"
          },
        },
        {
          //一级
          entity: {
            id: "DB",
            name: "后台管理",
            icon: "icon iconfont icon-viewgallery",
            path: "Dashboard"
          },
        },
        // {
        //   //一级
        //   entity: {
        //     id: "DB",
        //     name: "Dashboard",
        //     icon: "icon iconfont icon-viewgallery",
        //     path: "Dashboard"
        //   }
        // },
      ]
    };
  },
  mounted() {
    const that = this;
    let iClientWidth = document.body.clientWidth;
    if (iClientWidth < 500) {
      that.$store.commit("isShowModify", 4);
    } else if (iClientWidth >= 500 && iClientWidth < 800) {
      that.$store.commit("isShowModify", 3);
    } else if (iClientWidth >= 800 && iClientWidth < 1100) {
      that.$store.commit("isShowModify", 2);
    }
    if (iClientWidth < 800) {
      that.$store.commit("collapseToTrue");
    }
    if (iClientWidth < 800) {
      that.$store.commit("isActiveToFalse");
    }
    window.onresize = function() {
      let clientWidth = document.body.clientWidth;
      if (iClientWidth < 500) {
        that.$store.commit("isShowModify", 4);
      } else if (iClientWidth >= 500 && clientWidth < 800) {
        that.$store.commit("isShowModify", 3);
      } else if (clientWidth >= 800 && clientWidth < 1100) {
        that.$store.commit("isShowModify", 2);
      } else {
        that.$store.commit("isShowModify", 1);
      }
      if (clientWidth < 800 && that.$store.state.collapsed == false) {
        that.$store.commit("collapseToTrue");
      } else if (clientWidth >= 800 && that.$store.state.collapsed == true) {
        that.$store.commit("collapseToFalse");
      }
      if (clientWidth < 800) {
        that.$store.commit("isActiveToFalse");
      } else {
        that.$store.commit("isActiveToTrue");
      }
    };
  }
};
</script>
<style>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
.header {
  height: 60px;
  line-height: 60px;
}
.remain {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0px;
}
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
</style>
