 <template>
  <div :visible.sync="propVisible">
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
</div>
</template>
<script>
  import { indexWorkflowNote, showWorkflowNote, storeWorkflowNote, updateWorkflowNote,
    destroyWorkflowNote } from '@/api/Workflownote'

  export default {
    data() {
      return {
        reverse: false,
        listLoading: false,
        workflow_note: []
      }
  },
    props: {
      propVisible: Boolean,
      propWorkflowId: Number,
      propRole: Array
    },
    watch: {
      // propVisible start
      propVisible: function(newVa, oldVa) {
        if (newVa == true) {
          this.getNote(this.propWorkflowId)  //获取操作流工作记录
      }
      }
      // propVisible end
    },
    methods: {
      getNote(id) {
        this.listLoading = true
    var listQuery = { id: id }
        indexWorkflowNote(listQuery).then(response => {
          var data = response.data
          if (data.total != 0) {
            this.workflow_note = data.items
          }
          this.listLoading = false
        })
      }
    }
  }
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

