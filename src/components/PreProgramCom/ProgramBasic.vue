<template>
      <el-dialog :title="textMap[dialogStatus]+'项目基本信息'" :visible.sync="propVisible" :before-close="handleClose">
       <el-form :rules="rules" ref="program-basic"  :model="programBasic" label123456781-position="left" label-width="100px" style='width: 600px; ' v-if="propVisible">
          <el-form-item label="所属型号" prop="model">
          <el-select v-model="programBasic.model_id" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.model"
              :key="index"
              :label="item.model_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="型号负责人">
          {{manager_name}}
        </el-form-item>

        <el-form-item label="项目名称" prop="name">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="programBasic.name">
          </el-input>
        </el-form-item>

        <el-form-item label="项目标识" prop="program_identity">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="programBasic.program_identity">
          </el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="programBasic.type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.type"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参考基线" prop="ref">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="programBasic.ref">
          </el-input>
        </el-form-item>

        <el-form-item label="项目来源" prop="program_source">
          <el-select v-model="programBasic.program_source" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.programSource"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="测试类型" prop="program_type">
          <el-select v-model="programBasic.program_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.programType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密级">
          <el-select v-model="programBasic.classification" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制类型">
          <el-select v-model="programBasic.dev_type" allow-create filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.devType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目阶段">
          <el-select v-model="programBasic.program_stage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in propSelection.programStage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划开始时间" prop="actualStartTime">
          <el-date-picker v-model="programBasic.plan_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="计划结束时间" prop="actualEndTime">
          <el-date-picker v-model="programBasic.plan_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreate" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary"  @click="confirmUpdate" v-else>确认</el-button>
      </div>
    </el-dialog>

</template>

<script>
import { indexEmployee } from '@/api/employee'
import { indexProgram, showProgram, storeProgram, updateProgram,
         destroyProgram } from '@/api/program'
import mixin from './mixin'

export default {
  name: 'ProgramBasic',

  props:{
    propProgramBasicId: Number,
    propSelection:Object,
    propVisible:Boolean,
    propIsExist:Boolean
  },
  mixins: [mixin],
  data() {
    return {


      programBasic:{
          id:null,
          program_source:"",
          type:"",
          ref:"",
          state:"",

          name:"",
          model_id:"",
          program_type:'',
          program_identity:'',
          classification:'',
          program_stage:'',
          dev_type:'',
          plan_start_time:new Date(),  
          plan_end_time :new Date(),
          manager_id:null
        },
      rules: {},
      listLoading:false,
      dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        }
    }
  },
  computed:{
    manager_name:function(){
      if(this.propSelection.model.find(x=>x.id==this.programBasic.model_id)==null){
        return null;
      }
      return this.propSelection.model.find(x=>x.id==this.programBasic.model_id).manager_name;
    }
  },
watch:{
  //propVisible start
  propVisible:function(newVa,oldVa){
    if(newVa==true){
      if(this.propIsExist==false){
          this.dialogStatus='create'
      }else{
        this.dialogStatus='update'
      }
      this.getData()
    }
  }
  //propVisible end

},

   methods: {
    getData(){
      this.listLoading=true;
      showProgram(this.propProgramBasicId).then(response => {
        var data=response.data
        if(data.isOkay==true){
          this.programBasic = data.item
        }
        this.listLoading = false
      })
    },
    confirmUpdate(){
      updateProgram(this.programBasic).then(response => {
        if(response.data.isOkay==true){
                var args={
                  type:this.$options.name,
                  value:false
                }
                this.$emit('close',args)
                this.$notify({
                  title: '项目基本信息已更新',
                  message: '请在项目中查看此项目',
                  type: 'success',
                  duration: 2000
                })
        }
      })
    },
    confirmCreate(){

    },
    // handleClose(){
    //   var args={
    //     type:this.$options.name,
    //     value:false
    //   }
    //   this.$emit('close',args)
    // },
    // cancel(){
    //   var args={
    //     type:this.$options.name,
    //     value:false
    //   }
    //   this.$emit('close',args)
    // }
  }
}

</script>

<style scoped>
</style>


