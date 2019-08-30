<template>
<el-dialog :title="textMap[dialogStatus]+'联系人信息'" :visible.sync="propVisible" :before-close="handleClose">
      <el-form :rules="rules" ref="contact"  :model="contactBasic" label123456781-position="left" label-width="100px" style='width: 600px' v-if="propVisible">
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

      <el-table :data="contact"  border fit highlight-current-row style="width: 100%" v-if="propVisible">

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
            <el-input class="edit-input" size="small" v-model="scope.row.name"  ></el-input>
          </template>
        </el-table-column>

        <el-table-column width="100px" label="联系方式">
          <template slot-scope="scope" >
            <el-input class="edit-input" size="small" v-model="scope.row.tele"  ></el-input>
          </template>
        </el-table-column>

    </el-table>
    <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmCreate" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary" :loading="onConfirming" @click="confirmUpdate" v-else>确认</el-button>
      </div>
</el-dialog>


</template>

<script>

import { indexContact, showContact, storeContact, updateContact,
         destroyContact } from '@/api/contact'
import mixin from './mixin'



export default {
  name: 'Contact',

  props:{
    propVisible:Boolean,
    propProgramBasicId: Number
  },
  mixins: [mixin],

  data() {
    return {
        is_12s:['是','否'],
        listQuery:{
          is_12s: true
        },
        contact:[
          {is_12s:'是',organ:'12所',type:'计划',name:'',tele:'',isEdit:true},
          {is_12s:'是',organ:'12所',type:'质量',name:'',tele:'',isEdit:true},
          {is_12s:'是',organ:'12所',type:'设计',name:'',tele:'',isEdit:true}
        ],
        contactBasic:{is_12s:'是',orgran:'' },
        rules:{},

      listLoading:false,
      dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        },
        onConfirming:false

    }
  },

  watch:{
    //propVisible start
    propVisible:function(newVa,oldVa){
      if(newVa==true){
        this.getData()
      }
    },
    //propVisible end

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

   methods: {
     getData(){
      this.listLoading=true;
      showContact(this.propProgramBasicId).then(response => {
        var data=response.data
        if(data.isOkay==true){
          this.dialogStatus='update'
          this.contact = data.item
          this.contactBasic={
            is_12s:this.contact[0].is_12s,
            organ:this.contact[0].organ
          }
        }else{
          this.dialogStatus='create'
        }
        this.listLoading = false
      })
    },
    confirmUpdate(){
      this.onConfirming=true
      let storeData={
        programId:this.propProgramBasicId,
        data:this.contact
      }
      updateContact(storeData).then(response => {
        if(response.data.isOkay==true){
                var args={
                  type:this.$options.name,
                  state:this.dialogStatus,
                  programId:this.propProgramBasicId,
                  value:response.data.item
                }
                this.$emit('close',args)
                this.$notify({
                  title: '项目联系人信息已更新',
                  message: '请在项目中查看此项目',
                  type: 'success',
                  duration: 2000
                })
        }
        this.onConfirming=false
      })
    },
    confirmCreate(){
      this.onConfirming=true
      let storeData={
        programId:this.propProgramBasicId,
        data:this.contact
      }
      storeContact(storeData).then(response => {
        if(response.data.isOkay==true){
                  this.dialogStatus='update'
                  var args={
                    type:this.$options.name,
                    state:this.dialogStatus,
                    programId:this.propProgramBasicId,
                    value:response.data.item
                  }
                  this.$emit('close',args)
                  this.$notify({
                    title: '项目联系人信息已更新',
                    message: '请在项目中查看此项目',
                    type: 'success',
                    duration: 2000
                  })
              }
              this.onConfirming=false
            })
    }


 }
    

}
</script>

<style scoped>
</style>


