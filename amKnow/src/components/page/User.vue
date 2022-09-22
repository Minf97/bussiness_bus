<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline">新增用户</el-button>
      <el-button type="primary" icon="el-icon-delete">删除用户</el-button>
      <el-button type="primary" icon="el-icon-magic-stick">用户授权</el-button>
    </el-col>
    <el-table
      :data="showTable"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      highlight-current-row
      height="400"
      style="border:1px solid #dfe6ec;"
      v-loading="loading"
    >
      <el-table-column type="selection" width="48" align="center"></el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="92" align="center" :formatter="formatName"></el-table-column>
      <el-table-column
        prop="category"
        label="性别"
        width="120"
        align="center"
        :formatter="formatCategory"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="手机"
        width="120"
        align="center"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="邮箱"
        width="120"
        align="center"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="用户角色"
        width="120"
        align="center"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column label="操作" min-width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >查看
          </el-button>
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
        :total="this.filterAutomobileInfs.length"
      ></el-pagination>
    </el-col>

    <!--新增编辑界面-->
    <el-dialog
      :title="addOrEdit == 0 ? '新增' : '检修'"
      :visible.sync="formVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="dialog-minwidth"
    >
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-row class="row-padding-bottom">
          <el-col :span="12" class="col-position">
            <el-form-item label="汽车名称" prop="name">
              <el-input v-model="formData.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-padding-bottom">
          <el-col :span="12" class="col-position">
            <el-form-item label="类别">
              <el-select v-model="formData.category" style="width:100%">
                <el-option
                  v-for="item in automobileCategorys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="col-position">
            <el-form-item label="检修人">
              <el-select v-model="formData.people" style="width:100%">
                <el-option
                  v-for="item in people"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="col-position">
            <el-form-item label="故障区域">
              <el-select v-model="formData.badArea" style="width:100%">
                <el-option
                  v-for="item in badArea"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
  name: "AutomobileInfMng",
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
        drivingMode: "",
        category: ""
      },
      automobileCategorys: [
        {
          label: "小巴",
          value: "small"
        },
        {
          label: "中巴",
          value: "middle"
        },
        {
          label: "大巴",
          value: "big"
        },
        {
          label: "双层巴",
          value: "double"
        }
      ],
      automobileDrivingMode: [
        {
          label: "两驱",
          value: 0
        },
        {
          label: "四驱",
          value: 1
        }
      ],
      people: [
        {
          label: "陈师傅",
          value: 0,
        },
        {
          label: "邓师傅",
          value: 1
        },
        {
          label: "王师傅",
          value: 2
        }
      ],
      badArea: [
        {
          label: "车头",
          value: 0
        },
        {
          label: "车身",
          value: 1
        },
        {
          label: "下侧",
          value: 2
        }
      ],
      filterAutomobileInfs: [],
      formVisible: false, //新增编辑界面是否显示
      formData: {}, //新增编辑界面数据
      addOrEdit: 0, //add——0  edit——1
      automobileInfs:    // 总车辆信息, 兜底数据
        [{
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
          "id": "c3b477ca-e192-6763-7b56-e1be9c161375"
        }]
      ,
      formRules: {
        name: [
          {
            required: true,
            pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            message: "请输入汽车名称",
            trigger: "blur"
          }
        ],
        price: [
          {
            pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
            message: "请输入大于0并且小数点最多两位的数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.loading = true;
    let that = this;
    //获得车辆信息
    setTimeout(() => {
      if (localStorage.getItem('carInfo')) {
        this.automobileInfs = JSON.parse(localStorage.getItem('carInfo')) || this.automobileInfs;
        this.filterAutomobile();
      }
      this.loading = false;
    }, 500)

    // axios
    //   .get(
    //     "https://www.easy-mock.com/mock/5c702a27d3044d1448586d67/amKnow/automobile"
    //   )
    //   .then(response => {
    //     that.automobileInfs = response.data;
    //     that.filterAutomobile();
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
      return this.filterAutomobileInfs.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {
    searchAutomobile() {
      this.currentPage = 1;
      this.filterAutomobile();
    },
    formatStatus(row) {
      let status;
      switch (row.status) {
        case 0:
          status = "待维修";
          break;
        case 1:
          status = "待派单";
          break;
        case 2:
          status = "维修中";
          break;
        case 3:
          status = "正常";
          break;
        default:
          status = "未知";
          break;
      }
      return status;
    },
    filterAutomobile() {
      let filtersName = this.filters.name.trim();
      let filtersCategory = this.filters.category;
      let filtersStatus = 2;

      let filtersAutomobile = this.automobileInfs.filter(item => {
        //标志位
        var isFiltersName = true;
        var isfiltersStatus = true;
        var isFiltersCategory = true;
        //判断
        if (filtersName.length != 0) {
          isFiltersName = item.name.indexOf(filtersName) != -1;
        }
        isfiltersStatus = item.status == filtersStatus;
        if (filtersCategory.length != 0) {
          isFiltersCategory = item.category == filtersCategory;
        }
        return isFiltersName && isfiltersStatus && isFiltersCategory;
      });
      this.filterAutomobileInfs = filtersAutomobile;
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
        brand: "",
        category: "",
        engine: "",
        gearbox: "",
        drivingMode: 0,
        energy: null,
        seatNumber: 5,
        yearStyle: "",
        price: null,
        status: 3
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
          let automobileInfs = this.automobileInfs;
          for (let index in automobileInfs) {
            if (automobileInfs[index].id == row.id) {
              automobileInfs.splice(index, 1);
              break;
            }
          }
          //更改缓存
          localStorage.setItem('carInfo', JSON.stringify(this.automobileInfs))
          this.filterAutomobile();
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
              this.automobileInfs.push(newData);
              // 存入缓存
              let storage = JSON.parse(localStorage.getItem('carInfo')) || [];
              storage.push(this.formData);
              localStorage.setItem('carInfo', JSON.stringify(storage));
              //校验
              this.filterAutomobile();
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
              let automobileInfs = this.automobileInfs;
              let newData = Object.assign({}, this.formData);
              newData.status = 1
              for (let index in automobileInfs) {
                if (automobileInfs[index].id == this.id) {
                  automobileInfs.splice(index, 1, newData);
                  break;
                }
              }
              //存入缓存
              localStorage.setItem('carInfo', JSON.stringify(automobileInfs))
              //校验
              this.filterAutomobile();
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
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    formatName(row) {
      return row.name.trim();
    },
    formatCategory(row) {
      let categoryName;
      switch (row.category) {
        case "small":
          categoryName = "小巴";
          break;
        case "middle":
          categoryName = "中巴";
          break;
        case "big":
          categoryName = "大巴";
          break;
        case "double":
          categoryName = "双层巴";
          break;
        default:
          categoryName = "未知";
          break;
      }
      return categoryName;
    },
    formatYearStyle(row) {
      return row.yearStyle.length == 0
        ? "未知"
        : row.yearStyle.trim().length == 0
          ? "未知"
          : row.yearStyle.trim();
    },
    formatPrice(row) {
      return row.price == null ? "未知" : row.price.toString() + "万";
    }
  }
};
</script>

<style scoped>
.small-input {
  width: 60px;
}

.middle-input {
  width: 100px;
}

.normal-input {
  width: 180px;
}

.small-select {
  width: 80px;
}

.middle-select {
  width: 120px;
}

.normal-select {
  width: 200px;
}

.col-position {
  position: relative;
  right: 5px;
}

.dialog-minwidth {
  min-width: 560px;
}
</style>
