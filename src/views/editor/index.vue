<template>
  <div class="components-container">
    <div>
      <tinymce :height="300" v-model="content"></tinymce>
    </div>
    <div>
      <el-button type="primary" round @click="handleClick">主要按钮</el-button> 
    </div>

       <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules0" ref="dataForm0" :model="workflow" label123456781-position="left" label-width="70px" >
            <el-form-item label="流程名称" prop="name">
              <el-input v-model="workflow.name"></el-input>
            </el-form-item>
        </el-form>
      <el-form :rules="rules1" ref="dataForm1" :model="workflow.workflowArray[workflow.active]" label123456781-position="left" label-width="70px" >
        <el-form-item label="编辑流程模板" >
          <el-steps :active="workflow.active" finish-status="success">
            <el-step v-for="index in workflow.workflowArray.length" :title="'S'+index" :description="workflow.workflowArray[index-1].name" :icon="icon[0]"></el-step>
          </el-steps> 
           <el-button-group>
              <el-button type="primary" icon="el-icon-arrow-left" @click="previous">上一个节点</el-button>
              <el-button type="primary" @click="next">下一个节点<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <el-button-group>
              <el-button type="primary" icon="el-icon-delete" @click="deleteNode">删除当前节点</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="createNode">在当前节点后新增节点</el-button> 
            </el-button-group>
            <div>actvieNum:{{workflow.active}}</div>
            <div>workflow:{{workflow.workflowArray}}</div>
        </el-form-item>
        <el-form-item label="当前节点名称" prop='name'>
          <el-input v-model="workflow.workflowArray[workflow.active].name"></el-input>
        </el-form-item>
        <el-form-item label="当前节点类型">
          <el-select v-model="workflow.workflowArray[workflow.active].type" placeholder="请选择" >
            <el-option
              v-for="item in nodeType"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>      
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
 import Tinymce from '@/components/Tinymce'
import { updateWorkflow,createWorkflow } from '@/api/workflow'

const constNodeType = [
  { type: 0, name: '大纲评审' },
  { type: 1, name: '首轮测试' },
  { type: 2, name: '问题报告单闭合' },
  { type: 3, name: '入库归档' }
]

// const constNodeType = {
//     '0': '大纲评审' ,
//     '1': '首轮测试' ,
//     '2': '问题报告单闭' ,
//     '3': '入库归档' 
// }

export default {
  name: 'tinymce-demo',
  components: { 'tinymce':Tinymce },
  data() {
    return {
      content:'请输入内容',
      dialogFormVisible:false,

      rules0: {
        name: [ { required: true, message: '请输入流程名称', trigger: 'blur' } ]
      },
      rules1: {
        name: [ { required: true, message: '请输入步骤名称', trigger: 'blur' } ]
      },
      workflow:{
          name:'test workflow',
          active:2,
          workflowArray:[
            {name:'stepA',type:1},
            {name:'stepB',type:2},
            {name:'stepC',type:3},
            {name:'stepD',type:4}
          ]
        },
      nodeType:constNodeType,
      icon:['el-icon-plus'],
      textMap: {
        update: '更新',
        create: '创建'
      },
      dialogStatus:'update'
    }
  },
   methods: {
    handleClick(){
        this.dialogFormVisible=true;
    },
    createDialogData(){
      //先校验流程名，再校验流程节点名
      this.$refs['dataForm0'].validate()
          .then(()=>{
          this.$refs['dataForm1'].validate().then(()=>{
            createWorkflow(this.workflow.workflowArray).then(()=>{
              this.$notify({
                 title: '成功',
                 message: '更新成功',
                 type: 'success',
                 duration: 2000
              })
            })

          }).catch(()=>{
            this.$message({
                message: '有流程节点名未设置',
                type: 'warning'
              });
          })
        }).catch(()=>{
            this.$message({
                message: '流程名未设置',
                type: 'warning'
              });
        });
    },
    updateDialogData(){
      //先校验流程名，再校验流程节点名
      this.$refs['dataForm0'].validate()
          .then(()=>{
          this.$refs['dataForm1'].validate().then(()=>{
            updateWorkflow(this.workflow.workflowArray).then(()=>{
              this.$notify({
                 title: '成功',
                 message: '更新成功',
                 type: 'success',
                 duration: 2000
              })
            })

          }).catch(()=>{
            this.$message({
                message: '有流程节点名未设置',
                type: 'warning'
              });
          })
        }).catch(()=>{
            this.$message({
                message: '流程名未设置',
                type: 'warning'
              });
        });
      //       this.$refs['dataForm0'].validate((valid) => {
      //   if (valid) {
      //     this.$refs['dataForm1'].validate((valid)=>{
      //       if(valid){
      //         var a =1;
      //       }
      //     })
      //   }
      // })
    },
    next() {
      this.workflow.active++;
      if (this.workflow.active == this.workflow.workflowArray.length) this.workflow.active = 0;
    },
    previous() {
      this.workflow.active =this.workflow.active-1;
      if (this.workflow.active ==-1) this.workflow.active = this.workflow.workflowArray.length-1;
    },
    deleteNode(){
         var workflow = this.workflow;
         this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  workflow.workflowArray.splice(this.workflow.active,1);
                  if(workflow.active==workflow.workflowArray.length) workflow.active--;
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
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
                  workflow.workflowArray.splice(this.workflow.active+1,0,{type:0,name:'New Step'});
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消创建'
                  });          
                });
    }
  }

}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


