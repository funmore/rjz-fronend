<template>
  <div class="app-container">



    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入姓名" v-model="listQuery.name">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button> -->
    </div>


    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column  width="50px" align="center" label="序号"  type="index">
      </el-table-column>

      <el-table-column width="100px" align="center" label="姓名">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" >{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="用户名">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" >{{scope.row.username}}</span>
        </template>
        </el-table-column>

      <el-table-column width="100px" align="center" label="登录密码">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" >{{scope.row.password}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="分组" sortable prop=‘team_id’>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" >{{selection.team.find(x=>x.id==scope.row.team_id).name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70px" align="center" label="主任权限" sortable prop='is_director'>
        <template slot-scope="scope" >
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_director==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>
      
      <el-table-column width="70px" align="center" label="副主任权限" sortable prop='is_v_director'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_v_director==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="工程组长权限" sortable prop='is_teamleader'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_teamleader==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="主任设计师权限" sortable prop='is_chiefdesigner'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_chiefdesigner==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="副主任设计师权限" sortable prop='is_v_chiefdesigner'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_v_chiefdesigner==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="项目组长权限" sortable prop='is_p_leader'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_p_leader==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="型号负责人权限" sortable prop='is_p_principal'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_p_principal==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="质量保证员权限" sortable prop='is_qa'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_qa==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="配置管理员权限" sortable prop='is_cm'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_cm==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="市场人员权限" sortable prop='is_bd'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_bd==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="测试人员权限" sortable prop='is_tester'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_tester==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>

      <el-table-column width="70px" align="center" label="管理员权限" sortable prop='is_admin'>
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)" v-if="scope.row.is_admin==1"><i class="el-icon-check"></i></span>
          <!-- <span @click="handleUpdate(scope.row)" v-else>是</span> -->
        </template>
      </el-table-column>


<!--       <el-table-column align="center" label="打开" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <router-link :to="'/management/contracts/edit/'+scope.row.id"> 
            <el-button type="primary" size="small" icon="el-icon-edit">打开</el-button>
          </router-link>
        </template>
      </el-table-column> -->

    </el-table>


   <el-dialog :title="textMap[dialogStatus] + '-员工信息'" :visible.sync="visible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label123456781-position="left" label-width="150px" style='width: 700px; margin-left:50px;'>
        
        <el-col :span="12">
        <el-form-item label="姓名">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>
      </el-col>
        
      <el-col :span="12" v-if="dialogStatus=='update'">
        <el-form-item label="用户名">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.username">
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="dialogStatus=='update'">
        <el-form-item label="密码">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.password">
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="年龄">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.age">
          </el-input>
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="性别">
          <el-select v-model="temp.sex" placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.sex"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="联系方式">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.mobilephone">
          </el-input>
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="分组" >
          <el-select v-model="temp.team_id" placeholder="请选择">
            <el-option
              v-for="item in selection.team"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>

                
        <el-col :span="12">
        <el-form-item label="主任权限">
          <el-select v-model="temp.is_director" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>

                
        <el-col :span="12">
        <el-form-item label="副主任权限">
          <el-select v-model="temp.is_v_director" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="工程组长权限">
          <el-select v-model="temp.is_teamleader" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="主任设计师权限">
          <el-select v-model="temp.is_chiefdesigner" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="副主任设计师权限">
          <el-select v-model="temp.is_v_chiefdesigner" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="项目组长权限">
          <el-select v-model="temp.is_p_leader" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="型号负责人权限">
          <el-select v-model="temp.is_p_principal" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="质量保证员权限">
          <el-select v-model="temp.is_qa" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="配置管理员权限">
          <el-select v-model="temp.is_cm" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="市场人员权限">
          <el-select v-model="temp.is_bd" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="测试人员权限">
          <el-select v-model="temp.is_tester" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>
        
        <el-col :span="12">
        <el-form-item label="管理员权限">
          <el-select v-model="temp.is_admin" placeholder="请选择">
            <el-option
              v-for="item in selection.isOrNot"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { indexEmployee, showEmployee, storeEmployee, updateEmployee,
         destroyEmployee } from '@/api/employee'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'




export default {
  name: 'employeesTable',
  directives: {
    waves
  },

  data() {
    return {
      selection:{
        team:[
             {id:1,name:'测试一部'},
             {id:2,name:'测试二部'},
             {id:3,name:'环境研发部'},
             {id:4,name:'综合管理'},
             {id:5,name:'室领导'}
             ],
        isOrNot:[
            {id:1,name:'是'},
            {id:0,name:'否'}
           ],
        sex:['男','女']
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        checkCOMPLEX:true
      },
      xhTypeOptions: ["型号1","型号2","型号3"],
      xmTypeOptions: ["战术","战略","运载"],
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id:undefined,             
        name:"人员",        
        age:null, 
        sex:null,  
        mobilephone:null,
        team_id:null, 
        is_director:null,
        is_v_director:null,
        is_chiefdesigner:null,
        is_v_chiefdesigner:null,
        is_teamleader:null,
        is_p_leader:null,
        is_p_principal:null,
        is_qa:null,
        is_cm:null,
        is_bd:null,
        is_tester:null,
        is_admin:null

      },
      visible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
      },
      downloadLoading: false
    }
  },
  filters: {
    parseTime,
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      indexEmployee(this.listQuery).then(response => {
        let data=response.data;
        this.list = Object.values(data.items);
        this.total = data.total;
        this.listLoading=false
      })

    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id:undefined,             
        name:"请输入姓名",        
        age:'27', 
        sex:'男',  
        mobilephone:'88999',
        team_id:1, 
        is_director:0,
        is_v_director:0,
        is_chiefdesigner:0,
        is_v_chiefdesigner:0,
        is_teamleader:0,
        is_p_leader:0,
        is_p_principal:0,
        is_qa:0,
        is_cm:0,
        is_bd:0,
        is_tester:0,
        is_admin:0
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          storeEmployee(this.temp).then((response) => {
            this.temp.id=response.data.items;
            this.temp.username=this.temp.name;
            this.temp.password='AB12345678c';
            this.list.unshift(this.temp)
            this.visible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
          updateEmployee(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
                break
              }
            }
            this.visible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
