<template>
  <div class="components-container">
    <div>
      <tinymce :height="300" v-model="content"></tinymce>
    </div>
    <div>
      <el-button type="primary" round @click="handleClick">主要按钮</el-button> 
    </div>

<!--        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
    <el-dialog title="分类" :visible.sync="invisible[0]">
        <el-tree
      :data="data4"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button type="primary" @click="nextStep(temp.step)">下一步</el-button>
      </div>
    </el-dialog>


    <el-dialog title="操作" :visible.sync="invisible[1]">
      <el-transfer v-model="value1" :data="transferdata"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
        <el-button type="primary" @click="nextStep(temp.step)">下一步</el-button>
      </div>
    </el-dialog>


    <el-dialog title="结果" :visible.sync="invisible[2]" style="width:100%">
      <el-table :data="tableData"  border fit highlight-current-row style="width: 100%">

<!--       <el-table-column align="center" label="序号1" width="80">
        <template slot-scope="scope">
          <span>{{scope.row[0].label}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="序号2" width="80">
        <template slot-scope="scope">
          <span>{{scope.row[1].label}}</span>
        </template>
      </el-table-column> -->

        <el-table-column v-for="index in treeDataLength"   align="center" :label="'对象序号'+index" width="80">
        <template slot-scope="scope">
          <span>{{scope.row[index-1].label}}</span>
        </template>
      </el-table-column>

      <el-table-column v-for="index in transferdata.length"  align="center" :label="'操作'+index" width="80">
        <template slot-scope="scope">
          <span>{{scope.row[treeDataLength].label}}</span>
        </template>
      </el-table-column>






    </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelStep()">取消</el-button>
        <el-button type="primary" @click="previousStep(temp.step)">上一步</el-button>
        <el-button type="primary" @click="nextStep(temp.step)">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 import Tinymce from '@/components/Tinymce'
import { updateWorkflow,createWorkflow } from '@/api/workflow'
 let id = 1000;

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
    const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `操作 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
    const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
    return {
      transferdata: generateData(),
      value1: [1, 4],

      treeDataLength:0,
      tableData:new Array(),
      data4: JSON.parse(JSON.stringify(data)),
      content:'请输入内容',
      temp:{step:0},      

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
      invisible:new Array(true,false,false),
      action:[]
    }
  },
   methods: {
    handleClick(){
        this.invisible[0]=true;
    },
    append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      },
    cancelStep(){
        this.invisible=this.invisible.map(()=>false);
    },
    previousStep(cstepid){
                this.temp.step=this.temp.step-1;
                this.invisible=this.invisible.map((eachName,step)=>{
                    if(step==this.temp.step){
                    return true;
                  }else{
                    return false;
                  }
                });


    },
    nextStep(cstepid){
                this.temp.step=this.temp.step+1;
                this.invisible= this.invisible.map((eachName,step)=>{
                if(step==this.temp.step){
                  return true;
                  }else{
                  return false;
                }
                });
                if(this.temp.step==1){
                  this.tableData=[];
                  this.data4.forEach((value)=>{
                    this.printPaths(value) 
                  })
                  this.tableData.forEach(value=>{
                    if(value.length<this.treeDataLength)
                      var len=this.treeDataLength-value.length;
                      for(var i=0;i<len;i++){
                        value.push('');
                      }
                      
                  })
                }
                if(this.temp.step==2){
                   this.tableData.forEach(value=>{
                      this.transferdata.forEach(tDataValue=>{
                        value.push('');
                      });
                   });
                }
      
    },
    getArray(obj){
      var ret=null;
      if(obj.children!=undefined){
        return obj.children.map(this.getArray);
      }else{
        return obj
      }
    },
    printPaths(node)  
    { 
        //int path[] = new int[1000]; 
        var path=[];
        this.printPathsRecur(node, path, 0); 
    }, 
   
    /* Recursive helper function -- given a node, and an array 
       containing the path from the root node up to but not  
       including this node, print out all the root-leaf paths.*/
    printPathsRecur(node, path, pathLen)  
    { 
        if (node == null) 
            return; 
   
        /* append this node to the path array */
        path[pathLen] = {id:node.id,label:node.label};
        pathLen++; 
   
        /* it's a leaf, so print the path that led to here  */
        if (node.children==undefined||node.children.length==0){ 
            this.printArray(path); 
            if(this.treeDataLength==0){
              this.treeDataLength=pathLen;
            }else{
              if(this.treeDataLength<pathLen){
                this.treeDataLength=pathLen;
              }
            }
        }else 
        { 
            /* otherwise try both subtrees */
            // printPathsRecur(node.left, path, pathLen); 
            // printPathsRecur(node.right, path, pathLen); 
            for(var i=0;i<node.children.length;i++){
              this.printPathsRecur(node.children[i],path,pathLen);
            }
        } 
    }, 
   
    /* Utility function that prints out an array on a line. */
    printArray(path)  
    { 

       const tempPath = Object.assign([], path);
       this.tableData.push(tempPath);
       path=[];
    } 



    // createDialogData(){
    //   //先校验流程名，再校验流程节点名
    //   this.$refs['dataForm0'].validate()
    //       .then(()=>{
    //       this.$refs['dataForm1'].validate().then(()=>{
    //         createWorkflow(this.workflow.workflowArray).then(()=>{
    //           this.$notify({
    //              title: '成功',
    //              message: '更新成功',
    //              type: 'success',
    //              duration: 2000
    //           })
    //         })

    //       }).catch(()=>{
    //         this.$message({
    //             message: '有流程节点名未设置',
    //             type: 'warning'
    //           });
    //       })
    //     }).catch(()=>{
    //         this.$message({
    //             message: '流程名未设置',
    //             type: 'warning'
    //           });
    //     });
    // },
    // updateDialogData(){
    //   //流程名属于dataForm0  流程节点名属于dataForm1
    //   //先校验流程名，再校验流程节点名
    //   this.$refs['dataForm0'].validate()
    //       .then(()=>{
    //       this.$refs['dataForm1'].validate().then(()=>{
    //         updateWorkflow(this.workflow.workflowArray).then(()=>{
    //           this.$notify({
    //              title: '成功',
    //              message: '更新成功',
    //              type: 'success',
    //              duration: 2000
    //           })
    //         })

    //       }).catch(()=>{
    //         this.$message({
    //             message: '有流程节点名未设置',
    //             type: 'warning'
    //           });
    //       })
    //     }).catch(()=>{
    //         this.$message({
    //             message: '流程名未设置',
    //             type: 'warning'
    //           });
    //     });
    //   //       this.$refs['dataForm0'].validate((valid) => {
    //   //   if (valid) {
    //   //     this.$refs['dataForm1'].validate((valid)=>{
    //   //       if(valid){
    //   //         var a =1;
    //   //       }
    //   //     })
    //   //   }
    //   // })
    // },
    // next() {
    //   this.workflow.active++;
    //   if (this.workflow.active == this.workflow.workflowArray.length) this.workflow.active = 0;
    // },
    // previous() {
    //   this.workflow.active =this.workflow.active-1;
    //   if (this.workflow.active ==-1) this.workflow.active = this.workflow.workflowArray.length-1;
    // },
    // deleteNode(){
    //      var workflow = this.workflow;
    //      this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
    //               confirmButtonText: '确定',
    //               cancelButtonText: '取消',
    //               type: 'warning'
    //             }).then(() => {
    //               workflow.workflowArray.splice(this.workflow.active,1);
    //               if(workflow.active==workflow.workflowArray.length) workflow.active--;
    //               this.$message({
    //                 type: 'success',
    //                 message: '删除成功!'
    //               });
    //             }).catch(() => {
    //               this.$message({
    //                 type: 'info',
    //                 message: '已取消删除'
    //               });          
    //             });

    // },
    // createNode(){
    //      var workflow = this.workflow;
    //      this.$confirm('此操作将新增节点, 是否继续?', '提示', {
    //               confirmButtonText: '确定',
    //               cancelButtonText: '取消',
    //               type: 'warning'
    //             }).then(() => {
    //               workflow.workflowArray.splice(this.workflow.active+1,0,{type:0,name:'New Step'});
    //               this.$message({
    //                 type: 'success',
    //                 message: '创建成功!'
    //               });
    //             }).catch(() => {
    //               this.$message({
    //                 type: 'info',
    //                 message: '已取消创建'
    //               });          
    //             });
    // },


  }

}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


