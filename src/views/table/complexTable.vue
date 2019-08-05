<template>
  <div class="app-container">

  <!-- row 字段
        id:             序号
        phase:          测试阶段
        content:        工作内容
        planStartTime:  计划开始时间
        planEndTime :   计划结束时间
        workers:        参加人员
        actualStartTime:实际开始时间
        actualEndTime:  实际结束时间
        workLoad:       工作量
        notes:          备注 -->

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="测试阶段">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)">{{scope.row.phase}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="工作内容">
        <template slot-scope="scope">
<!--           <span class="link-type" @click="handleUpdate(scope.row)"></span>
 -->          <span @click="handleUpdate(scope.row)">{{scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="计划结束时间">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)">{{scope.row.planStartTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="计划结束时间">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.row)">{{scope.row.planEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="参加人员">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.workers}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="实际结束时间">
        <template slot-scope="scope">
          <span>{{scope.row.actualStartTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="实际结束时间">
        <template slot-scope="scope">
          <span>{{scope.row.actualEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="工作量">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.workLoad}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="备注">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.notes}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="编辑" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>


   <el-dialog :title="textMap[dialogStatus] + '-'+temp.phase" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label123456781-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="工作内容">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.content">
          </el-input>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="temp.actualStartTime" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="temp.actualEndTime" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="测试人员" prop="workers">
          <el-select class="filter-item" v-model="temp.workers" placeholder="Please select">
            <el-option v-for="item in  workers" :key="item.key" :label="item.display_name" :value="item.display_name">
            </el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="工作量">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.workLoad">
          </el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.notes">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

<!--     <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确认</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import { fetchComplexTableList, fetchPv, createArticle, updateArticle } from '@/api/article'
//import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils/index.js'

const workers = [
  { key: '1', display_name: 'xiep' },
  { key: '2', display_name: 'wangy' },
  { key: '3', display_name: 'liuchl' },
  { key: '4', display_name: 'fanzq' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'complexTable',
  // directives: {
  //   waves
  // },
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
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      workers:workers,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id:undefined,             
        phase:"fda",          
        content:"adf",        
        planStartTime:new Date(),  
        planEndTime :new Date(),   
        workers:"df",        
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
        workers: [{ required: true, message: 'type is required', trigger: 'change' }],
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
      fetchComplexTableList(this.listQuery).then(response => {
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
        workers:"df",        
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
          this.temp.workers = 'vue-element-admin'
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
