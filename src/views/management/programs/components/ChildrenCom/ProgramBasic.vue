
 <template>
<div>
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
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.manager_name}}</span>
		        </template>
		      </el-table-column>

		      <el-table-column width="100px" align="center" label="所属型号">
		        <template slot-scope="scope">
		          <span @click="handleDialogUpdate(scope.row)">{{scope.row.model}}</span>
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

		<el-dialog title="编辑" :visible.sync="visible">
		      <el-form :rules="rules" ref="programbasic" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>
		          <el-form-item label="所属型号" prop="model">
		          <el-select v-model="temp.model" filterable placeholder="请选择">
		            <el-option
		              v-for="item in model"
		              :key="item"
		              :label="item"
		              :value="item">
		            </el-option>
		          </el-select>
		        </el-form-item>

		        <el-form-item label="项目名称- name" prop="name">
		          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
		          </el-input>
		        </el-form-item>

		        <el-form-item label="项目标识- program_identity" prop="program_identity">
		          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.program_identity">
		          </el-input>
		        </el-form-item>

		        <el-form-item label="测试类型-program_type" prop="program_type">
		          <el-select v-model="temp.program_type" filterable placeholder="请选择">
		            <el-option
		              v-for="item in programType"
		              :key="item"
		              :label="item"
		              :value="item">
		            </el-option>
		          </el-select>
		        </el-form-item>

		        <el-form-item label="密级- classification">
		          <el-select v-model="temp.classification" filterable placeholder="请选择">
		            <el-option
		              v-for="item in classification"
		              :key="item"
		              :label="item"
		              :value="item">
		            </el-option>
		          </el-select>
		        </el-form-item>

		        <el-form-item label="研制类型- dev_type">
		          <el-select v-model="temp.dev_type" filterable placeholder="请选择">
		            <el-option
		              v-for="item in devType"
		              :key="item"
		              :label="item"
		              :value="item">
		            </el-option>
		          </el-select>
		        </el-form-item>

		        <el-form-item label="项目阶段- program_stage">
		          <el-select v-model="temp.program_stage" filterable placeholder="请选择">
		            <el-option
		              v-for="item in programStage"
		              :key="item"
		              :label="item"
		              :value="item">
		            </el-option>
		          </el-select>
		        </el-form-item>

		        <el-form-item label="计划开始时间" prop="actualStartTime">
		          <el-date-picker v-model="temp.plan_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
		          </el-date-picker>
		        </el-form-item>

		        <el-form-item label="计划结束时间" prop="actualEndTime">
		          <el-date-picker v-model="temp.plan_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="Please pick a date">
		          </el-date-picker>
		        </el-form-item>







		      </el-form>
		      <div slot="footer" class="dialog-footer">
		        <el-button @click="cancel()">取消</el-button>
		        <el-button type="primary" @click="confirm(temp)">确认</el-button>
		      </div>
		    </el-dialog>

</div>



</template>
<script>
import { parseTime } from '@/utils/index.js'

import { indexProgram, showProgram, storeProgram, updateProgram,
         destroyProgram } from '@/api/program'
const constModel = ['model1','model2','model3']
const constProgramType = ['配置项测试','定型测试','回归测试']
const constClassification = ['机密','秘密','内部']
const constProgramStage = ['方案','初样','试样','定型']
const constDevType = ['1类','2类','3类','4类']


  export default {
    name: 'programbasic',
    data() {
      return {
      model:constModel,
      programType:constProgramType,
      classification:constClassification,
      programStage:constProgramStage,
      devType:constDevType,

       tableKey:0,
       listLoading:false,
       ProgramBasic:[],
       visible:false,
       temp:{},
       rules:{}
      };
    },
    props:{
        propProgramBasic:Object
    },
    filters: {
    parseTime
    },
    created(){
     	this.ProgramBasic.push(this.propProgramBasic)
    },
    methods: {
    	cancel(){
    		this.visible=false;
    	},
        // edit(row){
        // 	this.temp=row;
        // 	this.visible=true;
        // },
        handleDialogUpdate(row){
          this.$emit('dochange',row)
        },
        confirm(temp){
	      this.$refs['programbasic'].validate((valid) => {
        	if (valid) {
        		this.visible=false;
				updateProgram(temp).then(response => {
		          this.$forceUpdate();  
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

