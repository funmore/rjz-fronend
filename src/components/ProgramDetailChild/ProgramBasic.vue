
 <template>
<div :visible.sync="propVisible">
	
		 <el-table :key='tableKey' :data="ProgramBasic" v-loading="listLoading" border fit highlight-current-row>

		      <el-table-column width="100px" align="center" label="项目名称">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.name}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="项目标识">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_identity}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="型号负责人">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{selection.model.find(x=>x.id==scope.row.model_id)==null?null:selection.model.find(x=>x.id==scope.row.model_id).manager_name}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="所属型号">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{selection.model.find(x=>x.id==scope.row.model_id)==null?null:selection.model.find(x=>x.id==scope.row.model_id).model_name}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="密级">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.classification}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="研制类型">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.dev_type}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="测试类型">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_type}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="项目阶段">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.program_stage}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="计划开始时间">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.plan_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="计划结束时间">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.plan_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="实际开始时间">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.actual_start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="实际结束时间">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.actual_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
		        </template>
		      </el-table-column>




		      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
		        <template slot-scope="scope">
		            <el-button type="primary" size="small" icon="el-icon-edit" @click="handleDialogUpdate(scope.row)">编辑</el-button>
		        </template>
		      </el-table-column>

		</el-table>
	    <aaa :propProgramBasicId="propProgramBasicId" :propIsExist="is_exist"  :propVisible="generalVisible" @close="handleClose"></aaa>



</div>



</template>
<script>
import { indexModel } from '@/api/model'
import { parseTime } from '@/utils/index.js'
import aaa from '@/components/PreProgramCom/ProgramBasic.vue'

import { indexProgram, showProgram, storeProgram, updateProgram,
  destroyProgram } from '@/api/program'

export default {
  name: 'programbasic',
  components: { aaa },
  data() {
    return {
	  generalVisible: false,
	  is_exist: true,

	  selection: {
        model: ['model1', 'model2', 'model3'],
        programType: ['配置项测试', '定型测试', '回归测试'],
        classification: ['机密', '秘密', '内部'],
        programStage: ['方案', '初样', '试样', '定型'],
        devType: ['1类', '2类', '3类', '4类'],
        programSource: ['12所', '外所软件'],
        managers: [],
        type: ['运载', '战术', '战略', '空军', '海军']
      },

      tableKey: 0,
      listLoading: false,
      ProgramBasic: [],
      visible: false,
      temp: {},
      rules: {}
    }
  },
  props: {
    propVisible: Boolean,
    propProgramBasicId: Number,
    propProgramBasic: Object
  },
  filters: {
    parseTime
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
    // this.getModel()
    // this.getData();
     	// this.ProgramBasic.push(this.propProgramBasic)
  },
  methods: {
    getModel() {
      var listQuery = {
        isAll: true
      }
      indexModel(listQuery).then(response => {
        var data = response.data
        if (data.total != 0) {
          this.selection.model = Object.values(data.items)
        }
      })
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
      showProgram(this.propProgramBasicId).then(response => {
        var data = response.data
        if (data.isOkay == true) {
          this.ProgramBasic.pop()
          this.ProgramBasic.push(data.item)
        }
        loading.close()
      })
    },
    cancel() {
      this.visible = false
    },
    handleDialogUpdate(row) {
      //   this.$emit('dochange',row)
      this.is_exist = true
      this.generalVisible = true
    },
    confirm(temp) {
      this.$refs['programbasic'].validate((valid) => {
        if (valid) {
          this.visible = false
          updateProgram(temp).then(response => {
            this.$forceUpdate()
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

