 <template>
      <el-card class="box-card" >
        <div class="filter-container">
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit" >新增型号名称</el-button>
        </div>




        <el-table :key='list.created_at' :data="list"  v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;">

            <el-table-column  label="序号"
              type="index"
              width="50">
            </el-table-column>

            <el-table-column width="140px" align="center" label="型号名称">
              <template slot-scope="scope">
                <span >{{scope.row.model_name}}</span>
              </template>
            </el-table-column>

            <el-table-column width="140px" align="center" label="型号负责人">
              <template slot-scope="scope">
                <span >{{scope.row.manager_name}}</span>
              </template>
            </el-table-column>


            <el-table-column width="240px" align="center" label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">打开</el-button>
                  <el-button type="primary" size="small" icon="el-icon-edit" :loading="onDeleting" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>


        </el-table>


       <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible">
            <el-form :rules="rules" ref="form" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>

            <el-form-item label="型号名称" prop="model_name">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.model_name">
                </el-input>
              </el-form-item>

             <el-form-item label="型号负责人" prop="employee_id">
                <el-select v-model="temp.employee_id" filterable placeholder="请选择">
                  <el-option
                    v-for="(item,index) in employees"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>


          </el-form>



            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreate(temp)" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary"  @click="confirmUpdate(temp)" v-else>确认</el-button>
           </div>
          </el-dialog>
    </el-card>

   
</template>
<script>

  import { indexModel, showModel, storeModel, updateModel,
         destroyModel } from '@/api/model'
  import { indexEmployee } from '@/api/employee'

  export default {
    data() {
      return {
        listLoading:true,
        onDeleting:false,
        listQuery:{
          isAll:true,
          title:''
        },

        temp:{
          model_name:'',
          employee_id:''
        },
        visible:false,
        rules:{
          model_name:[
          { required: true, message: '请输入型号名称', trigger: 'blur' }
          ],
          employee_id:[
            {  required: true, message: '请选择型号负责人', trigger: 'change' }
          ]
        },

        list:[],
        employees:null,
        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        }
      };
    },


    created(){
      this.getEmployeePrincal()

    },
    mounted(){
      this.getList()
    },

    methods: {
    getList(){
      this.listLoading = true;
      this.listQuery={
          isAll:true,
          title:''
        };
      indexModel(this.listQuery).then(response => {
        var data=response.data
        if(data.total!=0){
          this.list = Object.values(data.items)
        }
      this.listLoading=false;
      })
    },
    getEmployeePrincal(){
        var listQuery={
          checkPM:true
        }
        indexEmployee(listQuery).then(response => {
        var data=response.data
        this.employees = data.items
      })
    },
    handleFilter(){

    },
    handleCreate(){
          this.dialogStatus='create';
          this.temp={
                model_name:'',
                employee_id:''
            },
          this.visible=true;

      },
      handleEdit(row){
           this.dialogStatus='update';
          this.temp=row;
          this.visible=true;
      },
      handleDelete(row){
        this.$confirm('此操作将永久该型号信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onDeleting=true;
          destroyModel(row.id).then(response => {
            var data=response.data
            if(data.is_okay==true){
              for (const v of this.list) {
                  if (v.id === row.id) {
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
                this.$notify({
                  title: '删除失败',
                  message: '只有管理员可以删除',
                  type: 'success',
                  duration: 2000
                })
              }
              this.onDeleting=false;

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      },
      confirmCreate(item){
        item.programteamrole_id=this.propTeamMemberId;

        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.visible=false;
            storeModel(item).then(response => {
              var data=response.data
              item.id=data.id;
              item.created_at=data.created_at;
              item.manager_name=this.employees.find(x=>x.id==item.employee_id).name;
              this.list.unshift(item)
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
          }).catch(err => {
            console.log(err)
          })
        }
      })
      },
      confirmUpdate(item){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.visible=false;
            updateModel(item).then(response => {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
          }).catch(err => {
            console.log(err)
          })
        }
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
    width: 180px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

