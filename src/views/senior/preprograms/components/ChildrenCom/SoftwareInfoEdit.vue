 <template>

 <el-dialog title="配置被测件信息" :visible.sync="visible">
      <el-form :rules="rules1" ref="SoftwareInfoEdit" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>

        <el-form-item label="软件名称- name">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>

        <el-form-item label="版本号- version_id">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.version_id">
          </el-input>
        </el-form-item>


        <el-form-item label="代码量- size">
          <el-select v-model="temp.size" filterable placeholder="请选择">
            <el-option
              v-for="item in size"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="折算后代码量- reduced_code_size">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.reduced_code_size">
          </el-input>
        </el-form-item>


        <el-form-item label="折算原因- reduced_reason">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.reduced_reason">
          </el-input>
        </el-form-item>

        <el-form-item label="编译器- complier">
          <el-select v-model="temp.complier" filterable placeholder="请选择">
            <el-option
              v-for="item in complier"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="编程语言- code_langu">
          <el-select v-model="temp.code_langu" filterable placeholder="请选择">
            <el-option
              v-for="item in codeLangu"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="运行环境- runtime">
          <el-select v-model="temp.runtime" filterable placeholder="请选择">
            <el-option
              v-for="item in runtime"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="CPU类型- cpu_type">
          <el-select v-model="temp.cpu_type" filterable placeholder="请选择">
            <el-option
              v-for="item in cpuType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件级别- software_type">
          <el-select v-model="temp.software_type" filterable placeholder="请选择">
            <el-option
              v-for="item in classification"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件类型- software_usage">
          <el-select v-model="temp.software_usage" filterable placeholder="请选择">
            <el-option
              v-for="item in softwareUsage"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件类型- software_cate">
          <el-select v-model="temp.software_cate" filterable placeholder="请选择">
            <el-option
              v-for="item in softwareCate"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件子类- software_sub_cate">
          <el-select v-model="temp.software_sub_cate" filterable placeholder="请选择">
            <el-option
              v-for="item in softwareSubCate"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirm(temp)">确认</el-button>
     </div>
    </el-dialog>



</template>
<script>
import { indexSoftwareInfo, showSoftwareInfo, storeSoftwareInfo, updateSoftwareInfo,
         destroySoftwareInfo } from '@/api/softwareinfo'

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

      rules1: {
      }

      };
    },
    props:{
       temp:Object,
       visible:Boolean
    },
    created(){
      var a =1;
    },
    methods: {
      cancel(){
          this.visible=false;
      },
      confirm(temp){
          this.$refs['SoftwareInfoEdit'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
          updateSoftwareInfo(temp).then(() => {
            this.$emit('closeVisible');
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
      }


    }
  };
</script>
<style>
</style>

