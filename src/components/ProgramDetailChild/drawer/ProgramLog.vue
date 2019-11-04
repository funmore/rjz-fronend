 <template>
  <div :visible.sync="propVisible">
      <div class="block" v-loading="listLoading">
        <div class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="false">正序</el-radio>
            <el-radio :label="true">倒序</el-radio>
          </el-radio-group>
        </div>
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(item, index) in program_log"
            :key="index"
            :timestamp="item.created_at">
            <div>「{{item.value.employee_name}}」对命名为「{{item.value.instance_name}}」的「{{item.value.name}}」执行了数据「{{item.value.type}}」操作</div>


            
          </el-timeline-item>
        </el-timeline>
      </div>
</div>
</template>
<script>

  import { indexProgramLog, showProgramLog, storeProgramLog, updateProgramLog,
         destroyProgramLog } from '@/api/ProgramLog'


  export default {
    data() {
      return {
        reverse:false,
        listLoading:false,
        program_log:[]
      };
    },
    props:{
        propVisible:Boolean
    },
    created(){
        this.getNote();
    },

    watch:{
      //propVisible start
      propVisible:function(newVa,oldVa){
        if(newVa==true){
          this.getNote();  //获取操作流工作记录
        }
      },
      //propVisible end
    },
    methods: {
      getNote(){
      this.listLoading = true;
      var listQuery={id:this.$store.getters.programBasicId}
      indexProgramLog(listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.program_log = Object.values(data.items)
        }
        this.listLoading = false
      })
    }
    }
  };
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

