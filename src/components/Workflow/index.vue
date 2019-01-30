<template>
       
      <el-form :rules="rules" ref="dataForm" :model="workflow" :label123456781-position="position" :label-width="width" >
        <el-form-item label="流程名称" prop="workflow_name">
              <el-input v-model="workflow.workflow_name"></el-input>
        </el-form-item>
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
</template>

<script>


export default {
  name: 'workflow-demo',
  //components: { 'tinymce':Tinymce },
  //components: { 'workflow':workflow},
  props:{
    workflow: Array,
    position: String,
    width: String
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
    }
  },
   methods: {
    next() {
      this.$refs['dataForm'].validate().then(()=>{
            this.workflow.active++;
            if (this.workflow.active == this.workflow.workflowArray.length) this.workflow.active = 0;
      });

    },
    previous() {
      this.$refs['dataForm'].validate().then(()=>{
            this.workflow.active =this.workflow.active-1;
            if (this.workflow.active ==-1) this.workflow.active = this.workflow.workflowArray.length-1;
      });
        
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
</style>


