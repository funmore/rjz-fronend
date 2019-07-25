 <template>
  <div>
    <el-row class="tac">
  <el-col :span="4">
    <h5>评审对象</h5>
    <el-menu
       ref="menu"
      default-active="测试计划"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      >
      <el-menu-item index="测试计划">
        <i class="el-icon-document"></i>
        <span slot="title">测试计划</span>
      </el-menu-item>
      <el-menu-item index="测试说明">
        <i class="el-icon-menu"></i>
        <span slot="title">测试说明</span>
      </el-menu-item>
      <el-menu-item index="测试报告" >
        <i class="el-icon-document"></i>
        <span slot="title">测试报告</span>
      </el-menu-item>
      <el-menu-item index="测试记录">
        <i class="el-icon-setting"></i>
        <span slot="title">测试记录</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="20">
          <el-tabs v-model="active" @tab-click="handleClick">
              <el-tab-pane
                v-for="(item, index) in fileCategory"
                  :key="index"
                :label="item"
                :name="item"
                :data="item"
              >
              <el-button type="primary"  @click="create()" >新增版本</el-button>
              <el-table :key='specificFile.created_at' :data="specificFile" ref="fileTable" v-loading="listLoading" border fit highlight-current-row
        style="width: 100%;">

                      <el-table-column  label="序号"
                        type="index"
                        width="50">
                      </el-table-column>

                      <el-table-column width="80px" align="center" label="版本">
                        <template slot-scope="scope">
                          <span >{{scope.row.version}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column width="300px" align="center" label="名称">
                        <template slot-scope="scope">
                          <span >{{scope.row.name}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column width="300px" align="center" label="提交人">
                        <template slot-scope="scope">
                          <span >{{scope.row.creator}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column align="center" label="操作" width="400px" class-name="small-padding fixed-width">
                          <template slot-scope="scope">
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="download(scope.row)">下载</el-button>
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="edit(scope.row)">删除</el-button>
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="replace(scope.row)">替换</el-button>
                          </template>
                      </el-table-column>

                </el-table>
              
              </el-tab-pane>
            </el-tabs>
    
  </el-col>
</el-row>

            

         


          <el-dialog :title="textMap[dialogStatus]+active" :visible.sync="visible">
            <el-form :rules="rules" ref="fileUpload" :model="temp" label123456781-position="left" label-width="100px" style='width: 600px; margin-left:50px;'>

              <el-form-item label="版本" >
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.version">
                </el-input>
              </el-form-item>

              <el-form-item label="上传文件">
                  <el-upload class="upload-demo" :auto-upload="false" :on-change="fileChange" :multiple="false" :limit="1" :on-remove="removeFile">
                    <el-button slot="trigger" size="small"><i class="icon-up margin-right-8"></i>从本地选择文件</el-button>
                  </el-upload>
              </el-form-item>

          </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="submitAssignForm(temp)" >上传</el-button>
           </div>
          </el-dialog>
</div>
</template>
<script>
import { indexFileProgram, showFileProgram, storeFileProgram, updateFileProgram,
         destroyFileProgram } from '@/api/fileprogram'
import { indexFileReview, showFileReview, storeFileReview, updateFileReview,
         destroyFileReview } from '@/api/filereview'         
  export default {
    data() {
      return {
        fileCategory:['专家意见','型号负责人意见','修改后版本'],
        active:'专家意见',
        listLoading:true,
        listQuery:{
          // file_program_id:null
        },

        temp:{
          // file_program_id:null,
          id:null,
          version:'',
          category:'',
          phase:''
        },
        // file_program_id:null,
        visible:false,
        rules:{},

        assignForm: {
          files: []
        },

        specificFile:[],
        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        }
      };
    },
    props:{
        propProgramId:Number
    },
    mounted(){
      this.getFileReviewInfo();
    },
    methods: {
      getFileReviewInfo(){
          this.listLoading = true;
          this.listQuery.program_id=this.propProgramId
          // this.listQuery.file_program_id=this.file_program_id;
          this.listQuery.category=this.$refs.menu.activeIndex
          this.listQuery.phase=this.active
          indexFileReview(this.listQuery).then(response => {
            // this.file_program_id=response.data.file_program_id
            var data=response.data
            if(data.total!=0){
              this.specificFile =Object.values(data.items)

            }
          this.listLoading=false;
          })
          },
      fileChange(file, fileList) {
        this.assignForm.files.push(file.raw);
      },
      removeFile(file, fileList) {
        // 筛选选中的文件
        let index = this.assignForm.files.findIndex(val => val.uid === file.raw.uid);
        this.assignForm.files.splice(index, 1);
      },
      cancel(){
        this.visible=false;
      },
      submitAssignForm(){

          this.temp.files=this.assignForm.files;
          this.visible=false;
          storeFileReview(this.temp).then(response => {
              var item=response.data.items;

              let index =this.specificFile.findIndex(one=>one.id==item.id);
              if(index<0){
                  this.specificFile.push(item)
                  this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }else{
                  this.specificFile.splice(index,1,item)
                  this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
                }

                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })

            }).catch(err => {
              console.log(err)
            })
      },
      download(row){
        showFileReview(row.id).then(response => {
              let type=row.name.split('.')[row.name.split('.').length-1]
              let blob = new Blob([response.data], { type: 'application/'+type })
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = row.name
              link.click()

            }).catch(err => {
              console.log(err)
            })
      },
      edit(){},
      replace(row){
        this.dialogStatus='update';
        this.visible=true;
        // this.temp.file_program_id=this.file_program_id;
        this.temp.program_id=this.propProgramId;
        this.temp.version=row.version;
        this.temp.phase=this.active;
        this.temp.category=this.$refs.menu.activeIndex
        this.temp.id=row.id;
        this.assignForm.files.splice(-1, 1);
      },
      create(){
        this.dialogStatus='create';
        this.visible=true;
        // this.temp.file_program_id=this.file_program_id;
        this.temp.program_id=this.propProgramId;
        this.temp.version=null;
        this.temp.category=this.$refs.menu.activeIndex
        this.temp.phase=this.active;
        this.temp.id=null;
      },
      handleSelect(key, keyPath) {
        this.specificFile=[];
        this.getFileReviewInfo();
      },
      handleClick(tab, event) {
        this.specificFile=[];
        this.getFileReviewInfo();
      }
    }
   
  };
</script>
<style>

</style>

