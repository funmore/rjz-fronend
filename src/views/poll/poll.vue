<template>
  <div class="mixin-components-container">
    <el-row :gutter="150">

        <div style="margin-bottom:40px;">

          <el-col :span="3" class="text-center">
            <el-button type="primary"  v-waves icon="el-icon-plus" @click="OnPollCreate">创建投票</el-button>
          </el-col>
        </div>
    </el-row>
<el-row class="tac">
<el-col :span="4" id="rolemenu">
  
    <h5>项目担任角色</h5>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="canPoll"
      class="el-menu-vertical-demo"
      @select="handleMenuSelect"
      :collapse="isCollapse"
      >
    <el-submenu index="others">
       <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>我为别人填写的投票</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="canPoll" >可填投票</el-menu-item>
          <el-menu-item index="isPolled">已填投票</el-menu-item>
          <el-menu-item index="isExpired">过期投票</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
      <el-submenu index="mine">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>我创建的投票</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="processing">进行中投票</el-menu-item>
          <el-menu-item index="expired">过期投票</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
 <el-col :span="20" v-loading="listLoading">
    <el-row :gutter="20" style="margin-top:20px;" id="elRow">

      <el-col :span="6" :key="index" v-for="(value,index) in list">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{value.name}}</span>
          </div>
          <div style="height:40px;">
            <el-form :model="value" label-width="70px">
              <el-form-item class="item" label="发起人">
                <span>{{value.employee_name}}</span>
              </el-form-item>
              <el-form-item class="item" label="投票类型">
                <span>{{value.is_multiple|checkPollType}}</span>
              </el-form-item>
              <el-form-item class="item" label="截止日期">
                <span>{{value.due_day}}</span>
              </el-form-item>
              <el-form-item class="item" label="填报次数">
                <span>{{value.poll_fill_count}}</span>
              </el-form-item>
              <el-form-item class="item" label="操作">
                <span v-if="keyPath[0]=='others'">
                  <el-button  v-waves type="primary" size="mini" disabled v-if="keyPath[1]=='isPolled'&&value.is_multiple==0">已填写</el-button>
                  <router-link :to="'/dashboard/poll/fill/'+value.id" v-else-if="keyPath[1]=='canPoll'||(keyPath[1]=='isPolled'&&value.is_multiple==1)"> 
                    <el-button type="primary" size="mini"  v-waves icon="el-icon-edit" >填写</el-button>
                  </router-link>
                </span>
                
                  <router-link :to="'/dashboard/poll/show/'+value.id" > 
                    <el-button type="primary" size="mini"  v-waves icon="el-icon-view" @click="OnPollCreate">查看</el-button>
                  </router-link>
                <span v-if="keyPath[0]=='mine'">
                  <el-button type="primary" size="mini"  v-waves :loading="onDeleting" icon="el-icon-view" @click="OnPollDelete(value.id)">删除</el-button>
                </span>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>


    </el-row>

      </el-col>
    </el-row>

      <el-dialog title="选择创建表单类型" :visible.sync="visible"  >
          <el-row class="tac">
            <el-col :span="12" >
              <router-link :to="'/dashboard/poll/property'"> 
                <el-button type="primary" class="button" id="left" >创建空白表单</el-button>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link :to="'/dashboard/poll/imports'"> 
                <el-button type="success" class="button" id="right" >从Excel创建表单</el-button>
              </router-link>
            </el-col>

          </el-row>
      </el-dialog>
  </div>
</template>

<script>

import waves from '@/directive/waves/index.js' // 水波纹指令
import { indexPoll, showPoll, storePoll, updatePoll,
  destroyPoll } from '@/api/poll'

export default {
  name: 'componentMixin-demo',
  components: {
  },
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {
        type: 'canPoll'
      },
      keyPath: ['others', 'canPoll'],
      isCollapse: false,
      visible: false,
      list: [],
      listLoading: true,
      onDeleting: false

    }
  },
  filters: {
    checkPollType: function(value) {
      if (value == 1) {
        return '多次投票'
      } else {
        return '单次投票'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleMenuSelect(key, keyPath) {
      this.listQuery.type = key
      this.keyPath = keyPath
      this.listQuery.page = 1
      this.list = []
      this.getList()
    },
    getList() {
      this.listLoading = true
      indexPoll(this.listQuery).then(response => {
        var data = response.data
        if (data.total != 0) {
          this.list = Object.values(data.items)
          this.total = data.total
        }
        this.listLoading = false
      })
    },
    OnPollCreate() {
      this.visible = true
    },
    OnPollDelete(poll_id) {
      this.$confirm('此操作将永久删除此表单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.onDeleting = true
        destroyPoll(poll_id).then(response => {
          var data = response.data
          if (data.is_okay == true) {
            for (const v of this.list) {
              if (v.id === poll_id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1)
                break
              }
            }
            this.onDeleting = false
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.onDeleting = false
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
        })
      })
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
.box-card{
  margin-bottom: 10px;
}

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

.item{
  height: 20px;
}


</style>
