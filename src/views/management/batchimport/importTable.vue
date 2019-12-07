<template>
  <div class="app-container">
    <upload-excel-component :on-success='handleSuccess' :before-upload="beforeUpload"></upload-excel-component>
    <el-button type="primary" :loading="onUploading" @click="OnUpload">批量上传</el-button>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { storeBatchImport } from '@/api/BatchImport'
export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      onUploading: false
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    OnUpload() {
      this.onUploading = true
      storeBatchImport(this.tableData).then(response => {
        this.onUploading = false
        this.$notify({
          title: '成功',
          message: '批量导入成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
