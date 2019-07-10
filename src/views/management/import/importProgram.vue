<template>
  <div class="app-container">
          <el-upload v-show="uploadVisible" class="upload-demo" :auto-upload="false" :on-change="fileChange" :multiple="false" :limit="1"   :file-list="assignForm">
            <el-button slot="trigger" size="small"><i class="icon-up margin-right-8"></i>从本地选择文件</el-button>
          </el-upload>
          <pre-program-edit :propStep="program_step" :propDialogStatus="'create'" :propProgram="temp" :propVisible="configVisible" :propSelection="selection" @close-dia="onCloseDia" @update-list="onUpdateList"></pre-program-edit>
  </div>
</template>

<script>
import { indexModel} from '@/api/model'
import { indexEmployee } from '@/api/employee'
import PreProgramEdit from '@/components/PreProgramEdit'


export default {
  name: 'uploadProgram',
  components: {PreProgramEdit  },
  data() {
    return {
        // assignForm: {
        //   files: []
        // },
        assignForm:[],
        text:null,
        uploadVisible:true,
        configVisible:false,

        selection:{
          model:[],
          programType:['配置项测试','定型测试','回归测试'],
          classification: ['机密','秘密','内部'],
          programStage:['方案','初样','试样','定型'],
          devType:['1类','2类','3类','4类'],
          programSource:['12所','外所软件'],
          managers:[],
          type:['运载','战术','战略','空军','海军'],

          softwareType:['A级','B级','C级','D级'],
          softwareUsage: ['弹上','地面'],
          codeLangu:['C','FPGA','PLC'],
          complier: ['神舟IDE','IED2','IED3'],
          runtime: ['RUNTIME A','RUNTIME B'],
          softwareCate: ['嵌入','非嵌','FPGA','PLC'],
          softwareSubCate: ['飞控','信息处理','组合导航','CPLD','PLC','伺服','综合控制'],
          cpuType: ['cpu1','cpu2','cpu3','cpu4'],
          size: ['大','中','小']
        },
        program_step:[true,true,true,false,false],
        temp: {
            programBasic:{
                id:undefined,
                program_source:"",
                type:"",
                ref:"",
                state:"",
                name:"",
                model:"",
                program_type:'',
                program_identity:'',
                classification:'',
                program_stage:'',
                dev_type:'',
                plan_start_time:new Date(),  
                plan_end_time :new Date(),
                manager:null
              },

            contact:[
              {is_12s:'是',organ:'12所',type:'计划',name:'',tele:'',isEdit:true},
              {is_12s:'是',organ:'12所',type:'质量',name:'',tele:'',isEdit:true},
              {is_12s:'是',organ:'12所',type:'设计',name:'',tele:'',isEdit:true}
            ],
            softwareInfo:[{
              name:'',
              version_id:new Number(),
              size:'',
              reduced_code_size:'',
              reduced_reason:'',
              software_type:'',
              software_usage:'',
              code_langu:'',
              complier:'',
              runtime:'',
              cpu_type:'',
              software_cate:'',
              software_sub_cate:''
            }],
            workflow:{
              workflow_name:'测试工作流',
              active:2,
              workflowArray:[
                {name:'建项',plan_day:'',type:'建项'},
                {name:'被测软件接受',plan_day:'',type:'测试执行'},
                {name:'静态问题提交',plan_day:'',type:'报告'},
                {name:'测试环境就绪情况',plan_day:'',type:'建项'},
                {name:'测试工作产品编写',plan_day:'',type:'建项'},
                {name:'入库归档状态',plan_day:'',type:'建项'},
                {name:'测试工作产品内部评审',plan_day:'',type:'建项'},
                {name:'评审问题闭合',plan_day:'',type:'建项'},
                {name:'需求(大纲)正式评审',plan_day:'',type:'建项'},
                {name:'评审问题闭合',plan_day:'',type:'建项'},
                {name:'入库归档状态',plan_day:'',type:'建项'},
                {name:'首轮测试',plan_day:'',type:'建项'},
                {name:'软件问题单闭合',plan_day:'',type:'建项'},
                {name:'报告评审',plan_day:'',type:'建项'},
                {name:'入库归档状态',plan_day:'',type:'建项'}
              ],
              isError:false
            },
            programTeamRole:[
              {role:'项目组长',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
              {role:'项目组员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
              {role:'监督人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
              {role:'配置管理员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false},
              {role:'质量保证人员',employee_id:null,plan_workload:0,workload_note:'工作描述',actual_workload:0,isEdit:false}
            ]
          },
    }
  },
  created(){
    this.getModel();
    this.getEmployeeMananger();
  },
  methods: {
    fileChange(file, fileList) {
        const reader = new FileReader();
        reader.onload = () => {
          this.text=JSON.parse(reader.result);
          this.uploadVisible=false;
          this.setTextToTemp();
          this.configVisible=true;



        };
        reader.readAsText(file.raw);
      },


    getModel(){
      var listQuery={
          isAll:true
        };
        indexModel(listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.selection.model = Object.values(data.items)
        }
      })
    },
    getEmployeeMananger(){
        var listQuery={
          checkPM:true
        }
        indexEmployee(listQuery).then(response => {
        var data=response.data
        this.selection.managers = data.items
      })
    },
    onCloseDia(){
      this.configVisible=false;
      this.assignForm=[];
      this.uploadVisible=true;
    },
    onUpdateList(args){

    },
    setTextToTemp(){
      this.temp.programBasic.classification=this.text['密级']
      this.temp.programBasic.dev_type=this.text['研制类型']
      this.temp.programBasic.plan_start_time=this.text['T_最早启动时间']+' 00:00:00';
      this.temp.programBasic.plan_end_time=this.text['T_最晚完成时间']+' 00:00:00';
      this.temp.programBasic.ref=this.text['T_基线']
      this.temp.programBasic.model_id=this.selection.model.find(x=>x.model_name==this.text['型号标识'])==null?null:this.selection.model.find(x=>x.model_name==this.text['型号标识']).id
      this.temp.programBasic.program_stage=this.text['阶段0']

      this.temp.softwareInfo[0].software_type=this.text['软件关键等级']
      this.temp.softwareInfo[0].size=this.text['软件规模']
      this.temp.softwareInfo[0].software_cate=this.text['T_软件类别']
      this.temp.softwareInfo[0].software_sub_cate=this.text['T_软件领域']
      this.temp.softwareInfo[0].code_langu=this.text['开发语言']
      this.temp.softwareInfo[0].reduced_code_size=this.text['T_代码有效行数']==''?this.text['T_代码总行数']:this.text['T_代码有效行数']

      this.temp.contact[0].name=this.text['T_交办单位负责人姓名']
      this.temp.contact[0].tele=this.text['T_交办单位联系电话']

      this.temp.contact[2].name=this.text['T_承办单位负责人姓名']
      this.temp.contact[2].tele=this.text['T_承办单位联系电话']

      this.temp.contact[1].name=this.text['T_委托方质量管理人员姓名']


    }
  }
}
</script>
