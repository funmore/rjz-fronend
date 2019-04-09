 <template>
  <div>
      <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="工作日志" name="log">
              <div class="filter-container">
                <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.workflowArray" >
                  <el-option v-for="item in workflowArray" :key="item.array_index" :label="'截止'+item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增工作记录</el-button>
              </div>
               <el-table  :key='daily_note.created_at' :data="daily_note"  v-loading="listLoading" border fit highlight-current-row  style="width: 100%;">
                         <el-table-column  label="序号"
                            type="index"
                            width="50">
                          </el-table-column>

                          <el-table-column width="160px" align="center" label="记录日">
                            <template slot-scope="scope">
                              {{scope.row.created_at}}
                            </template>
                          </el-table-column>


                          <el-table-column width="160px" align="center" label="今日预计完成">
                            <template slot-scope="scope">
                              <span >{{scope.row.plan_work}}</span>
                            </template>
                          </el-table-column>

                          <el-table-column width="160px" align="center" label="今日实际完成">
                            <template slot-scope="scope">
                              {{scope.row.actual_work}}
                            </template>
                          </el-table-column>

                          <el-table-column width="160px" align="center" label="协助人">
                            <template slot-scope="scope">
                              {{scope.row.assist_name}}
                            </template>
                          </el-table-column>

                          <el-table-column width="160px" align="center" label="工作产品">
                            <template slot-scope="scope">
                              {{scope.row.output}}
                            </template>
                          </el-table-column>

                          <el-table-column width="160px" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
                            </template>
                          </el-table-column>
                </el-table>
          </el-tab-pane>






          <el-tab-pane label="延期管理" name="delay">
              <div class="filter-container" v-if="!propIsLeader">
                   <el-button class="filter-item" style="margin-left: 10px;" @click="handleDelayCreate" type="primary" icon="el-icon-edit">申请延期</el-button>
              </div>

              <el-table  :key='delay_apply.created_at' :data="delay_apply"  v-loading="listLoadingDelay" border fit highlight-current-row
        style="width: 100%;">

           <el-table-column  label="序号"
              type="index"
              width="50">
            </el-table-column>

            <el-table-column width="160px" align="center" label="日期">
              <template slot-scope="scope">
                {{scope.row.created_at}}
              </template>
            </el-table-column>


            <el-table-column width="160px" align="center" label="延期时间">
              <template slot-scope="scope">
                <span >{{scope.row.delay_day}}</span>
              </template>
            </el-table-column>

            <el-table-column width="160px" align="center" label="延期原因">
              <template slot-scope="scope">
                {{scope.row.delay_reason}}
              </template>
            </el-table-column>

            <el-table-column width="160px" align="center" label="意见">
              <template slot-scope="scope">
                {{scope.row.is_approved}}
              </template>
            </el-table-column>


            <el-table-column width="160px" align="center" label="操作" v-if="propIsLeader">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEditDelay(scope.row)">审核</el-button>
              </template>
            </el-table-column>

        </el-table>
          </el-tab-pane>
        </el-tabs>

        
        

       


       <el-dialog :title="textMap[dialogNoteStatus]+'工作记录'" :visible.sync="visibleNote">
            <el-form :rules="rules" ref="DailyNoteEdit" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>

              <el-form-item label="今日预计完成">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.plan_work">
                </el-input>
              </el-form-item>

              <el-form-item label="今日实际完成">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.actual_work">
                </el-input>
              </el-form-item>

              <el-form-item label="协助人">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.assist_name">
                </el-input>
              </el-form-item>

              <el-form-item label="工作产品">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.output">
                </el-input>
              </el-form-item>
          </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreate(temp)" v-if="dialogNoteStatus=='create'">确认</el-button>
              <el-button type="primary"  @click="confirmUpdate(temp)" v-else>确认</el-button>
           </div>

          </el-dialog>

          <el-dialog :title="textMap[dialogDelayStatus]+'延期申请'" :visible.sync="visibleDelay">
            <el-form :rules="rules" ref="DelayEdit" :model="tempDelay" label123456781-position="left" label-width="100px" style='width: 600px; margin-left:50px;'>

              <el-form-item label="延期原因">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="tempDelay.delay_reason">
                </el-input>
              </el-form-item>

              <el-form-item label="调整截止日期" v-if="propIsLeader">
                <el-date-picker v-model="tempDelay.delay_day" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="意见"  v-if="propIsLeader">
                  <el-select v-model="tempDelay.is_approved" filterable placeholder="请选择" >
                    <el-option
                      v-for="item in approveMes"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>

          </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreateDelay(tempDelay)" v-if="dialogDelayStatus=='create'">申请</el-button>
              <el-button type="primary"  @click="confirmUpdateDelay(tempDelay)" v-else>审核</el-button>
           </div>
          </el-dialog>
</div>
</template>
<script>

  import { indexDailyNote, showDailyNote, storeDailyNote, updateDailyNote,
         destroyDailyNote } from '@/api/dailynote'
  import { indexDelayApply, showDelayApply, storeDelayApply, updateDelayApply,
destroyDelayApply } from '@/api/delayapply'

  export default {
    data() {
      return {

        activeName:'log',
        listLoading:true,
        listLoadingDelay:true,
        listQuery:{
          workflowArray:''
        },
        workflowArray:this.propWorkflowArray,
        listQueryDelay:{
          workflowArray:''
        },
        approveMes:['同意','不同意'],
        temp:{
          plan_work:'',
          actual_work:'',
          assist_name:'',
          output:''
        },
        tempDelay:{
            delay_day:'',
            delay_reason:''
        },
        visibleNote:false,
        visibleDelay:false,
        rules:{},

        daily_note:[],
        delay_apply:[],
        dialogNoteStatus: '',
        dialogDelayStatus:'',
        textMap: {
          update: '更新',
          create: '创建'
        }
      };
    },
    props:{
        propPtrNoteId:Number,
        propIsLeader:Boolean
    },

    created(){

    },
    mounted(){
      this.getDailyNote(this.propPtrNoteId);
      this.getDelayApply(this.propPtrNoteId)
    },
    methods: {
    getDelayApply(){
      this.listQueryDelay.id=this.propPtrNoteId;
      indexDelayApply(this.listQueryDelay).then(response => {
        var data=response.data
        if(data.total!=0){
          this.delay_apply = data.items
        }
        this.listLoadingDelay=false;
      })
    },
    getDailyNote(id){
      this.listLoading = true;
      this.listQuery.id=this.propPtrNoteId;
      indexDailyNote(this.listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.daily_note = data.items
        }
      this.listLoading=false;
      })
      },
    handleFilter(){

    },
    handleDelayCreate(){
          this.dialogDelayStatus='create';
          this.tempDelay={
              delay_day:'',
              delay_reason:''
            },
          this.visibleDelay=true;
    },
    handleCreate(){
          this.dialogNoteStatus='create';
          this.temp={
              plan_work:'',
              actual_work:'',
              assist_name:'',
              output:''
            },
          this.visibleNote=true;

      },
      handleEdit(row){
           this.dialogNoteStatus='update';
          this.temp=row;
          this.visibleNote=true;
      },
      handleEditDelay(row){
           this.dialogDelayStatus='update';
          this.tempDelay=row;
          this.visibleDelay=true;
      },

      confirmCreateDelay(item){
          item.ptrNoteId=this.propPtrNoteId;

        this.$refs['DelayEdit'].validate((valid) => {
          if (valid) {
            this.visibleDelay=false;
            storeDelayApply(item).then(response => {
              var data=response.data
              this.delay_apply.push(item);
              this.$emit('doDelayApply',item)
              this.$notify({
                title: '申请延期',
                message: '请通知项目组长',
                type: 'success',
                duration: 2000
              })
          }).catch(err => {
            console.log(err)
          })
        }
      })
      },
      confirmUpdateDelay(item){
        this.$refs['DelayEdit'].validate((valid) => {
          if (valid) {
            this.visibleDelay=false;
            updateDelayApply(item).then(response => {
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
      confirmCreate(item){
        item.ptrNoteId=this.propPtrNoteId;

        this.$refs['DailyNoteEdit'].validate((valid) => {
          if (valid) {
            this.visibleNote=false;
            storeDailyNote(item).then(response => {
              var data=response.data
              item = data.items
              this.daily_note.push(item)
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
      confirmUpdate(item){
        this.$refs['DailyNoteEdit'].validate((valid) => {
          if (valid) {
            this.visibleNote=false;
            updateDailyNote(item).then(response => {
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
      }

    }
  };
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

