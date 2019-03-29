 <template>

 <el-table :key='tableKey' :data="SoftwareInfo"   border fit highlight-current-row
                style="width: 100%;">

                <el-table-column width="85px" align="center" label="软件名称">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="版本号">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.version_id}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="编译器">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.complier}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="运行环境">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.runtime}}</span>
                  </template>
                </el-table-column>
                
                <el-table-column width="85px" align="center" label="软件规模">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.size}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="折算后代码行">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.reduced_code_size}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="折算原因">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.reduced_reason}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件类型">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.software_cate}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件子类型">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.software_sub_cate}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="CPU类型">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.cpu_type}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="编程语言">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.code_langu}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件用途">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.software_usage}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件类型">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.software_type}}</span>
                  </template>
                </el-table-column>

                <el-table-column min-width="80px" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="handleUpdate(scope.row)">更新</el-button>
                  </template>
                </el-table-column>

</el-table>




</template>
<script>




  export default {
    name: 'workflow-demo',
    data() {
      return {
       tableKey:0,



      temp:{

      }
      };
    },
    props:{
        SoftwareInfo:Array
    },
    created(){
      var a =1;
    },
    methods: {
        handleUpdate(row){
          this.$emit('dochange',row)
        }
    }
  };
</script>
<style>
</style>

