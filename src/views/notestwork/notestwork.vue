 <template>

  <div>
    <el-row class="tac">
      <el-col :span="8">
          <el-calendar v-model="calenderDate" @click.native="OnCalenderClick(calenderDate)">
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''">

                {{ data.day.split('-').slice(1).join('-') }} <!-- {{ data.isSelected ? '✔️' : ''}} -->
            </p>
<!--             <ul>
              <li v-for="item in oneDayLog(date)" :key="item.created_at">
              {{item.type}}
            </li>
            </ul> -->
            <el-badge v-if="ifOneDayLog(date)" :value="oneDayLogLength(date)" class="item">
           </el-badge>

            </template>
          </el-calendar>
      </el-col>
      <el-col :span="16">


             <div class="filter-container">
              <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit" >新增非测试工作日志</el-button>
            </div>




            <el-table :key='list.created_at' :data="list"  v-loading="listLoading" border fit highlight-current-row
            style="width: 100%;">

                <el-table-column  label="序号"
                  type="index"
                  width="50">
                </el-table-column>

                <el-table-column width="120px" align="center" label="日期">
                  <template slot-scope="scope">
                    {{scope.row.date | dateTime}}
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="开始时间">
                  <template slot-scope="scope">
                    {{scope.row.range_start}}
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="结束时间">
                  <template slot-scope="scope">
                    {{scope.row.range_end}}
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="工作类型">
                  <template slot-scope="scope">
                    {{scope.row.type}}
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="工作产品">
                  <template slot-scope="scope">
                    {{scope.row.output}}
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="协助人">
                  <template slot-scope="scope">
                    {{scope.row.assist_name}}
                  </template>
                </el-table-column>

                <el-table-column width="120px" align="center" label="备注">
                  <template slot-scope="scope">
                    {{scope.row.note}}
                  </template>
                </el-table-column>

                <el-table-column width="240px" align="center" label="操作">
                  <template slot-scope="scope">
                      <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">打开</el-button>
                      <el-button type="primary" size="small" icon="el-icon-edit" :loading="onDeleting" @click="handleDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>


            </el-table>
      </el-col>
</el-row>


        <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible">
            <el-form :rules="rules" ref="form" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>


            <el-form-item label="记录日期" >
                <span>{{temp.date| dateTime}}</span>
            </el-form-item>

            <el-form-item label="起止时间" >
                <el-time-select
                  placeholder="起始时间"
                  v-model="temp.range_start"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00'
                  }">
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="temp.range_end"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00',
                    minTime: temp.range_start
                  }">
                </el-time-select>
            </el-form-item>

            <el-form-item label="工作类型">
                  <el-select v-model="temp.type" filterable placeholder="请选择" >
                    <el-option
                      v-for="(item,index) in type"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
            </el-form-item>


            <el-form-item label="协助人">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.assist_name">
                </el-input>
            </el-form-item>

              <el-form-item label="工作产品">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.output">
                </el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.note">
                </el-input>
              </el-form-item>
          </el-form>



            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreate(temp)" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary"  @click="confirmUpdate(temp)" v-else>确认</el-button>
           </div>
        </el-dialog>
            

         


 
</div>

   
</template>
<script>
  import { indexNoTestWork, indexNoTestWorkLogMonth, showNoTestWork, storeNoTestWork, updateNoTestWork,
    destroyNoTestWork } from '@/api/NoTestWork'
  import { zeroTime, dateTime, fullZeroTime, getLastMonday } from '@/utils/index.js'

  export default {
    data() {
      var nowTime = new Date()
      return {
        listLoading: true,
        onDeleting: false,
        listQuery: {
          isAll: true,
          title: ''
        },
        calenderDate: nowTime,
        type: ['技术把关与评审活动(内)', '技术把关与评审活动(外)', '能力建设', '预先研究', '成果申报', '调研交流', '知识分享(授课/典型案例)', '专业学习(培训/自学)', '团队活动', '项目管理(测试项目协调)', '综合管理(各类行政类/党团类会议/活动组织)'],
        temp: {
          date: zeroTime(nowTime, '{y}-{m}-{d} {h}:{i}:{s}'),
          range_start: '08:00',
          range_end: '08:30',
          type: '技术把关与评审活动(内)',
          assist_name: '',
          output: '',
          note: ''
        },
        visible: false,
        rules: {
        },

        list: [],

        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        },
        datesArr: [],
        logMonthList: []
      }
  },
    filters: {
      dateTime
      // test1(date){
      //   var date=date;
      // },
      // test2(data){
      //   var data=data;
      // }
    },
    created() {
      this.getList()
      this.datesArr = this.get42dayArrayFromMonday()
      this.getMonthList()
    },

    methods: {
      // 是否存在日志
      ifOneDayLog(date) {
        date = zeroTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
        var item = this.logMonthList.find(x => x.date === date)
        if (item != null && item.data != 0) {
          return true
        } else {
          return false
        }
      },

      // oneDayLog(date){
      //   date=zeroTime(date,'{y}-{m}-{d} {h}:{i}:{s}');
      //   var item=this.logMonthList.find( x => x.date === date );
      //   if(item!=null&&item.data!=null){
      //     return item.data;
      //   }else{
      //     return null;
      //   }
      // },
      oneDayLogLength(date) {
        date = zeroTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
        var item = this.logMonthList.find(x => x.date === date)
        if (item != null) {
          return item.data
        } else {
          return 0
        }
      },
      getMonthList() {
        const listQuery = {
          datesArr: this.datesArr
        }
        indexNoTestWorkLogMonth(listQuery).then(response => {
          var data = response.data
          if (data.total != 0) {
            this.logMonthList = data.items
          }
        })
      },
      getList() {
        this.listLoading = true
        this.listQuery = {
          date: this.temp.date
        }
        this.list = []
        indexNoTestWork(this.listQuery).then(response => {
          var data = response.data
          if (data.total != 0) {
            this.list = Object.values(data.items)
          }
          this.listLoading = false
        })
      },
      handleFilter() {

      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.temp = {
          date: zeroTime(this.calenderDate, '{y}-{m}-{d} {h}:{i}:{s}'),
          range_start: '08:00',
          range_end: '08:30',
          type: '技术把关与评审活动(内)',
          assist_name: '',
          output: '',
          note: ''
        },
        this.visible = true
      },
      handleEdit(row) {
        this.dialogStatus = 'update'
        this.temp = row
        this.visible = true
      },
      handleDelete(row) {
        this.$confirm('此操作将永久该日志信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onDeleting = true
          destroyNoTestWork(row.id).then(response => {
            var data = response.data
            if (data.is_okay == true) {
              for (const v of this.list) {
                if (v.id === row.id) {
                  const index = this.list.indexOf(v)
                  this.logMonthList.find(x => x.date === row.date).data -= 1
                  this.list.splice(index, 1)
                  break
                }
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '删除失败',
                message: '只有管理员可以删除',
                type: 'success',
                duration: 2000
              })
            }
            this.onDeleting = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      confirmCreate(item) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.visible = false
            storeNoTestWork(item).then(response => {
              var data = response.data
              item.id = data.id
              item.created_at = data.created_at
              this.list.unshift(item)
              this.logMonthList.find(x => x.date === item.date).data += 1
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      confirmUpdate(item) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.visible = false
            updateNoTestWork(item).then(response => {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      OnCalenderClick(date) {
        this.temp.date = zeroTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
        this.getList()
      },
      get42dayArrayFromMonday(date) {
        var date = date
        if (date == null) {
          date = new Date()
        }
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        if (firstDay.getDay() == 1) {
          // 当月的第一天就星期一
        } else {
          // 否则去查询上个月的最后一个星期一
          firstDay = getLastMonday(date.getMonth(), date.getFullYear())
        }
        // daysArray is in yyyy-mm-dd form  in 6 weeks 42 days
        var daysArray = [zeroTime(firstDay, '{y}-{m}-{d} {h}:{i}:{s}')]
        for (var count = 0; count < 41; count++) {
          const dateToPush = firstDay.setDate(firstDay.getDate() + 1)
          var dateToPushFormated = zeroTime(dateToPush, '{y}-{m}-{d} {h}:{i}:{s}')
          daysArray.push(dateToPushFormated)
        }
        return daysArray
      }

    }
  }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 180px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .is-selected {
    color: #1989FA;
  }
</style>

