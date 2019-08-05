<template>
  <div class="app-container">



    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="人员名称(支持模糊查询)" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.team" placeholder="按分组" @keyup.enter.native="handleFilter">
        <el-option v-for="(item, index) in selection.team" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>

      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button>
    </div>
     <el-row class="tac">
       <el-col :span="7">
    <el-table :key='program_list.id' :data="program_list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column  width="50px" align="center" label="序号"  type="index">
      </el-table-column>

      <el-table-column width="80px" align="center" label="工程组">
        <template slot-scope="scope">
          <span>{{selection.team.find(x=>x.id==scope.row.team_id).name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="项目个数">
        <template slot-scope="scope">
          <span>{{scope.row.program_count}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="130px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-arrow-right" plain round  @click="OnPeopleChange(scope.row)"> </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
     </el-col>
     <el-col :span="16">

           <el-table :key='detail_list.id' :data="detail_list" v-loading="detailLoading" border fit highlight-current-row
              style="width: 100%;min-height:1000px;">
              <el-table-column type="expand" >
               <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                              <task  :propRoles="props.row.roles" ></task>
                    </el-form>
                </template>

            </el-table-column>
              <el-table-column  width="50px" align="center" label="序号"  type="index">
              </el-table-column>

              <el-table-column width="400px" align="center" label="项目名称">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>

              <el-table-column width="400px" align="center" label="角色">
                <template slot-scope="scope">
                  <span>{{scope.row.roles.map(x=>x.role).join('/')}}</span>
                </template>
              </el-table-column>

              <el-table-column width="300px" align="center" label="任务个数">
                <template slot-scope="scope">
                  <span>{{scope.row.task_count}}</span>
                </template>
              </el-table-column>

          </el-table>

     </el-col>
  </el-row>


  </div>
</template>

<script>

import { indexStatisticPeople, showStatisticPeople, storeStatisticPeople, updateStatisticPeople,
         destroyStatisticPeople } from '@/api/statisticpeople'
import waves from '@/directive/waves' // 水波纹指令
import Task from './components/Task'





export default {
  name: 'peopleTable',
  components: { Task },
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
             ]
      },
      listLoading: true,
      detailLoading:false,


      program_list: [],
      detail_list:[],
      total: new Number(),
      current_employee_id:null,

      listQuery: {
        page: 1,
        limit: 20,
        team:null
      },


      temp: {

      },

      downloadLoading: false
    }
  },

  created() {
    this.getList()
  },
  methods: {
    getList() {

      this.listLoading = true;
      indexStatisticPeople(this.listQuery).then(response => {
        var data=response.data
        this.program_list = Object.values(data.items)
        this.total = data.total

        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    getPeopleDetailList(id) {
      this.detail_list=[];
      this.detailLoading = true;
      showStatisticPeople(id).then(response => {
        var data=response.data
        this.detail_list = Object.values(data.items)
        this.total = data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.detailLoading = false
        }, 1.5 * 1000)
      })
    },
    OnPeopleChange(row){
      this.current_employee_id=row.id;
      this.getPeopleDetailList(row.id);
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '软件名称','项目成员', '当前状态','待解决问题','预计完成时间']
        const filterVal = ['id', 'name', 'program_team_strict', 'state', 'issue','plan_end_time']
        const data = this.formatJson(filterVal, this.program_list)
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '项目信息'+dateTime
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === '') {
          return '';//parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
