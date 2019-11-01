<template>
       
      <el-dialog :title="textMap[dialogStatus]+'软件信息'" :visible.sync="propVisible" :before-close="handleClose">

      <el-form :rules="rules" ref="workflow" :model="workflow" label123456781-position="left" label-width="100px" v-if="propVisible">
        <el-form-item label="流程名称" prop="workflow_name">
              <el-input v-model="workflow.workflow_name"></el-input>
        </el-form-item>
        <el-form-item label="编辑流程模板" >
          <el-steps :active="workflow.active" finish-status="success">
            <el-step v-for="index in workflow.workflowArray.length" :title="'S'+index" :key="workflow.workflowArray[index-1].id" :description="workflow.workflowArray[index-1].name" :icon="icon[0]"></el-step>
          </el-steps> 
            <el-button-group>
              <el-button type="primary" icon="el-icon-arrow-left" @click="previous" :loading="buttonLoading" >上一个节点</el-button>
              <el-button type="primary" @click="next" :loading="buttonLoading" >下一个节点<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <el-button-group>
              <el-button type="primary" icon="el-icon-delete" @click="deleteNode" :loading="buttonLoading" >删除当前节点</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="createNode" :loading="buttonLoading" >在当前节点后新增节点</el-button> 
            </el-button-group>
        </el-form-item>
        <el-form-item label="当前节点名称" prop='name'>
          <el-input v-model="workflow.workflowArray[workflow.active].name"></el-input>
        </el-form-item>
        <el-form-item label="预期完成时间" prop='plan_day'>
              <el-date-picker v-model="workflow.workflowArray[workflow.active].plan_day" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
              </el-date-picker>        
        </el-form-item>
        <el-form-item label="当前节点类型">
          <el-select v-model="workflow.workflowArray[workflow.active].type" placeholder="请选择" >
            <el-option
              v-for="(item,index) in nodeType"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>      
        </el-form-item>
      </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmCreate" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmUpdate" v-else>确认</el-button>
      </div>
</el-dialog>
</template>

<script>
import mixin from './mixin'
import { indexWorkflow, showWorkflow, storeWorkflow, updateWorkflow,
         destroyWorkflow } from '@/api/workflow'    
import { indexNode, showNode, storeNode, updateNode,
         destroyNode } from '@/api/Node'   
const constNodeType = [
                      {name:"建项"},
                      {name:"需求接受"},
                      {name:"环境准备"},
                      {name:"测试执行"},
                      {name:"评审"},
                      {name:"报告"}
                      ]
const init_workflow={
                workflow_name:'测试工作流',
                active:2,
                workflowArray:[
                  {id:1,name:'项目准备阶段',plan_day:'',type:'建项'},
                  {id:2,name:'项目环境搭建阶段',plan_day:'',type:'测试执行'},
                  {id:3,name:'项目执行阶段',plan_day:'',type:'报告'},
                  {id:4,name:'项目评审阶段',plan_day:'',type:'建项'}
                ],
                isError:false
              }
export default {
  name: 'Workflow',
  mixins: [mixin],
  props:{
    propVisible:Boolean,
    propProgramBasicId: Number
  },
  data() {
      var validatePass = (rule, value, callback) => {
      if(this.workflow.workflowArray[this.workflow.active].name!=''){
          callback();
        }else{
          callback(new Error('请输出流程节点名'));
        }
      };
    return {
      content:'请输入内容',
      rules: {
        workflow_name:[ { required: true, message: '请输入流程名称', trigger: 'blur' } ],
        name:{ validator: validatePass, trigger: 'blur' }
      },

      nodeType:constNodeType,
      icon:['el-icon-plus'],
      worklfowTemplate:[],
      workflow:{
                workflow_name:'测试工作流',
                active:2,
                workflowArray:[
                  {id:1,name:'项目准备阶段',plan_day:'',type:'建项'},
                  {id:2,name:'项目环境搭建阶段',plan_day:'',type:'测试执行'},
                  {id:3,name:'项目执行阶段',plan_day:'',type:'报告'},
                  {id:4,name:'项目评审阶段',plan_day:'',type:'建项'}
                ],
                isError:false
              },

      listLoading:false,
      dialogStatus: '',
      textMap: {
          update: '更新',
          create: '创建'
        },
      onConfirming:false,

      buttonLoading:false
    }
  },

   watch:{
      //propVisible start
      propVisible:function(newVa,oldVa){
        if(newVa==true){
          this.getData()
        }
      },
      //propVisible end
  },
   methods: {
      getData(){
        this.listLoading=true;
        showWorkflow(this.propProgramBasicId).then(response => {
          var data=response.data
          if(data.isOkay==true){
            this.dialogStatus='update'
            this.workflow = data.item
          }else{
            this.dialogStatus='create'
          }
          this.listLoading = false
      })
    },
    confirmUpdate(){
      var args={
                  type:this.$options.name,
                  state:this.dialogStatus,
                  programId:this.propProgramBasicId,
                  value:this.workflow
                }
      this.$emit('close',args)
    },
    confirmCreate(){
      this.onConfirming=true
      let storeData={
        programId:this.propProgramBasicId,
        data:this.workflow
      }
      storeWorkflow(storeData).then(response => {
        if(response.data.isOkay==true){
                  this.dialogStatus='update'
                  var args={
                    type:this.$options.name,
                    state:this.dialogStatus,
                    programId:this.propProgramBasicId,
                    value:response.data.item
                  }
                  this.$emit('close',args)
                  this.$notify({
                    title: '信息已更新',
                    message: '请在项目中查看此项目',
                    type: 'success',
                    duration: 2000
                  })
              }
              this.onConfirming=false
            }).catch(error => {
        this.onConfirming=false
      })
    },
    next() {
      this.$refs['workflow'].validate().then(()=>{
          if(this.dialogStatus=='update'){  //更新的情况
            this.updateNode(this.workflow,this.workflow.workflowArray[this.workflow.active],this.workflow.active,'node_update_next',)
          }else{    //创建的流程
            this.workflow.active++;
            if (this.workflow.active == this.workflow.workflowArray.length) this.workflow.active = 0;
          }

      }).catch(()=>{
      });

    },
    previous() {
      this.$refs['workflow'].validate().then(()=>{
          if(this.dialogStatus=='update'){  //更新的情况
            this.updateNode(this.workflow,this.workflow.workflowArray[this.workflow.active],this.workflow.active,'node_update_previous')
          }else{    //创建的流程
            this.workflow.active =this.workflow.active-1;
            if (this.workflow.active ==-1) this.workflow.active = this.workflow.workflowArray.length-1;
          }
      });
        
    },
    deleteNode(){
         var workflow = this.workflow;
         if(this.workflow.workflowArray.length==1){
           this.$confirm('至少保留一个阶段', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'warning'
                })
                return;
         }
         this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  if(this.dialogStatus=='update'){  //更新的情况
                      this.updateNode(this.workflow,this.workflow.workflowArray[this.workflow.active],this.workflow.active,'node_delete')
                  }else{    //创建的流程
                      this.workflow.workflowArray.splice(this.workflow.active,1);
                      if(this.workflow.active==this.workflow.workflowArray.length) this.workflow.active--;
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                  }
                  
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });

    },
    createNode(){
         var workflow = this.workflow;
         this.$confirm('此操作将新增节点, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  var node={type:'建项',name:'New Step',plan_day:''}
                  if(this.dialogStatus=='update'){
                    this.updateNode(this.workflow,node,this.workflow.active,'node_create')
                  }else{
                    workflow.workflowArray.splice(this.workflow.active+1,0,node);
                      this.$message({
                        type: 'success',
                        message: '创建成功!'
                      });
                  }
              
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消创建'
                  });          
                });
    },
    updateNode(workflow,node,index,type){
      let Data={
        programId:this.propProgramBasicId,
        workflowId:this.workflow.id,
        index:index,
        data:node
      }
      this.buttonLoading=true
      if(type=='node_create'){
        storeNode(Data).then(response => {
          if(response.data.isOkay==true){
                  let node =response.data.items
                  workflow.workflowArray.splice(this.workflow.active+1,0,node);
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  });
                }
                this.buttonLoading=false
              }).catch(() => {
                this.$message({
                        type: 'success',
                        message: '创建失败!'
                      });
                this.buttonLoading=false
              });
      }
      if(type== "node_delete"){
        destroyNode(Data.data.id).then(response => {
          if(response.data.isOkay==true){
                      this.workflow.workflowArray.splice(this.workflow.active,1);
                      if(this.workflow.active==this.workflow.workflowArray.length) this.workflow.active--;
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                }
                this.buttonLoading=false
              }).catch(() => {
                this.$message({
                        type: 'success',
                        message: '删除失败!'
                      });
                this.buttonLoading=false
              });
      }
      if (type == "node_update_next") {
        updateNode(Data).then(response => {
          if(response.data.isOkay==true){
                      this.workflow.active++;
                      if (this.workflow.active == this.workflow.workflowArray.length) this.workflow.active = 0;
                      this.$message({
                        type: 'success',
                        message: '更新成功!'
                      });
                }
                this.buttonLoading=false
              }).catch(() => {
                this.$message({
                        type: 'success',
                        message: '更新失败!'
                      });
                this.buttonLoading=false
              });
      }
      if (type == "node_update_previous") {
        updateNode(Data).then(response => {
          if(response.data.isOkay==true){
                    this.workflow.active =this.workflow.active-1;
                    if (this.workflow.active ==-1) this.workflow.active = this.workflow.workflowArray.length-1;
                    this.$message({
                      type: 'success',
                      message: '更新成功!'
                    });
                }
                this.buttonLoading=false
              }).catch(() => {
                this.$message({
                        type: 'success',
                        message: '更新失败!'
                      });
                this.buttonLoading=false
              });
      }
    },

  }

}
</script>

<style scoped>
</style>


