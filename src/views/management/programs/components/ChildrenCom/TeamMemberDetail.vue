 <template>

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in memberInfoTabs"
                :label="closure(item)"
                :name="item.name"
                :data="singleMemberInfo"
              >

                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="姓名">
                      <span>{{ singleMemberInfo.name }}</span>
                    </el-form-item>
                    <el-form-item label="项目角色">
                      <span>{{ singleMemberInfo.role }}</span>
                    </el-form-item>
                    <el-form-item label="负责内容">
                      <span>{{ singleMemberInfo.part }}</span>
                    </el-form-item>
                    <el-form-item label="当前进展">
                      <span>{{ singleMemberInfo.progress }}</span>
                    </el-form-item>
                  </el-form>

              <el-card class="box-card">
                <div class="filter-container">


                  <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.phaseCollection" >
                    <el-option v-for="item in phaseCollection" :key="item.phaseNum" :label="item.phase" :value="item.phaseNum">
                    </el-option>
                  </el-select>


                  <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
                </div>


                <el-table :key='singleMemberInfo.progressTable.created_at' :data="singleMemberInfo.progressTable"   border fit highlight-current-row
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

                    <el-table-column width="150px" align="center" label="任务发起人">
                      <template slot-scope="scope">
                        <span >{{scope.row.taskeInitiator}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column width="150px" align="center" label="待办任务">
                      <template slot-scope="scope">
                        <span >{{scope.row.content}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column width="180px" align="center" label="预期完成时间">
                      <template slot-scope="scope">
                        {{scope.row.plan_done_at}}
                      </template>
                    </el-table-column>

                    <el-table-column width="150px" align="center" label="当前状态">
                      <template slot-scope="scope">
                        <span >{{scope.row.state}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column width="150px" align="center" label="备注">
                      <template slot-scope="scope">
                        <span >{{scope.row.notes}}</span>
                      </template>
                    </el-table-column>


                </el-table>
              </el-card>


              </el-tab-pane>
            </el-tabs>


</template>
<script>
  import { fetchMemberInfo } from '@/api/management-programs-memberinfo'

  export default {
    data() {
      return {
        listQuery:{
          phaseCollection:''
        },
        phaseCollection:[{phase:'截止测试准备阶段',phaseNum:1},{phase:'截止评审问题闭合',phaseNum:2},{phase:'截止入库归档',phaseNum:3}],
        memberInfoTabs: [{
          title: '项目组长 wangy',
          role:'项目组长',
          _name:'wangy',
          name: '1',
        }, {
          title: '项目组员 fanzq',
          role:'项目组员',
          _name:'fanzq',
          name: '2',
        },{
          title: '监督管理 yanxl',
          role:'监督管理',
          _name:'yanxl',
          name: '3',
        },{
          title: '配置管理 yanhy',
          role:'配置管理',
          _name:'yanhy',
          name: '4',
        },{
          title: '质量管理 youy',
          role:'质量管理',
          _name:'youy',
          name: '5',
        }
        ],
        tabIndex: 2,
        activeName:this.propActiveName,
        singleMemberInfo: {
          id: '12987122',
          name: 'wangy',
          role: '项目组长ss',
          part:'动态测试',
          progress:'50%',
          progressTable:[
            {created_at:'1973-08-06 21:02:50',updated_at:'1973-08-06 21:02:50',taskeInitiator:'wangy',content:'0',plan_done_at:'1973-08-06 21:02:50',state:'待解决',notes:'任务复杂，时间不够'},
            {created_at:'1973-08-06 21:02:50',updated_at:'1973-08-06 21:02:50',taskeInitiator:'wangy',content:'0',plan_done_at:'1973-08-06 21:02:50',state:'待解决',notes:'任务复杂，时间不够'},
            {created_at:'1973-08-06 21:02:50',updated_at:'1973-08-06 21:02:50',taskeInitiator:'wangy',content:'0',plan_done_at:'1973-08-06 21:02:50',state:'待解决',notes:'任务复杂，时间不够'}
          ]
        }
      };
    },
    // props:{
    //   propActiveName:{
    //     type:String      }
    // },
    props:['propActiveName'],
    computed:{
      //闭包实现传参数
      closure(){    
        return function(item){
          return item.role+ ' '+item._name
        }
      }
    },
    created(){
          // if (this.isEdit) {
          //     const id = this.$route.params && this.$route.params.id
          //     this.fetchData(id)
          //   } else {
          //     this.postForm = Object.assign({}, defaultForm)
          //   }
    },
    methods: {
      handleFilter(){
          //this.listQuery.page = 1
          //this.getList()
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      fetchData(id){
        fetchArticle(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
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

<!--             id
            name
            role
            part
            progress
            notes -->