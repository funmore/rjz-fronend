<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="guide" @click.prevent.stop="guide">
      <el-badge class="item">
        <el-button icon="el-icon-guide">不知道怎么用？</el-button>
      </el-badge>
    </div>
    <div class="notification" @click="openNoti">
      <el-badge :value="notice" class="item">
        <el-button icon="el-icon-bell">通知中心</el-button>
      </el-badge>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <el-button icon="el-icon-caret-bottom">你好！{{name}}</el-button>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'notice',
      'name'
    ])
  },
  data() {
    return {
      driver: null
      // mock_notice:0,
      // interval_id:0
    }
  },
  mounted() {
    this.driver = new Driver()

  },
  // created(){
  //   this.interval_id=setInterval(()=>{
  //     this.mock_notice=Math.floor(Math.random() * Math.floor(10))
  //     },2000)
  // },
  // beforeDestroy(){
  //   clearInterval(this.interval_id)
  // },
  
  methods: {
    guide() {
      this.driver.defineSteps(this.$store.getters.steps)
      this.driver.start()
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    openNoti(){
      this.$emit('open-notice');
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .guide{
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 337px;
  }
  .notification{
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 200px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

