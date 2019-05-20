 <template>
  <div>

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

              <el-table-column width="140px" align="center" label="版本">
                <template slot-scope="scope">
                  <span >{{scope.row.version}}</span>
                </template>
              </el-table-column>

              <el-table-column width="600px" align="center" label="名称">
                <template slot-scope="scope">
                  <span >{{scope.row.name}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="400px" class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="download(scope.row)">下载</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="edit(scope.row)">删除</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="replace(scope.row)">替换</el-button>
                  </template>
              </el-table-column>

              <el-table-column width="200px" align="center" label="选择评审文件" v-if="propFileCategory=='output'" >
                <template slot-scope="scope">
                  <el-radio v-model="toReviewFileId" :label="scope.row.id" >送评审</el-radio>
                </template>
              </el-table-column>
                </el-table>
              
              </el-tab-pane>
            </el-tabs>

         


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
  export default {
    data() {
      return {
        fileCategory:this.propFileCategory==="input"?['任务书','软件需求','软件设计','使用手册','接口协议','被测软件','测试任务书','软件更改']:['测试计划','测试说明','测试大纲','测试报告','测试记录'],
        active:this.propActive,
        listLoading:true,
        listQuery:{
          program_id:this.propProgramId,
          category:null
        },

        temp:{
          program_id:this.propProgramId,
          id:null,
          version:'',
          category:''
        },
        visible:false,
        rules:{},

        assignForm: {
          files: []
        },

        //uploadedFile:[],
        specificFile:[],
        toReviewFileId:null,
        dialogStatus: '',
        textMap: {
          update: '更新',
          create: '创建'
        }
      };
    },
    props:{
        propProgramId:Number,
        propFileCategory:String,
        propActive:String
    },
    watch: {
      toReviewFileId:function(newVa,oldVa){
        let id=parseInt(newVa);
        let data=this.specificFile.find(item=>item.id==id);
          if(data.review_state!=='是'){
            data.review_state='是'
            updateFileProgram(data).then(response => {
                let c=1;
                }).catch(err => {
                  console.log(err)
                })
          }
      }
     },
    created(){

    },
    beforeMount(){
      let c=1;
    },
    mounted(){
      this.getFileProgramInfo(this.propProgramId);
    },
    methods: {
      getFileProgramInfo(id){
          this.listLoading = true;
          this.listQuery.program_id=id;
          this.listQuery.category=this.active
          indexFileProgram(this.listQuery).then(response => {
            var data=response.data
            if(data.total!=0){
              this.specificFile =Object.values(data.items)
              let toReviewFile=this.specificFile.find(x=>x.review_state=='是');
              if(toReviewFile!=null){
                this.toReviewFileId=toReviewFile.id;
              }
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
          storeFileProgram(this.temp).then(response => {
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
        showFileProgram(row.id).then(response => {
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
        this.temp.version=row.version;
        this.temp.category=this.active;
        this.temp.id=row.id;
        // this.assignForm.files=[];
        this.assignForm.files.splice(-1, 1);
      },
      create(){
        this.dialogStatus='create';
        this.visible=true;
        this.temp.version=null;
        this.temp.category=this.active;
        this.temp.id=null;
      },
      update(row){
        let data=row;
        row.review_state='是'
        updateFileProgram(data).then(response => {
            let c=1;
            }).catch(err => {
              console.log(err)
            })
      },
      handleClick(tab, event) {
        this.specificFile=[];
        this.getFileProgramInfo(this.propProgramId);
      }

    }
   
  };
</script>
<style>

</style>

