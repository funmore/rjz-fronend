 <template>
  <div :visible.sync="propVisible">
      <div class="filter-container" v-if="isEditable">
           <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增待解决事项</el-button>
      </div>

      <el-table  :key='program_note.created_at' :data="program_note"  v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;">

         <el-table-column  label="序号"
            type="index"
            width="50">
          </el-table-column>

          <el-table-column width="160px" align="center" label="提出人">
            <template slot-scope="scope">
              {{scope.row.creator}}
            </template>
          </el-table-column>

          <el-table-column width="160px" align="center" label="待解决问题">
            <template slot-scope="scope">
              {{scope.row.note}}
            </template>
          </el-table-column>


          <el-table-column width="160px" align="center" label="状态">
            <template slot-scope="scope">
              <span >{{scope.row.state}}</span>
            </template>
          </el-table-column>


          <el-table-column width="160px" align="center" label="是否抄送型号周报">
            <template slot-scope="scope">
              {{scope.row.is_up}}
            </template>
          </el-table-column>


          <el-table-column width="160px" align="center" label="操作" v-if="isEditable">
            <template slot-scope="scope">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>

      </el-table>


      <el-dialog :title="textMap[dialogStatus]+'待解决问题'" :visible.sync="visible">
        <el-form :rules="rules" ref="NodeNote" :model="temp" label123456781-position="left" label-width="100px" style='width: 600px; margin-left:50px;'>

          <el-form-item label="待解决问题">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="temp.note">
            </el-input>
          </el-form-item>

          <el-form-item label="状态" v-if="isEditable">
              <el-select v-model="temp.state" filterable placeholder="请选择" >
                <el-option
                  v-for="item in state"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="是否抄送型号周报"  v-if="isEditable">
              <el-select v-model="temp.is_up" filterable placeholder="请选择" >
                <el-option
                  v-for="item in is_up"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

      </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary"  @click="confirmCreate(temp)" v-if="dialogStatus=='create'">申请</el-button>
          <el-button type="primary"  @click="confirmUpdate(temp)" v-else>修改</el-button>
       </div>
      </el-dialog>
</div>
</template>
<script>

import { indexNodeNote, showNodeNote, storeNodeNote, updateNodeNote,
         destroyNodeNote } from '@/api/NodeNote'


  export default {
    data() {
      return {

        activeName:'log',
        listLoading:true,
        listQuery:{
          id:''
        },
        workflowArray:this.propWorkflowArray,


        is_up:['是','否'],
        state:['待解决','解决中','已解决'],
        temp:{
          state:'',
          note:'',
          is_up:''
        },
        visible:false,
        rules:{},

        program_note:[],
        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        },
        isEditable:false
      };
    },
    props:{
        propVisible:Boolean,
        propNodeId:Number,
        propRole:Array
    },
   watch:{
      //propVisible start
      propVisible:function(newVa,oldVa){
        if(newVa==true){
          this.getNodeNote(this.propNodeId);
          this.isEditable=this.checkPermission(this.propRole);
        }
      },
      //propVisible end
  },
    methods: {
      checkPermission(propRole){
      return propRole.includes("项目组长");
    },
    getNodeNote(id){
      this.program_note=[];
      this.listLoading = true;
      this.listQuery.id=id;
      indexNodeNote(this.listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.program_note = data.items
        }
      this.listLoading=false;
      })
      },
    handleFilter(){

    },
    handleCreate(){
          this.dialogStatus='create';
          this.temp={
            state:'',
            note:'',
            is_up:''
            },
          this.visible=true;

      },
      handleEdit(row){
           this.dialogStatus='update';
          this.temp=row;
          this.visible=true;
      },
      confirmCreate(item){
        item.NodeId=this.propNodeId;

        this.$refs['NodeNote'].validate((valid) => {
          if (valid) {
            this.visible=false;
            storeNodeNote(item).then(response => {
              var data=response.data
              item = data.items
              this.program_note.push(item)
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
        this.$refs['NodeNote'].validate((valid) => {
          if (valid) {
            this.visible=false;
            updateNodeNote(item).then(response => {
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
      cancel(){
        this.visible=false;
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

