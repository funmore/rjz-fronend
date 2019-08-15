<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出EXCEL</el-button>
    </div>

    <el-table :key='list.id' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column  width="50px" align="center" label="序号"  type="index">
      </el-table-column>



      <el-table-column 
          :key="index" v-for="(item,index) in structure.pollColumn"
          width="150px" align="center"  :label="item.name"  >
        <template slot-scope="scope">
          <!-- <span>{{Object.values(scope.row).find(value=>value.poll_column_id==item.id).value}}</span> -->
          <span>{{scope.row|output(item)}}</span>
        </template>
      </el-table-column>



      <el-table-column width="80px" align="center" label="填写人">
        <template slot-scope="scope">
          <span>{{scope.row.employee_name}}</span>
        </template>
      </el-table-column>






      <el-table-column align="center" label="操作" width="130px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" :loading="onDeleting" @click="onDestory(scope.row.poll_fill_id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>







  </div>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import { showPoll } from '@/api/poll'
import { indexPollFill, showPollFill, storePollFill, updatePollFill,
destroyPollFill } from '@/api/pollfill'



export default {
  name: 'complexTable',
  components: {  },
  directives: {
    waves
  },
  filters:{
    output:function(row,item){
      return Object.values(row).find(value=>value.poll_column_id==item.id).value
    }
  },
  data() {
    return {
      
      listLoading:true,
      onDeleting:false,
      list: [],
      structure:[],
      total: new Number(),
      downloadLoading:false

    }
  },

  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getList(this.id)
  },
  methods: {
    getList(id) {

      this.listLoading = true;
      var listQuery={id:id};
      indexPollFill(listQuery).then(response => {
        var data=response.data
        this.list = Object.values(data.list)
        this.structure=data.structure
        this.listLoading=false;
      })
    },
    onDestory(poll_fill_id){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onDeleting=true;
          destroyPollFill(poll_fill_id).then(response => {
            var data=response.data
            if(data.is_okay==true){
              for (const v of this.list) {
                  if (v.poll_fill_id === poll_fill_id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1)
                    break
                  }
                }
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
              }else{
                this.onDeleting=false;
                this.$notify({
                  title: '删除失败',
                  message: '只有创建人可以删除',
                  type: 'success',
                  duration: 2000
                })
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    } ,
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        var tHeader=['序号'];
        this.structure.pollColumn.forEach(x=>tHeader.push(x.name));
        var filterVal= [...tHeader]; 
        tHeader.push('填写人');
        filterVal.push('employee_name');

        var data = this.formatJson(this.structure.pollColumn, this.list)
        data.forEach((value,index)=>value.unshift(index))
        data=this.addName(data,this.list);

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '填报信息'+dateTime
        })
        this.downloadLoading = false
      })
    },
    // {{Object.values(scope.row).find(value=>value.poll_column_id==item.id).value}}
    formatJson(filterVal, list) {
      return list.map(v => filterVal.map(j=> {
            if(v instanceof Object){
              return Object.values(v).find(k=>k.poll_column_id==j.id).value
            }else{
              var b=1;
            }
      }))
    },
    addName(data,list){
      return data.map((value,index)=>{
        value.push(list[index].employee_name);
      return value
      });
    },

  }
}
</script>
