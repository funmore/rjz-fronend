<template>
  <div>
          <el-form :rules="rules" ref="contact"  :model="contactBasic" label123456781-position="left" label-width="100px" style='width: 600px'>
          <el-form-item label="是否所内项目" prop="is_12s">
          <el-select v-model="contactBasic.is_12s" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in is_12s"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="研制单位" prop="organ" v-show="contactBasic.is_12s==='否'">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="contactBasic.organ">
          </el-input>
        </el-form-item>
      </el-form>

      <el-table :data="propContact"  border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>


      <el-table-column width="120px" align="center" label="职责">
        <template slot-scope="scope" >
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="姓名">
        <template slot-scope="scope" >
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.name"  @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit"></el-input>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="联系方式">
        <template slot-scope="scope" >
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.tele"  @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit"></el-input>
          </template>
          <span v-else>{{ scope.row.tele }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEdit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
          <el-button v-else type="primary" @click='scope.row.isEdit=!scope.row.isEdit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>

<script>

import { indexContact, showContact, storeContact, updateContact,
         destroyContact } from '@/api/contact'



export default {
  name: 'contact',

  props:{
    propContact:Array
  },
  created() {
  },
  data() {
    return {
        is_12s:['是','否'],
        listQuery:{
          is_12s: true
        },
        contact:new Object,
        contactBasic:{is_12s:'是',orgran:'' },
        rules:{}

    }
  },
  watch:{
    contactBasic: {
        handler:function(newVa,oldVa){
          this.contact.forEach(value=>{
            value.is_12s = newVa.is_12s;
            value.organ  = newVa.organ;
          })
        },
        deep:true
    },
  },
  created() {
    this.contact=this.propContact;
  },
   methods: {
    cancelEdit(row) {
      //row.title = row.originalTitle
      row.isEdit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.isEdit=!row.isEdit;
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    confirmDelete(row,index) {
      this.$confirm('此操作将删除该组员, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.contact.splice(index,1)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
    }


 }
    

}
</script>

<style scoped>
</style>


