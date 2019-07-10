<template>
      <el-dialog :title="textMap[propDialogStatus] +'项目'" :visible.sync="propVisible" :before-close="onClose" @open="onOpen">
        <el-row class="tac" >
          <el-col :span="4" style="height: 300px;">
            <el-steps direction="vertical" :active="active">
              <el-step v-if="propStep[0]" title="项目的配置"></el-step>
              <el-step v-if="propStep[1]" title="联系人信息"></el-step>
              <el-step v-if="propStep[2]" title="被测件信息" ></el-step>
              <el-step v-if="propStep[3]" title="工作流配置"></el-step>
              <el-step v-if="propStep[4]" title="项目组配置" ></el-step>
            </el-steps>
          </el-col>
          <el-col :span="20">
            <program-basic :propSelection="propSelection" :propProgramBasic="programItem.programBasic" v-if="active===0"></program-basic>
            <contact :propContact="programItem.contact" v-if="active===1"></contact>
            <software-info :propSelection="propSelection" :propSoftwareInfo="programItem.softwareInfo"  v-if="active===2"></software-info>
            <workflow-item :propWorkflow="programItem.workflow"   position="left" width="200px" v-if="active===3"></workflow-item>
            <program-team-role :propProgramTeamRole="programItem.programTeamRole"  :isAllEdit="false" v-if="active===4"></program-team-role>

          </el-col>

        </el-row>


        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="previous">上一步</el-button>
          <el-button type="primary" @click="next" v-if="active<(steps-1)">下一步</el-button>
          <el-button type="primary" @click="confirm" v-else>提交</el-button>
        </div>
    </el-dialog>
   
</template>

<script>

import { indexPreProgram, showPreProgram, storePreProgram, updatePreProgram,
         destroyPreProgram } from '@/api/preprogram'
import { indexProgram, showProgram, storeProgram, updateProgram,
         destroyProgram } from '@/api/program'
import { indexContact, showContact, storeContact, updateContact,
         destroyContact } from '@/api/contact'
import { indexSoftwareInfo, showSoftwareInfo, storeSoftwareInfo, updateSoftwareInfo,
         destroySoftwareInfo } from '@/api/softwareinfo'


import ProgramBasic from '@/components/ProgramBasic'
import WorkflowItem from '@/components/Workflow'
import SoftwareInfo from '@/components/SoftwareInfo'
import Contact from '@/components/Contact'
import ProgramTeamRole from '@/components/ProgramTeamRole'

//item: 
//  programBasic:   Object
//  contact     :   Array
//  softwareInfo:   Array
//  workflow    :   Object
//  programTeamRole:Array
export default {
  name: 'programEditPanel',
  components: { WorkflowItem, ProgramTeamRole,SoftwareInfo,Contact,ProgramBasic},

  props:{
    propStep:Array,
    propProgram: Object,
    propVisible:Boolean,
    propSelection:Object,
    propDialogStatus:String
  },
  data() {
    return {
      active:0,
      activeName:'program-edit',
      textMap: {
        update: '更新',
        create: '创建'
      },
      steps:new Number(),
      programItem:new Object(),
      programChildren:['programBasic','contact','softwareInfo','workflow','programTeamRole'],
      create_step:['项目的信息','联系人配置','被测件信息','工作流配置','项目组配置']
      
    }
  },
   methods: {
      next(){
        this.active=this.active+1;
      },
      previous(){
        if(this.active!=0){
          this.active=this.active-1
        }
      },
      confirm(){
        this.$emit('close-dia');
        if(this.propDialogStatus=='update'){
          this.updateProgram()
        }else{
          this.createProgram()
        }
      },
      onClose(){
        this.$emit('close-dia');
      },
      onOpen(){
        this.active=0;
        this.steps=this.propStep.lastIndexOf(true)+1;
        this.programItem=this.propProgram;
        for(var i=this.steps;i<this.propStep.length;i++){
          this.programItem[this.programChildren[i]]=undefined;
        }

        if(this.propDialogStatus=='update'){
          
            showPreProgram(this.propProgram.programBasic.id).then(response => {

              var data=response.data.items
              for (var key in data) {
                  if (data.hasOwnProperty(key)) {           
                      this.programItem[key]=data[key];
                  }
              }

            }).catch(err => {
              console.log(err)
            })
          }

      },
      createProgram() {
          storePreProgram(this.programItem).then((response) => {
            var data = Object.assign({}, this.programItem.programBasic) 
            this.create_step.splice(this.steps,this.propStep.length-this.steps);
            data.create_step=this.create_step;
            data.id=response.data.id
            var updateData={data:data,type:'store'};
            this.$emit('update-list',updateData)

        })
    },
      updateProgram() {
            updatePreProgram(this.programItem).then((response) => {
              var data = Object.assign({}, this.programItem.programBasic)
              this.create_step.splice(this.steps,this.propStep.length-this.steps);
              data.create_step=this.create_step;
              var updateData={data:data,type:'update'};
              this.$emit('update-list',updateData)


          })
      },
    }

}
</script>

<style scoped>
</style>


