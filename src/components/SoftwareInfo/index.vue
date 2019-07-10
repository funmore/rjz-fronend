<template>
       
      
      <!-- <el-form :rules="rules" :ref="propRef" :model="softwareInfo" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'> -->
        <el-form :rules="rules" ref="software-info" :model="softwareInfo" label123456781-position="left" label-width="100px" style='width: 600px; '>

        <el-form-item label="软件名称" prop='name'>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.name" >
          </el-input>
        </el-form-item>

        <el-form-item label="版本号">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.version_id">
          </el-input>
        </el-form-item>


        <el-form-item label="代码量">
          <el-select v-model="softwareInfo.size" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in size"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="折算后代码量">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.reduced_code_size">
          </el-input>
        </el-form-item>


        <el-form-item label="折算原因">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.reduced_reason">
          </el-input>
        </el-form-item>

        <el-form-item label="编译器">
          <el-select v-model="softwareInfo.complier" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in complier"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="编程语言">
          <el-select v-model="softwareInfo.code_langu" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in codeLangu"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="运行环境">
          <el-select v-model="softwareInfo.runtime" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in runtime"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="CPU类型">
          <el-select v-model="softwareInfo.cpu_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in cpuType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件级别">
          <el-select v-model="softwareInfo.software_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件类型">
          <el-select v-model="softwareInfo.software_usage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in softwareUsage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件类型">
          <el-select v-model="softwareInfo.software_cate" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in softwareCate"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件子类">
          <el-select v-model="softwareInfo.software_sub_cate" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in softwareSubCate"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
</template>

<script>
const constSoftwareType = ['A级','B级','C级','D级']
const constSoftwareUsage = ['弹上','地面']
const constCodeLangu = ['C','FPGA','PLC']
const constComplier = ['神舟IDE','IED2','IED3']
const constRuntime = ['RUNTIME A','RUNTIME B']
const constSoftwareCate = ['嵌入','非嵌','FPGA','PLC']
const constSoftwareSubCate = ['飞控','信息处理','组合导航','CPLD','PLC','伺服','综合控制']
const constCpuType = ['cpu1','cpu2','cpu3','cpu4']
const constSize = ['大','中','小']
const constClassification = ['机密','秘密','内部']


export default {
  name: 'workflow-demo',

  props:{
    propSoftwareInfo: Array,
    propRef:String
  },
  data() {
    return {
      softwareType:constSoftwareType,
      softwareUsage:constSoftwareUsage,
      codeLangu:constCodeLangu,
      complier:constComplier,
      runtime:constRuntime,
      softwareCate:constSoftwareCate,
      softwareSubCate:constSoftwareSubCate,
      cpuType:constCpuType,
      size:constSize,
      classification:constClassification,



      softwareInfo:new Object,

      rules: {
           name:[ { required: true, message: '请输入流程名称', trigger: 'blur' } ],

      }
    }
  },
  watch:{
    softwareInfo: {
        handler:function(newVa,oldVa){
          this.changeFatherData()
        },
        deep:true
    },
  },
  created(){
    if(this.propSoftwareInfo==null||this.propSoftwareInfo.length==0){
      this.softwareInfo={
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
        }
    }else{
      this.softwareInfo=this.propSoftwareInfo[0]
    }

  },
   methods: {
      changeFatherData(){
      let data={data:this.softwareInfo,type:'softwareInfo'}
      this.$emit('dataChange',data)
    }
  }


}
</script>

<style scoped>
</style>


