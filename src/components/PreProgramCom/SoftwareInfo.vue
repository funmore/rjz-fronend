<template>
       
      <el-dialog :title="textMap[dialogStatus]+'软件信息'" :visible.sync="propVisible" :before-close="handleClose">
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
              v-for="(item,index) in selection.size"
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
          <!-- <el-select v-model="softwareInfo.complier" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.complier"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select> -->
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.complier" >
          </el-input>
        </el-form-item>


        <el-form-item label="编程语言">
          <el-select v-model="softwareInfo.code_langu" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.codeLangu"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="运行环境">
          <!-- <el-select v-model="softwareInfo.runtime" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.runtime"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select> -->
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.runtime" >
          </el-input>
        </el-form-item>


        <el-form-item label="CPU类型">
          <!-- <el-select v-model="softwareInfo.cpu_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.cpuType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select> -->
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="softwareInfo.cpu_type" >
          </el-input>
        </el-form-item>


        <el-form-item label="软件级别">
          <el-select v-model="softwareInfo.software_type" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.classification"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="软件类型">
          <el-select v-model="softwareInfo.software_usage" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.softwareUsage"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件类型">
          <el-select v-model="softwareInfo.software_cate" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.softwareCate"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="被测软件子类">
          <el-select v-model="softwareInfo.software_sub_cate" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in selection.softwareSubCate"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmCreate" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmUpdate" v-else>确认</el-button>
      </div>
</el-dialog>
</template>

<script>
import mixin from './mixin'
import selection_minx from '../PublicMixin/selection'

import { indexSoftwareInfo, showSoftwareInfo, storeSoftwareInfo, updateSoftwareInfo,
  destroySoftwareInfo } from '@/api/softwareinfo'

export default {
  name: 'SoftwareInfo',

  props: {
    propVisible: Boolean,
    propProgramBasicId: Number
  },
  mixins: [mixin, selection_minx],
  data() {
    return {

      softwareInfo: {
        name: '',
        version_id: new Number(),
        size: '',
        reduced_code_size: '',
        reduced_reason: '',
        software_type: '',
        software_usage: '',
        code_langu: '',
        complier: '',
        runtime: '',
        cpu_type: '',
        software_cate: '',
        software_sub_cate: ''
      },

      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]

      },
      listLoading: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      onConfirming: false
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
  methods: {
    getData() {
      this.listLoading = true
      showSoftwareInfo(this.propProgramBasicId).then(response => {
        var data = response.data
        if (data.isOkay == true) {
          this.dialogStatus = 'update'
          this.softwareInfo = data.item
        } else {
          this.dialogStatus = 'create'
        }
        this.listLoading = false
      })
    },
    confirmUpdate() {
      this.onConfirming = true
      const storeData = {
        programId: this.propProgramBasicId,
        data: this.softwareInfo
      }
      updateSoftwareInfo(storeData).then(response => {
        if (response.data.isOkay == true) {
          var args = {
            type: this.$options.name,
            state: this.dialogStatus,
            programId: this.propProgramBasicId,
            value: response.data.item
          }
          this.$emit('close', args)
          this.$notify({
            title: '信息已更新',
            message: '请在项目中查看此项目',
            type: 'success',
            duration: 2000
          })
        }
        this.onConfirming = false
      }).catch(error => {
        this.onConfirming = false
      })
    },
    confirmCreate() {
      this.onConfirming = true
      const storeData = {
        programId: this.propProgramBasicId,
        data: this.softwareInfo
      }
      storeSoftwareInfo(storeData).then(response => {
        if (response.data.isOkay == true) {
          this.dialogStatus = 'update'
          var args = {
            type: this.$options.name,
            state: this.dialogStatus,
            programId: this.propProgramBasicId,
            value: response.data.item
          }
          this.$emit('close', args)
          this.$notify({
            title: '信息已更新',
            message: '请在项目中查看此项目',
            type: 'success',
            duration: 2000
          })
        }
        this.onConfirming = false
      }).catch(error => {
        this.onConfirming = false
      })
    }
  }

}
</script>

<style scoped>
</style>


