 <template>
<div :visible.sync="propVisible">
    
      <div v-if="workflow!=null">
        <el-button @click="handleConfigure(true)">调整流程</el-button>
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

              <el-tab-pane label="当前阶段任务" name="task">
                  <node-task :propVisible="active=='task'" ref="NodeTask"  :propNodeId="workflow.workflowArray[workflow.active].id" :propRole="propRole"></node-task>
              </el-tab-pane>
              <el-tab-pane label="当前阶段问题汇总" name="note">
                  <node-note :propVisible="active=='note'" ref="NodeNote"  :propNodeId="workflow.workflowArray[workflow.active].id" :propRole="propRole"></node-note>
              </el-tab-pane>

              <el-tab-pane label="工作流操作记录" name="log">
                <node-flow-log :propVisible="active=='log'"  :propWorkflowId="workflow.id" :propRole="propRole"></node-flow-log>
              </el-tab-pane>
        </el-tabs>
      

      <el-dialog title="配置工作流更新信息" :visible.sync="visible">
        <el-form :rules="rules" ref="workflow" :model="temp" label123456781-position="left" label-width="200px" style='width: 500px; margin-left:50px;'>

          <el-form-item label="更新类型">
            {{temp.note_type}}
          </el-form-item>

          <el-form-item label="更新起始阶段">
            {{workflow.workflowArray[workflow.active].name}}
          </el-form-item>

          <el-form-item label="更新目标阶段">
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
   <div v-else>
     <el-button @click="handleConfigure(false)">尚未配置</el-button>
   </div>

    <ddd :propProgramBasicId="propProgramBasicId" :propIsExist="is_exist" :propVisible="generalVisible" @close="handleClose"></ddd>


</div>
   
</template>
<script>
  import { indexWorkflow, showWorkflow, storeWorkflow, updateWorkflow,
    destroyWorkflow } from '@/api/workflow'
  import { indexWorkflowNote, showWorkflowNote, storeWorkflowNote, updateWorkflowNote,
    destroyWorkflowNote } from '@/api/Workflownote'
  import { indexProgramTeamRoleTask } from '@/api/programteamroletask'
  import NodeNote from './workflowedit/NodeNote'
  import NodeTask from './workflowedit/NodeTask'
  import NodeFlowLog from './workflowedit/NodeFlowLog'

  import ddd from '@/components/PreProgramCom/Workflow.vue'

  export default {
    components: { NodeNote, NodeTask, ddd, NodeFlowLog },
    data() {
      return {
        generalVisible: false,
        is_exist: true,
        listLoading: true,

        workflow: null,
        node_id: null,

        visible: false,
        rules: {},
        temp: {},
        listQuery: {
          phaseCollection: ''
        },
        active: 'task'
  
      }
  },
    props: {
      propVisible: Boolean,
      propProgramBasicId: Number,
      propRole: Array
    },
    filters: {
      statusComputed(node, workflow) {
        if (node.array_index < workflow.active) {
          if (node.undo_task_count != 0) {
            return 'wait' // 有任务没解决
          } else {
            return 'success' // 全部任务解决了
          }
        } else if (node.array_index == workflow.active) {
          return 'process' // 当前状态
        } else {
          return '' // 未到达状态
        }
      }
    },
    watch: {
      // propVisible start
      propVisible: function(newVa, oldVa) {
        if (newVa == true) {
          this.getData()
        }
      }
      // propVisible end
  },
    created() {
      this.getData()
  },
    computed: {
      to_node_name() {
        return (workflow, temp) => { return workflow.workflowArray.find(item => item.id === temp.to_node_id).name }
      }

    },

    methods: {
      handleConfigure(is_exist) {
        this.is_exist = is_exist
        this.generalVisible = true
      },
      handleClose(args) {
        this.generalVisible = false
        this.getData()
      },
      getData() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        var that = this
        showWorkflow(this.propProgramBasicId).then(response => {
          var data = response.data
          if (data.isOkay == true) {
            that.workflow = null
            that.workflow = data.item
            that.temp.to_node_id = that.workflow.workflowArray[that.workflow.active].id
          }
          loading.close()
        })
      },
      updateChildData(index) {
        this.$refs.NodeNote.getNodeNote(this.workflow.workflowArray[index - 1].id)
        this.$refs.NodeTask.getNodeTask(this.workflow.workflowArray[index - 1].id)
      },

      next() {
        // this.listLoading = true;
        var listQuery = {
          node_id: this.workflow.workflowArray[this.workflow.active].id,
          type: 'NodeTask'
        }
        indexProgramTeamRoleTask(listQuery).then(response => {
          var data = response.data
          if (data.total != 0) {
            var node_task = Object.values(data.items)
          }
          var node_task_must_complete = node_task.filter(item => {
            return item.is_must_complete == '是' && item.state != 100
          })
          if (node_task_must_complete.length != 0) {
            this.$confirm('当前阶段尚未有必要任务未完成', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return
            }).catch(() => {})
            return
          }
          if (this.workflow.active == this.workflow.workflowArray.length - 1) {
            const h = this.$createElement
            this.$notify({
              title: '流程已完结',
              message: h('i', { style: 'color: teal' }, '流程已经推进到终点')
            })
            return
          }
          this.temp.note_type = '推进'
          this.temp.from_node_id = this.workflow.workflowArray[this.workflow.active].id
          this.temp.to_node_id = this.workflow.workflowArray[this.workflow.active + 1].id
          this.temp.note = ''
          this.visible = true
        // this.listLoading=false;
        })
      },
      previous() {
        if (this.workflow.active == 0) {
          const h = this.$createElement
          this.$notify({
            title: '已经是流程起点',
            message: h('i', { style: 'color: teal' }, '已经回滚到流程起点')
          })
          return
        }
        this.temp.note_type = '回滚'
        this.temp.from_node_id = this.workflow.workflowArray[this.workflow.active].id
        this.temp.to_node_id = this.workflow.workflowArray[this.workflow.active - 1].id
        this.temp.note = ''
        this.visible = true
      },
      handleFilter() {

      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.temp = {
          task: '',
          due_day: '',
          overdue_reason: '',
          note: '',
          before_node_id: this.propWorkflow.workflowArray[this.propWorkflow.active].id,
          state: 10,
          ratio: 10,
          score: 5
        },
        this.visible = true
      },
      handleCreate() {
        this.temp = {
          task: '',
          due_day: '',
          note: '',
          before_day: '',
          state: '待解决'
        },
        this.visible = true
      },
      edit(item) {
        item.isEdit = true
        this.$forceUpdate()
      },
      cancel() {
        this.visible = false
      },
      confirmCreate(item) {
        item.workflow_id = this.workflow.id

        this.$refs['workflow'].validate((valid) => {
          if (valid) {
            this.visible = false

            storeWorkflowNote(item).then(response => {
              var data = response.data
              var toAdd = 1
              if (item.note_type == '推进') {
                this.workflow.active = this.workflow.active + toAdd
              } else {
                toAdd = -1
                this.workflow.active = this.workflow.active + toAdd
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
  }
</script>
<style>
</style>

