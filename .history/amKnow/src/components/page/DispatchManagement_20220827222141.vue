<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" ref="searchConditions">
        <el-form-item>
          <el-input
            v-model="filters.name"
            :placeholder="getShow == 3?'名称':'零件名称'"
            :class="getShow == 1?'normal-input':(getShow == 2?'middle-input':'small-input')"
          ></el-input>
        </el-form-item>
 
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            v-show="getShow == 1"
            @click="searchBrand"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            title="查询"
            v-show="getShow != 1"
            circle
            @click="searchBrand"
          ></el-button>
        </el-form-item>
        <el-form-item class="add-button">
          <el-button type="success" icon="el-icon-plus" v-show="getShow == 1" @click="handleAdd">新增</el-button>
          <el-button
            type="success"
            icon="el-icon-plus"
            title="新增"
            v-show="getShow != 1"
            circle
            @click="handleAdd"
          ></el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="showTable"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      highlight-current-row
      height="400"
      style="border:1px solid #dfe6ec;"
      v-loading="loading"
    >
      <!-- <el-table-column type="selection" width="48" align="center"></el-table-column> -->
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="零件名称" width="140" align="center" :formatter="formatName"></el-table-column>
      <el-table-column
        prop="damage"
        label="消耗情况"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="record"
        label="情况记录"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="派单状态"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="time" label="时间" width="200" align="center" :formatter="formatTime"></el-table-column>
      <el-table-column label="操作" min-width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="text-align:center">
      <!-- <el-button
        type="danger"
        icon="el-icon-delete"
        @click="batchRemove"
        v-show="getShow == 1"
        :disabled="this.sels.length===0"
        style="float:left"
      >批量删除</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        title="批量删除"
        @click="batchRemove"
        v-show="getShow != 1"
        :disabled="this.sels.length===0"
        style="float:left"
      ></el-button>-->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-size="pagesize"
        :total="this.filterBrandInfs.length"
      ></el-pagination>
    </el-col>

    <!--新增编辑界面-->
    <el-dialog
      :title="addOrEdit == 0 ? '新增' : '编辑'"
      :visible.sync="formVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="brand-dialog-min-width"
      width="32%"
    >
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="零件名称" prop="name" class="row-padding-bottom">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="消耗情况" class="row-padding-bottom">
          <el-input v-model="formData.damage" autocomplete="off"></el-input>

          <!-- <el-select v-model="formData.country" style="width:100%">
            <el-option
              v-for="item in countries"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="情况记录" class="row-padding-bottom">
          <el-input v-model="formData.record"></el-input>
        </el-form-item>
        <el-form-item label="派单状态" class="row-padding-bottom">
        <el-select v-model="formData.status" placeholder="请选择派送状态">
            <el-option label="未发货" value="未发货"></el-option>
            <el-option label="已派送" value="已派送"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
        </el-select>
        </el-form-item>
     
        <el-form-item label="时间">
          <el-date-picker v-model="formData.time" format="yyyy年M月" value-format="yyyy年M月" :default-value="new Date(1935,0)" type="month"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-show="addOrEdit == 0" @click.native="addSubmit">提交</el-button>
        <el-button type="primary" v-show="addOrEdit == 1" @click.native="editSubmit">提交</el-button>
        <el-button @click.native="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import store from "@/vuex/store";
import axios from "axios";
export default {
   name:"DispatchManagement",
  store,
  data() {
    return {
      loading: false,
      pagesize: 10,
      currentPage: 1,
      id: "", //原数据id
      // sels: [],
      filters: {
        name: "",
      },
 
      filterBrandInfs: [],
      formVisible: false, //新增编辑界面是否显示
      formData: {}, //新增编辑界面数据
      addOrEdit: 0, //add——0  edit——1
      brandInfs: [],
      formRules: {
        name: [
          {
            required: true,
            pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            message: "请输入零件名称",
            trigger: "blur"
          }
        ],
         damage: [
          {
            required: true,
            pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            message: "请输入零件名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.loading = true;
    let that = this;
    this.filterBrandInfs = JSON.parse(window.localStorage.getItem("dispatch"))
    that.loading = false;
    // this.loading = true;
    // let that = this;
    // axios
    //   .get(
    //     "https://www.easy-mock.com/mock/5c702a27d3044d1448586d67/amKnow/brand"
    //   )
    //   .then(response => {
    //     that.brandInfs = response.data;
    //     that.filterBrand();
    //     that.loading = false;
    //   })
    //   .catch(error => {
    //     that.$message({
    //       message: "网络错误,请稍后再试",
    //       type: "error"
    //     });
    //     that.loading = false;
    //   });
  },
  computed: {
    getShow() {
      return this.$store.state.isShow;
    },
    showTable() {
      return this.filterBrandInfs.slice((this.currentPage - 1) * this.pagesize,this.currentPage * this.pagesize);
    }
  },
  methods: {
    searchBrand(){
      this.currentPage = 1;
      this.filterBrand();
    },
    filterBrand() {
      let filtersName = this.filters.name.trim();
      let filtersBrand = this.brandInfs.filter(item => {
        var isFiltersName = true;
        if (filtersName.length != 0) {
          isFiltersName = (item.name.indexOf(filtersName) != -1);
        }
      
        return isFiltersName 
      });

      this.filterBrandInfs = filtersBrand;
      console.log(filtersBrand)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //显示新增界面
    handleAdd() {
      this.formVisible = true;
      this.addOrEdit = 0;
      this.formData = {
        name: "",
        damage: "",
        status: "",
        time: "",
        record:""
      };
    },
    //显示编辑界面
    handleEdit(index, row) {
      this.formVisible = true;
      this.addOrEdit = 1;
      this.formData = Object.assign({}, row);
      this.id = row.id;
    },
    handleDelete(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        type: "warning"
      })
        .then(() => {
          let brandInfs = this.brandInfs;
          for (let index in brandInfs) {
            if (brandInfs[index].id == row.id) {
              brandInfs.splice(index, 1);
              break;
            }
          }
          this.filterBrand();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(() => {
          // this.$message.error("删除失败");
        });
    },
    addSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            cancelButtonClass: "btn-custom-cancel"
          })
            .then((res) => {
                console.log(res)
              this.formData.id = this.getGuid();
              let newData = Object.assign({}, this.formData);
              this.brandInfs.push(newData);
              this.filterBrand();
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$refs["formData"].resetFields();
              this.formVisible = false;
            })
            .catch(() => {
              // this.$message.error("添加失败");
            });
        }
      });
    },
    editSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            cancelButtonClass: "btn-custom-cancel"
          })
            .then(() => {
              let brandInfs = this.brandInfs;
              let newData = Object.assign({}, this.formData);
              for (let index in brandInfs) {
                if (brandInfs[index].id == this.id) {
                  brandInfs.splice(index, 1, newData);
                  break;
                }
              }
              this.filterBrand();
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs["formData"].resetFields();
              this.id = "";
              this.formVisible = false;
            })
            .catch(() => {
              // this.$message.error("修改失败");
            });
        }
      });
    },
    closeDialog() {
      this.id = "";
      this.$refs["formData"].resetFields();
    },
    handleClose() {
      this.id = "";
      this.formVisible = false;
      this.$refs["formData"].resetFields();
    },
    getGuid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },
    // selsChange(sels) {
    //   this.sels = sels;
    // },
    formatName(row) {
      return row.name.trim();
    },

    formatCompany(row) {
      return row.company.length == 0
        ? "未知"
        : row.company.trim().length == 0
        ? "未知"
        : row.company.trim();
    },
    formatFounder(row) {
      return row.founder.length == 0
        ? "未知"
        : row.founder.trim().length == 0
        ? "未知"
        : row.founder.trim();
    },
    formatTime(row) {
      return row.time.length == 0
        ? "未知"
        : row.time.trim().length == 0
        ? "未知"
        : row.time.trim();
    }
  }
};
</script>
<style scoped>
.small-input {
  width: 100px;
}
.middle-input {
  width: 140px;
}
.normal-input {
  width: 180px;
}
.small-select {
  width: 120px;
}
.middle-select {
  width: 160px;
}
.normal-select {
  width: 200px;
}
.brand-dialog-min-width {
  min-width: 350px;
}
</style>



