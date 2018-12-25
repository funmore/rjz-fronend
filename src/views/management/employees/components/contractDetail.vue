<template>
  <div class="createPost-container">
   
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>合同状态</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-steps :active="contractSteps.active" finish-status="success">
            <el-step v-for="index in contractSteps.contractStepsArray.length" :title="'S'+index" :description="contractSteps.contractStepsArray[index-1]"></el-step>
          </el-steps>

        </div>
      </el-card>
    </el-row>


    <!-- related programs -->
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>相关信息</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-card class="box-card-related-programs">
            <div slot="header" class="clearfix">
              <span>与本合同关联的项目</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              <router-link :to="'/management/programs/edit/'+o"> 
                {{'测试项目'+o}}
              </router-link>
              <span></span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
            </div>
            <el-button style="float: right; padding: 3px 0" type="text">新增</el-button>
          </el-card>
        </div>
      </el-card>
    </el-row>

        <!-- related programs -->
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>协调事项</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-card class="box-card">
                <div class="filter-container">
                  <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.contractUpdateInfoState">
                    <el-option v-for="item in contractUpdateInfoState" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                  <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.createdSort" >
                    <el-option v-for="item in createdSortOptions" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                  </el-select>
                  <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.updatedSort">
                    <el-option v-for="item in updatedSortOptions" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                  </el-select>
                  <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                  <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
                </div>

              <el-table :key='tableKey' :data="contractUpdateInfo"   border fit highlight-current-row
                style="width: 100%;">


                <el-table-column width="180px" align="center" label="创建时间">
                  <template slot-scope="scope">
                    {{scope.row.created_at}}
                  </template>
                </el-table-column>

                <el-table-column width="180px" align="center" label="更新时间">
                  <template slot-scope="scope">
                    {{scope.row.updated_at}}
                  </template>
                </el-table-column>


                <el-table-column width="150px" align="center" label="协调事项">
                  <template slot-scope="scope">
                    <span >{{scope.row.content}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="150px" align="center" label="录入人员">
                  <template slot-scope="scope">
                    <span >{{scope.row.info_typer}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="150px" align="center" label="当前状态">
                  <template slot-scope="scope">
                    <span >{{scope.row.state}}</span>
                  </template>
                </el-table-column>


              </el-table>
          </el-card>
        </div>
      </el-card>
    </el-row>

    

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
  name: 'ContractDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown, Kanban },
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
      contractSteps:{
        active:2,
        contractStepsArray:['选定乙方','已提交BPM申请','已完成BPM审批','已完成合同评审','已提交合同系统','已完成系统审批','已完成乙方签署盖章','已完成甲方签署盖章','已完成验收','已收到发票','已发起付款流程','已完成付款流程审批','已付款','已报销']
      },
      active:2,
      contractStepsArray:['选定乙方','已提交BPM申请','已完成BPM审批','已完成合同评审','已提交合同系统','已完成系统审批','已完成乙方签署盖章','已完成甲方签署盖章','已完成验收','已收到发票','已发起付款流程','已完成付款流程审批','已付款','已报销'],
      contractUpdateInfo:[
        {created_at:'1973-08-06 21:02:50',updated_at:'1973-08-06 21:02:50',content:'0',info_typer:'wangch',state:'待解决'},
        {created_at:'1973-08-06 21:02:50',updated_at:'1973-08-06 21:02:50',content:'0',info_typer:'wangch',state:'待解决'},
        {created_at:'1973-08-06 21:02:50',updated_at:'1973-08-06 21:02:50',content:'0',info_typer:'wangch',state:'待解决'}
          ],
      contractUpdateInfoState: ["待解决","解决中","已解决"],
      createdSortOptions: [{ label: '创建时间 升序', key: '+id' }, { label: '创建时间 降序', key: '-id' }],
      updatedSortOptions: [{ label: '更新时间 升序', key: '+id' }, { label: '更新时间 降序', key: '-id' }],
      listQuery: {
        page: 1,
        limit: 20,
        contractUpdateInfoState:'',   //
        type: undefined,
        createdSort: '+id',
        updatedSort: '+id',
      },
      dialogFormVisible: false,
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
      },
      //上传控件提醒函数 end

      handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
      getList() {
      this.listLoading = true
      fetchManagementProgramsList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  background-color: #f0f2f5;
  padding: 30px;
  position: relative;
  .el-row{
    padding:10px;
  }

  //关联项目
  .box-card{
    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card-related-programs {
    width: 480px;
  }
  }
  
}


</style>
