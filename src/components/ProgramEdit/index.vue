<template>
      <el-dialog :title="textMap[propDialogStatus] +'项目'" :visible.sync="propVisible" :before-close="onClose" @open="onOpen">
            <program-basic :propSelection="propSelection" :propProgramBasic="programItem.programBasic" v-if="propProperty==='programBasic'" @dataChange="OnDataChange"></program-basic>
            <contact :propContact="programItem.contact" v-if="propProperty==='contact'"></contact>
            <software-info :propSelection="propSelection" :propSoftwareInfo="programItem.softwareInfo"  v-if="propProperty==='softwareInfo'" @dataChange="OnDataChange"></software-info>
            <workflow-item :propWorkflow="programItem.workflow"   position="left" width="200px" v-if="propProperty==='workflow'" @dataChange="OnDataChange"></workflow-item>
            <program-team-role :propProgramTeamRole="programItem.programTeamRole"  :isAllEdit="false" v-if="propProperty==='programTeamRole'" @dataChange="OnDataChange"></program-team-role>




        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">提交</el-button>
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
         destroySoftwareInfo } from '@/api/softwareInfo'
import { indexWorkflow, showWorkflow, storeWorkflow, updateWorkflow,
         destroyWorkflow } from '@/api/workflow'       
import { indexProgramTeamRole, showProgramTeamRole, storeProgramTeamRole, updateProgramTeamRole,
         destroyProgramTeamRole } from '@/api/ProgramTeamRole'


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
    propProgram: Object,
    propVisible:Boolean,
    propSelection:Object,
    propDialogStatus:String,
    propProperty:String
  },
  data() {
    return {
      active:0,
      textMap: {
        update: '更新',
        create: '创建'
      },
      programItem:new Object(),
      data:{
        programBasic:null,
        contact:null,
        softwareInfo:null,
        programTeamRole:null,
        workflow:null
      },
      requestStoreArray:{
        programBasic:storeProgram,
        contact:storeContact,
        softwareInfo:storeSoftwareInfo,
        workflow:storeWorkflow,
        programTeamRole:storeProgramTeamRole
      },
      requestUpdateArray:{
        programBasic:updateProgram,
        contact:updateContact,
        softwareInfo:updateSoftwareInfo,
        workflow:updateWorkflow,
        programTeamRole:updateProgramTeamRole
      }
      

      
    }
  },
   methods: {

      onClose(){
        this.$emit('close-dia');
      },
      onOpen(){
        this.programItem=this.propProgram;

      },
      confirm(){
        this.$emit('close-dia');
        if(this.propDialogStatus=='update'){
          this.updateProgram();
        }else{
          this.createProgram();
        }
      },
      createProgram() {
          let request_data={
            programId:this.programItem.programBasic.id,
            data:this.data[this.propProperty]
          }
          this.requestStoreArray[this.propProperty](request_data).then((response) => {
            this.programItem[this.propProperty]=response.data.items
            var updateData={data:this.programItem[this.propProperty],type:this.propProperty};
            this.$emit('update-list',updateData)

        })
    },
      updateProgram() {
          let request_data=this.data[this.propProperty]
          this.requestUpdateArray[this.propProperty](request_data).then((response) => {
            var updateData={data:this.programItem[this.propProperty],type:this.propProperty};
              this.$emit('update-list',updateData)

        })
      },
      OnDataChange(args){
        this.data[args.type]=args.data;
      }
    }

}
</script>

<style scoped>
</style>


