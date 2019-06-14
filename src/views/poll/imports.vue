<template>
  <div class="app-container">

    <upload-excel-component v-show="uploadVisible" :propVisible='uploadVisible' :on-success='handleSuccess' :before-upload="beforeUpload"></upload-excel-component>
    
    <div v-show="uploadVisible||setRowVisible" >
      <el-table :data="ExcelData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
        </el-table-column>
      </el-table>
      <div v-show="setRowVisible">以第   <el-input-number v-model="row" @change="handleRowChange" :min="1" :max="10" label="描述文字"></el-input-number>
行作为表单各字段的名称</div>
    </div>
    

    <property v-show="setPropertyVisible" :propPropertyData="propertyData"></property>
    

    <el-button v-show="setRowVisible" >上一步</el-button>
    <el-button v-show="setRowVisible" type="primary" @click="OnNextClicked">下一步</el-button>
 </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import SelectEmployee from '@/components/SelectEmployee/index.vue'
import { indexPoll, showPoll, storePoll, updatePoll,
         destroyPoll } from '@/api/poll'
import Property from './property.vue'
export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent,SelectEmployee,Property },
  data() {
    return {
      ExcelData: [],
      tableHeader: [],
      propertyData:[],
      uploadVisible:true,
      setRowVisible:false,
      row:1,
      setPropertyVisible:true,
      request_data:{
        poll:{        
          name:'',
          due_day:'',
          range:[1,2]
        },
        poll_column:[]
      },
      inputVisible: false,
      inputValue: ''

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
      this.ExcelData = results
      this.tableHeader = header
      this.uploadVisible=false
      this.setRowVisible=true
    },
    handleRowChange(value){

    },
    OnNextClicked(){
      if(this.setRowVisible==true){
        for (let header of this.tableHeader) {
            let oneRow={
              name:header,
              type:'数字',
              valid_value:[]
            }
            this.propertyData.push(oneRow)
          }
        this.setRowVisible=false
        this.setPropertyVisible=true
      }
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    handleSelectionChange(val) {
        this.request_data.poll_column = val;
      },

    //有效值tag  start
    handleClose(tag,row) {
        row.valid_value.splice(row.valid_value.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm(row) {
        let inputValue = this.inputValue;
        if (inputValue) {
          row.valid_value.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    //有效值tag  end
      OnCreatedClicked(){
            storePoll(this.request_data).then(response => {
              this.$notify({
                title: '创建成功',
                message: '请通知同事填写表单',
                type: 'success',
                duration: 2000
              })
          }).catch(err => {
            console.log(err)
          })
      },
      OnRangeChange(args){
        this.request_data.poll.range=args;
      }

  }
}
</script>
