<template>
  <div class="app-container">



    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入项目名称" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.xhType" placeholder="按型号">
        <el-option v-for="item in xhTypeOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.xmType" placeholder="按项目类型">
        <el-option v-for="item in  xmTypeOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <el-checkbox v-model="listQuery.checked" @change='handleFilter'>只看我的项目</el-checkbox>

      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button> -->
    </div>
  <!-- row 字段
        id:             序号
        name:           项目名称
        xhType:         型号
        xmType:         项目类型
        state:          测试阶段
        planStartTime:  计划开始时间
        planEndTime :   计划结束时间
        teamMembers:        参加人员
        notes:          备注 -->

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="项目名称">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="所属型号">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.xhType}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="项目类型">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.xmType}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="项目状态">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.state}}</span>
        </template>
      </el-table-column>


      <el-table-column width="150px" align="center" label="计划开始时间">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.planStartTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="计划结束时间">
        <template slot-scope="scope">
          <span @click="handleDialogUpdate(scope.row)">{{scope.row.planEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="项目组长">
        <template slot-scope="scope">
          <span class="link-type" @click="handleDialogUpdate(scope.row)">{{scope.row.teamLeader}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="项目组员">
        <template slot-scope="scope">
          <span class="link-type" @click="handleDialogUpdate(scope.row)">{{scope.row.teamMembers}}</span>
        </template>
      </el-table-column>

      

      <el-table-column min-width="150px" label="备注">
        <template slot-scope="scope">
          <span class="link-type" @click="handleDialogUpdate(scope.row)">{{scope.row.notes}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="打开" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <router-link :to="'/management/programs/edit/'+scope.row.id"> 
            <el-button type="primary" size="small" icon="el-icon-edit">打开</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>


   <el-dialog :title="textMap[dialogStatus] + '-'+temp.phase" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label123456781-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="项目名称">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>

        <el-form-item label="所属型号" prop="xhType">
          <el-select v-model="temp.xhType" filterable placeholder="请选择">
            <el-option
              v-for="item in xhTypeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属项目" prop="xmType">
          <el-select v-model="temp.xmType" filterable placeholder="请选择">
            <el-option
              v-for="item in xmTypeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="temp.actualStartTime" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="temp.actualEndTime" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>



        <el-form-item label="项目组员" prop="teamMembers">

          <el-select v-model="temp.teamMembers" multiple placeholder="请选择">
            <el-option
              v-for="item in teamMembers"
              :key="item.key"
              :label="item.display_name"
              :value="item.display_name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="指定项目组长" prop="teamLeader" v-if="temp.teamMembers.length!=0">

          <el-select v-model="temp.teamLeader" filterable placeholder="请选择">
            <el-option
              v-for="item in temp.teamMembers"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.notes">
          </el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createDialogData">确认</el-button>
        <el-button v-else type="primary" @click="updateDialogData">确认</el-button>
      </div>
    </el-dialog>





  </div>
</template>

<script>
import { fetchManagementProgramsList, fetchPv, createArticle, updateArticle } from '@/api/management-programs'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'

const constTeamMembers = [
  { key: '1', display_name: 'xiep' },
  { key: '2', display_name: 'wangy' },
  { key: '3', display_name: 'liuchl' },
  { key: '4', display_name: 'fanzq' },
  { key: '5', display_name: 'shenb' }

]

// arr to obj ,such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        xhType:undefined,   //型号
        xmType:undefined,
        title: undefined,
        sort: '+id',
        checked:false
      },
      xhTypeOptions: ["型号1","型号2","型号3"],
      xmTypeOptions: ["战术","战略","运载"],
      teamMembers:constTeamMembers,   
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id:undefined,             
        name:"fda",
        state:"",
        xhType:"",         
        xmType:"",                  
        planStartTime:new Date(),  
        planEndTime :new Date(),
        teamLeader:"",   
        teamMembers:new Array(),        
        notes:""
          
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        teamMembers: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
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
      fetchManagementProgramsList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
        phase:"fda",          
        content:"adf",       
        planStartTime:new Date(),  
        planEndTime :new Date(),   
        teamMembers:"df",        
        actualStartTime:new Date(),
        actualEndTime:new Date(),  
        workLoad:0,       
        notes:""  
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createDialogData() {
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //     this.temp.author = 'vue-element-admin'
      //     createArticle(this.temp).then(() => {
      //       this.list.unshift(this.temp)
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: '成功',
      //         message: '创建成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    },
    handleDialogUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    updateDialogData() {
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     const tempData = Object.assign({}, this.temp)
      //     tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      //     updateArticle(tempData).then(() => {
      //       for (const v of this.list) {
      //         if (v.id === this.temp.id) {
      //           const index = this.list.indexOf(v)
      //           this.list.splice(index, 1, this.temp)
      //           break
      //         }
      //       }
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: '成功',
      //         message: '更新成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
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
