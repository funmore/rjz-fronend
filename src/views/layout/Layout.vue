<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar v-on:open-notice="onOpenNotice" ></navbar>
      <app-main></app-main>
    </div>
    <el-dialog title="通知中心" :visible.sync="visible">
      <el-tabs type="border-card">
        <el-tab-pane label="项目消息">

          <el-table :key='tableKey' :data="noticeData" v-loading="listLoading"  border fit highlight-current-row
                style="width: 100%;">
              <el-table-column width="85px" align="center" label="项目编号">
                  <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                  </template>
                </el-table-column>
               
                <el-table-column width="85px" align="center" label="项目名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="更新人">
                  <template slot-scope="scope">
                    <span>{{scope.row.changer}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="更新信息">
                  <template slot-scope="scope">
                    <span>{{scope.row.change_note}}</span>
                  </template>
                </el-table-column>
                
                <el-table-column align="center" label="查看" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="'/management/programs/edit/'+scope.row.id"> 
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="onRouterClicked">打开</el-button>
                  </router-link>
                </template>
              </el-table-column>
        </el-table>

        </el-tab-pane>
        <el-tab-pane label="系统消息">系统消息</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
import { indexPvlog, showPvlog, storePvlog, updatePvlog,
         destroyPvlog } from '@/api/pvlog'


export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      visible:false,
      tableKey:0,
      listLoading:true,
      noticeData:[]
    }
  },  
  created(){
    this.getNotice()
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    onOpenNotice(){
      this.visible=true;
      this.listLoading=true;
      this.getNotice();
    },
    getNotice(){
          indexPvlog().then(response => {
            this.noticeData= response.data.noticeArray
            this.listLoading=false
      }).catch(err => {
        console.log(err)
      })
    },
    onRouterClicked(){
      this.visible=false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
