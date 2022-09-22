<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-button type="primary" icon="el-icon-upload2">上传文件</el-button>
      <el-button type="primary" icon="el-icon-delete">批量删除</el-button>
      <el-button type="primary" icon="el-icon-folder-add">新建文件夹</el-button>
      <el-button type="primary" icon="el-icon-refresh">重命名</el-button>
      <el-button type="primary" icon="el-icon-right">移动到</el-button>
    </el-col>
    <el-table
      :data="showTable"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      highlight-current-row
      height="400"
      style="border:1px solid #dfe6ec;"
      v-loading="loading"
      :border="true"
    >
      <el-table-column type="selection" width="48" align="center"></el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="filename" label="文件名称" width="140" align="center" :formatter="formatName"></el-table-column>
      <el-table-column
        prop="size"
        label="文件大小"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="path"
        label="文件路径"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="user"
        label="上传用户"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="上传时间"
        width="200"
        align="center"
        :formatter="formatTime"
      ></el-table-column>

      <el-table-column label="操作" min-width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >收藏</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          >分享</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 工具条 -->
    <el-col :span="24" class="toolbar" style="text-align:center">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-size="pagesize"
        :total="this.filterBrandInfs.length"
      ></el-pagination>
    </el-col>
    <!-- 工具条end -->

    <!--新增编辑界面-->
<!--    <el-dialog-->
<!--      :title="addOrEdit == 0 ? '新增' : '编辑'"-->
<!--      :visible.sync="formVisible"-->
<!--      :close-on-click-modal="false"-->
<!--      @close="closeDialog"-->
<!--      custom-class="brand-dialog-min-width"-->
<!--      width="32%"-->
<!--    >-->
<!--      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">-->
<!--        <el-form-item label="汽车名称" prop="name" class="row-padding-bottom">-->
<!--          <el-input v-model="formData.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态" class="row-padding-bottom">-->
<!--          <el-select v-model="formData.status" style="width:100%">-->
<!--            <el-option-->
<!--              v-for="item in statusArr"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" v-show="addOrEdit == 0" @click.native="addSubmit">提交</el-button>-->
<!--        <el-button type="primary" v-show="addOrEdit == 1" @click.native="editSubmit">提交</el-button>-->
<!--        <el-button @click.native="handleClose">取消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
    <!--新增编辑界面end-->
  </div>
</template>
<script>
import store from "@/vuex/store";
import axios from "axios";
export default {
  name: "AutomobileBrandMng",
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
        status: ""
      },
      filterBrandInfs: [
        {
          filename: '测试文件名称',
          size: 1024,
          path: '测试路径',
          user: '测试用户',
          time: new Date().getTime()
        }
      ],
      formVisible: false, //新增编辑界面是否显示
      formData: {}, //新增编辑界面数据
      addOrEdit: 0, //add——0  edit——1
      brandInfs: [],
      formRules: {
        name: [
          {
            required: true,
            pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            message: "请输入品牌名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      // this.brandInfs = JSON.parse(localStorage.getItem('carInfo')) || [];
      // this.filterBrand();
      this.loading = false;
    }, 500)
    console.log(this.filterBrandInfs)
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
    //搜索函数 - 暂时删除
    searchBrand(){
      this.currentPage = 1;
      this.filterBrand();
    },
    //过滤函数 - 暂时删除
    filterBrand() {
      let filtersName = this.filters.name.trim();
      let filtersStatus = this.filters.status;

      let filtersBrand = this.brandInfs.filter(item => {
        var isFiltersName = true;
        var isFiltersStatus = true;
        if (filtersName.length != 0) {
          isFiltersName = (item.name.indexOf(filtersName) != -1);
        }
        if (filtersStatus.length != 0) {
          isFiltersStatus = (item.status == filtersStatus);
        }
        return isFiltersName && isFiltersStatus;
      });
      this.filterBrandInfs = filtersBrand;
    },
    //控制编辑框显隐
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //显示新增界面
    handleAdd() {
      this.formVisible = true;
      this.addOrEdit = 0;
      this.formData = {
        name: "",
        category: "",
        status: "",
        time: ""
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
          localStorage.setItem('carInfo', JSON.stringify(brandInfs));
          setTimeout(() => {
            location.reload();
          }, 500)
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
            .then(() => {
              this.formData.id = this.getGuid();
              let newData = Object.assign({}, this.formData);
              this.brandInfs.push(newData);
              //存缓存
              localStorage.setItem('carInfo', JSON.stringify(this.brandInfs));
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
              localStorage.setItem('carInfo', JSON.stringify(brandInfs));
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
    //格式化文件名称
    formatName(row) {
      return row.filename.trim();
    },
    //格式化时间
    formatTime(row) {
      let time = new Date(row.time);
      let year = time.getFullYear(),
          month = time.getMonth() + 1,
          date = time.getDate(),
          hh = time.getHours(),
          mm = time.getMinutes(),
          ss = time.getSeconds();

      const formateStr = n => {
        n = n.toString()
        return n[1] ? n : `0${n}`
      }
      return [year, month, date].map(formateStr).join("-") + " " + [hh, mm, ss].map(formateStr).join(":");
    },
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
