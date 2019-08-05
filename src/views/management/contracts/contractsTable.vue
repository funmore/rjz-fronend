<template>
  <div class="app-container">



    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入项目名称" v-model="listQuery.name">
      </el-input>

      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button> -->
    </div>
  <!-- row 字段
        id:             序号
        name:           项目名称
        state:          测试阶段
        planStartTime:  计划开始时间
        planEndTime :   计划结束时间
        workLoad:       工作量
        notes:          备注 -->

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="合同名称">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="当前状态">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)">{{scope.row.contract_type}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="当前状态">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)">{{scope.row.state}}</span>
        </template>
      </el-table-column>
      

      <el-table-column align="center" label="打开" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <router-link :to="'/management/contracts/edit/'+scope.row.id"> 
            <el-button type="primary" size="small" icon="el-icon-edit">打开</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>


   <el-dialog :title="textMap[dialogStatus] + '-'+temp.phase" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label123456781-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="工作内容">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.content">
          </el-input>
        </el-form-item>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { indexManagementContract, showManagementContract, storeManagementContract, updateManagementContract,
         destroyManagementContract } from '@/api/management-contract'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'

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
        importance: undefined,
        name: undefined,
        type: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id:undefined,             
        phase:"fda",          
        content:"adf",        
        planStartTime:new Date(),  
        planEndTime :new Date(),   
        actualStartTime:new Date(),
        actualEndTime:new Date(),  
        workLoad:0,       
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
        // workers: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
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
      fetchManagementContractsList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total

        // Just to simulate the time of the request
        this.listLoading = false
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
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
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
          updateArticle(tempData).then(() => {
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
