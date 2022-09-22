<template>
  <div :class="getCollapse?'collapsed-main':'main'">
    <el-row style="margin: 10px 0">
      <el-col :span="21">
        <el-breadcrumb class="breadcrumb-inner">
          <el-breadcrumb-item
            v-if="hasParent"
            :class="hasChild?'normal-font':'bold-font'"
          >{{ parentName }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="hasChild" class="bold-font">{{ childName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <div class="rightText">
          <span class="highLight">{{ title }}</span>
          <span> / </span>
          <span>{{ parentName }}</span>
        </div>

        <el-breadcrumb class="breadcrumb-inner">
          <el-breadcrumb-item
            v-if="hasParent"
            :class="hasChild?'normal-font':'bold-font'"
          ></el-breadcrumb-item>
          <el-breadcrumb-item v-if="hasChild" class="bold-font">{{ parentName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-col :span="24" class="content-wrapper">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </el-col>
  </div>
</template>
<script>
import store from "@/vuex/store";
export default {
  name: "Main",
  props: ["navMenus"],
  store,
  computed: {
    getCollapse() {
      return this.$store.state.collapsed;
    }
  },
  data() {
    return {
      title: "ISS-Cloud-Disk",
      parentName: "",
      childName: "",
      hasParent: true,
      hasChild: true
    };
  },
  mounted() {
    this.getBreadcrumbName(this.$route.path);
  },
  methods: {
    getBreadcrumbName(path) {
      let navMenus = this.navMenus;
      for (let index in navMenus) {
        if ("/" + navMenus[index].entity.path == path) {
          this.hasParent = true;
          this.hasChild = false;
          this.parentName = navMenus[index].entity.name;
          break;
        } else if (navMenus[index].hasOwnProperty("childs")) {
          this.hasParent = true;
          this.hasChild = true;
          let childs = navMenus[index].childs;
          for (let child in childs) {
            if ("/" + childs[child].entity.path == path) {
              this.childName = childs[child].entity.name;
              this.parentName = navMenus[index].entity.name;
              break;
            }
          }
        }
      }
    }
  },
  watch: {
    $route(to) {
      this.getBreadcrumbName(to.path);
    }
  }
};
</script>
<style>
.main {
  width: calc(100% - 260px);
  padding: 15px;
  background-color: #ecf0f1;
  /*transition: all 0.5s ease;*/
}
.collapsed-main {
  width: calc(100% - 90px);
  padding: 15px;
  background-color: #ecf0f1;
  /*transition: all 0.5s ease;*/

}
.breadcrumb-inner {
  float: left;
}
.normal-font span {
  font-size: 16px;
}
.bold-font span {
  font-weight: bold !important;
  font-size: 16px;
}
.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 2px 2px 10px 2px #d5d5d5;
}

/* 子组件共用css 定义在父组件中 若定义在其中一个子组件中可能导致在其他组件重新加载无效  */
.add-button {
  float: right;
  padding-right: 10px;
}
.toolbar {
  background-color: #fff;
  padding: 10px;
  margin: 10px 0px;
}
.el-form-item {
  margin-bottom: 10px;
}
.el-table__fixed-right-patch {
  background-color: #eef1f6;
}
.row-padding-bottom {
  padding-bottom: 10px;
}
.rightText {
  color: #999999;
  font-size: 15px;
}
.highLight {
  color: #4e93c5;
}
</style>
