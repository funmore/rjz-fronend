 <template>
<div>
      <el-steps :active="workflow.active"  >
       <el-step v-for="index in workflow.workflowArray.length" :key="index" :title="workflow.workflowArray[index-1].name" :description="workflow.workflowArray[index-1].plan_day"  :status="workflow.workflowArray[index-1]|statusComputed(workflow)"   @click.native="updateChildData(index)">
             <el-badge :value="workflow.workflowArray[index-1].undo_task_count" class="item" slot="icon">
                <i v-if="workflow.workflowArray[index-1].undo_task_count==0" class="el-icon-plus"></i>
                <i v-else class="el-icon-close"></i>
              </el-badge>
        </el-step>
      </el-steps>
      <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="previous">项目回滚</el-button>
          <el-button type="primary" @click="next">项目推进<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>

      <el-tabs v-model="active" >

            <el-tab-pane label="当前节点任务" name="task">
                <node-task ref="NodeTask"  :propNodeId="workflow.workflowArray[workflow.active].id" :propRole="propRole"></node-task>
            </el-tab-pane>
            <el-tab-pane label="当前节点问题汇总" name="note">
                <node-note ref="NodeNote"  :propNodeId="workflow.workflowArray[workflow.active].id" :propRole="propRole"></node-note>
            </el-tab-pane>

            <el-tab-pane label="工作流操作记录" name="log">
                 <div class="block" v-loading="listLoading">
                  <div class="radio">
                    排序：
                    <el-radio-group v-model="reverse">
                      <el-radio :label="false">正序</el-radio>
                      <el-radio :label="true">倒序</el-radio>
                    </el-radio-group>
                  </div>
                  <el-timeline :reverse="reverse">
                    <el-timeline-item
                      v-for="(item, index) in workflow_note"
                      :key="index"
                      :timestamp="item.created_at">
                      「{{item.employee_name}}」执行了从「{{item.from_node_name}}」到「{{item.to_node_name}}」的「{{item.note_type}}」操作
                    </el-timeline-item>
                  </el-timeline>
                </div>
            </el-tab-pane>
      </el-tabs>
     

    <el-dialog title="配置工作流更新信息" :visible.sync="visible">
      <el-form :rules="rules" ref="workflow" :model="temp" label123456781-position="left" label-width="200px" style='width: 500px; margin-left:50px;'>

        <el-form-item label="更新类型">
          {{temp.note_type}}
        </el-form-item>

        <el-form-item label="更新起始节点">
          {{workflow.workflowArray[workflow.active].name}}
        </el-form-item>

        <el-form-item label="更新目标节点">
          {{to_node_name(workflow,temp)}}
        </el-form-item>

        <el-form-item label="更新日志">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.note">
          </el-input>
        </el-form-item>

     </el-form>

        <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" @click="confirmCreate(temp)">确认</el-button>
        </div>
   </el-dialog>


</div>
   
</template>
<script>

  import { indexWorkflowNote, showWorkflowNote, storeWorkflowNote, updateWorkflowNote,
         destroyWorkflowNote } from '@/api/Workflownote'
  import NodeNote from './NodeNote'
  import NodeTask from './NodeTask'

  export default {
    components: { NodeNote,NodeTask },
    data() {
      return {
        reverse:false,
        listLoading:true,

        workflow:'',
        node_id:null,

        visible:false,
        rules:{},
        temp:{},
        workflow_note:[],
        listQuery:{
          phaseCollection:''
        },
        active:'task'

      };
    },
    props:{
        propWorkflow:Object,
        propRole:Array
    },
    filters: {
      statusComputed(node,workflow){
              if(node.array_index<workflow.active){
                if(node.undo_task_count!=0){
                  return 'wait'   //有任务没解决
                }else{
                  return 'success'  //全部任务解决了
                }
              }else if(node.array_index==workflow.active){
                return 'process'   //当前状态
              }else{
                return ''          //未到达状态
              }
     }
    },
    created(){
          this.workflow=this.propWorkflow;
          this.temp.to_node_id=this.workflow.workflowArray[this.workflow.active].id;
          this.getNote(this.workflow.id);
    },
    computed: {
    to_node_name() {
      return (workflow,temp)=>{ return    workflow.workflowArray.find( item => item.id === temp.to_node_id ).name}
     },

   },

    methods: {
      updateChildData(index){
        this.$refs.NodeNote.getNodeNote(this.workflow.workflowArray[index-1].id);
        this.$refs.NodeTask.getNodeTask(this.workflow.workflowArray[index-1].id);
      },

      next() {
        if(this.workflow.active==this.workflow.workflowArray.length-1){
                      const h = this.$createElement;
                      this.$notify({
                        title: '流程已完结',
                        message: h('i', { style: 'color: teal'}, '流程已经推进到终点')
                      });
                      return;
            }
            this.temp.note_type='推进';
            this.temp.from_node_id=this.workflow.workflowArray[this.workflow.active].id;
            this.temp.to_node_id=this.workflow.workflowArray[this.workflow.active+1].id;
            this.temp.note='';
            this.visible=true;
        },
    previous() {
            if(this.workflow.active==0){
                      const h = this.$createElement;
                      this.$notify({
                        title: '已经是流程起点',
                        message: h('i', { style: 'color: teal'}, '已经回滚到流程起点')
                      });
                      return;
            }
            this.temp.note_type='回滚';
            this.temp.from_node_id=this.workflow.workflowArray[this.workflow.active].id;
            this.temp.to_node_id=this.workflow.workflowArray[this.workflow.active-1].id;
            this.temp.note='';
            this.visible=true;       
    },
      getNote(id){
      this.listLoading = true;
      this.listQuery.id=id;
      indexWorkflowNote(this.listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.workflow_note = data.items
        }
        this.listLoading = false
      })
    },
    handleFilter(){

    },
    handleCreate(){
          this.temp={
              task:'',
              due_day:'',
              note:'',
              before_day:'',
              state:'待解决'
            },
          this.visible=true;

      },
      edit(item){
        item.isEdit=true;
        this.$forceUpdate();  
      },
      cancel(){
        this.visible=false;
      },
      confirmCreate(item){
        item.workflow_id=this.workflow.id;

        this.$refs['workflow'].validate((valid) => {
          if (valid) {
            this.visible=false;

            storeWorkflowNote(item).then(response => {
              var data=response.data;
              this.workflow_note.unshift(data.item);
              var toAdd=1;
              if(item.note_type=='推进'){
                this.$emit('doChangeWorkflow',toAdd)
              }else{
                toAdd=-1;
                this.$emit('doChangeWorkflow',toAdd);
              }
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
</style>

