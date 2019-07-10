<template>
      <el-dialog title="选择项目类型" :visible.sync="propVisible"  >
        <el-row class="tac">
          <el-col :span="12" >
                <el-button type="primary" class="button" id="left" @click="createPre">项目申请单</el-button>
          </el-col>
          <el-col :span="12">
                <el-button type="success" class="button" id="right" @click="createPro">项目创建单</el-button>
          </el-col>

        </el-row>
    </el-dialog>
   
</template>

<script>


export default {
  name: 'preProgram',

  props:{
    propProgram: Object,
    propVisible:Boolean,
    propSelection:Object,
    propDialogStatus:String
  },
  data() {
    return {

    }
  },

   methods: {
      createPre(){
        this.$emit('pre-completed',[true,true,false,false,false])
      },
      createPro(){
        this.$emit('pre-completed',[true,true,true,true,true])
      }
  }

}
</script>

<style scoped>
.button{
  height: 200px;
  width: 200px;
  margin: 1px
}
#left{
  float:right;
}
#right{
  float:left;
}
</style>


