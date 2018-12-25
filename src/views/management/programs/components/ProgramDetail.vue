<template>
  <div class="createPost-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目状态</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-steps :active="active" finish-status="success">
            <el-step title="S1" description="项目建立"></el-step>
            <el-step title="S2" description="接收被测件及测评需求"></el-step>
            <el-step title="S3" description="静态问题提交"></el-step>
            <el-step title="S4" description="测试环境就绪"></el-step>
            <el-step title="S5" description="测试工作产品编写"></el-step>
            <el-step title="S6" description="入库归档"></el-step>
            <el-step title="S7" description="测试工作产品内部评审"></el-step>
            <el-step title="S8" description="评审问题已闭合"></el-step>
            <el-step title="S9" description="测试需求(大纲)正式评审"></el-step>
            <el-step title="S10" description="评审问题闭合状态"></el-step>
            <el-step title="S11" description="入库归档状态"></el-step>
            <el-step title="S12" description="首轮测试"></el-step>
            <el-step title="S13" description="软件问题单闭合状态"></el-step>
            <el-step title="S14" description="报告评审"></el-step>
            <el-step title="S15" description="评审问题闭合状态"></el-step>
            <el-step title="S16" description="入库归档状态"></el-step>
          </el-steps>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目基本信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/documentation/index">PlaceHolder</router-link>
          </el-col>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目组信息</span>
        </div>
        <div style="margin-bottom:50px;">
            <team-member-detail :propActiveName="activeName"></team-member-detail>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>被测件信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-table :key='tableKey' :data="softwareInfo"   border fit highlight-current-row
                style="width: 100%;">
                <el-table-column align="center" label="序号" width="50px">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.id}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件名称">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="研制单位">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.producer}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="开发方联系人">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.contact}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件领域">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.domain}}</span>
                  </template>
                </el-table-column>
                
                <el-table-column width="85px" align="center" label="软件规模">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.size}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="编译器">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.complier}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="运行平台">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.platform}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="测试环境">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.runtime}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="折算后代码行">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.reducedCodeSize}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="折算原因">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.reducedReason}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="测试类型">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.type}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="录入人">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.inofTyper}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="信息来源">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.infoSource}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="录入时间">
                  <template slot-scope="scope">
                    <span @click="handleUpdate(scope.row)">{{scope.row.inforTypeTime}}</span>
                  </template>
                </el-table-column>

                <el-table-column min-width="80px" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="handleUpdate(scope.row)">更新</el-button>
                  </template>
                </el-table-column>

              </el-table>

        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目工作产品</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="program-product">
            <div>被测件&测评需求</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="4" class="program-product">
            <div>工作产品</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="4" class="program-product">
            <div>问题单</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="4" class="program-product">
            <div>评审意见</div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </div>
      </el-card>
    </el-row>


    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>在线评审</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="12" class="program-product">
            <div class="components-container board">
            <Kanban :key="1" class="kanban todo" :list="list1" :options="options" header-text="专家评审意见"/>
            <Kanban :key="2" class="kanban working" :list="list2" :options="options" header-text="项目组长已确认"/>
            <Kanban :key="3" class="kanban done" :list="list3" :options="options" header-text="质量管理已确认"/>
          </div>
        </el-col>

        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>合同信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-steps :active="active" finish-status="success">
            <el-step title="S1" description="选定乙方"></el-step>
            <el-step title="S2" description="已提交BPM申请"></el-step>
            <el-step title="S3" description="已完成BPM审批"></el-step>
            <el-step title="S4" description="已完成合同评审"></el-step>
            <el-step title="S5" description="已提交合同系统"></el-step>
            <el-step title="S6" description="已完成系统审批"></el-step>
            <el-step title="S7" description="已完成乙方签署盖章"></el-step>
            <el-step title="S8" description="已完成甲方签署盖章"></el-step>
            <el-step title="S9" description="已完成验收"></el-step>
            <el-step title="S10" description="已收到发票"></el-step>
            <el-step title="S11" description="已发起付款流程"></el-step>
            <el-step title="S12" description="已完成付款流程审批"></el-step>
            <el-step title="S13" description="已付款"></el-step>
            <el-step title="S14" description="已报销"></el-step>
          </el-steps>

        </div>
      </el-card>
    </el-row>

      <!-- 各种forms -->
      <!-- 被测件信息form start -->
      <el-dialog :title="'更新被测件信息'" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleSoftwareInfo" ref="dataForm" :model="temp" label123456781-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="软件名称">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.name">
          </el-input>
        </el-form-item>

        <el-form-item label="研制单位">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.producer">
          </el-input>
        </el-form-item>

        <el-form-item label="开发方联系人">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.contact">
          </el-input>
        </el-form-item>

        <el-form-item label="软件领域">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.domain">
          </el-input>
        </el-form-item>

        <el-form-item label="软件规模">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.size">
          </el-input>
        </el-form-item>

        <el-form-item label="编译器">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.complier">
          </el-input>
        </el-form-item>

        <el-form-item label="运行平台">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.platform">
          </el-input>
        </el-form-item>

        <el-form-item label="测试环境">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.runtime">
          </el-input>
        </el-form-item>

        <el-form-item label="折算后代码行">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.reducedCodeSize">
          </el-input>
        </el-form-item>

        <el-form-item label="折算原因">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.reducedReason">
          </el-input>
        </el-form-item>

        <el-form-item label="软件类型">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.type">
          </el-input>
        </el-form-item>

        <el-form-item label="录入人">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.infoTyper">
          </el-input>
        </el-form-item>

        <el-form-item label="信息来源">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.infoSource">
          </el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>
    <!-- 被测件信息form end -->



      <!-- 各种forms  end-->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import Kanban from './Kanban4Rjz'
import TeamMemberDetail from './ChildrenCom/TeamMemberDetail'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ProgramDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown, Kanban,TeamMemberDetail },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(null)
        }
      } else {
        callback()
      }
    }
    return {
      activeName:"1",
      tableKey:0,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      active:7,
      crews:[
        {id:1,name:'wanghc',role:'0',part:'导航测试',progress:'50%',notes:'需要更多人手！'},
        {id:2,name:'yangjr',role:'1',part:'模型测试',progress:'30%',notes:''},
        {id:3,name:'fanzq',role:'1',part:'环境搭建',progress:'40%',notes:''}
          ],
      softwareInfo: [{
        id:1,
        name: '1',
        producer: '2',
        contact: '3',
        domain:'4',
        size:5,
        complier:'6',
        platform:'7',
        runtime:'8',
        reducedCodeSize:'9',
        reducedReason:'10',
        type:'11',
        infoTyper:'12',
        infoSource:'13',
        infoTypeTime:'14'
      }],
      dialogFormVisible: false,
      temp: {
        id:1,
        name: '1',
        producer: '2',
        contact: '3',
        domain:'4',
        size:5,
        complier:'6',
        platform:'7',
        runtime:'8',
        reducedCodeSize:'9',
        reducedReason:'10',
        type:'11',
        infoTyper:'12',
        infoSource:'13',
        infoTypeTime:'14'
      },
       ruleSoftwareInfo: {
        // workers: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],


        options: {
        group: 'mission'
      },
      list1: [
        { content:'dfad',index: 'Mission', id: 1 },
        { content:'dfad',index: 'Mission', id: 2 },
        { content:'dfad',index: 'Mission', id: 3 },
        { content:'dfad',index: 'Mission', id: 4 }
      ]
      ,
      list2: [
        { content:'dfad',index: 'Mission', id: 5 },
        { content:'dfad',index: 'Mission', id: 6 },
        { content:'dfad',index: 'Mission', id: 7 }
      ],
      list3: [
        { content:'dfad',index: 'Mission', id: 8 },
        { content:'dfad',index: 'Mission', id: 9 },
        { content:'dfad',index: 'Mission', id: 10 }
      ]

    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    
    //点击被测件信息更新按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //被测件信息form内点击确认  如果是创建新信息
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.workers = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    //被测件信息form内点击确认  如果是更新信息
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)   //deep copy this.temp
          // updateArticle(tempData).then(() => {
          //   for (const v of this.softwareInfo) {
          //     if (v.id === this.temp.id) {
          //       const index = this.softwareInfo.indexOf(v)
          //       this.softwareInfo.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
          for (const v of this.softwareInfo) {
              if (v.id === this.temp.id) {
                const index = this.softwareInfo.indexOf(v)
                this.softwareInfo.splice(index, 1, this.temp)   //将list中的原有的条目找到，并替换为新的条目
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    },



      //上传控件提醒函数 start
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
      //上传控件提醒函数 end

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  background-color: #f0f2f5;
  padding: 30px;

  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .program-product{
    margin:50px;
  }
  .el-row{
    padding:10px;
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }

  
}
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
