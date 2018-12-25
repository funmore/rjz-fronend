<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
<!--         <keep-alive>
 -->          
 <tab-pane :content_des_prop='item.label' :content_dis_prop="content_dis_func(item.label)"  v-if='activeName==item.key' :type='item.label' ></tab-pane>
<!--         </keep-alive>
 --> 


    </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
import tabPane from './components/res-info'

export default {
  activeName2:'first',
  name: 'tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '半实物仿真测试环境', key: 'half-real' },
        { label: '全数字仿真测试环境', key: 'svp' },
        { label: '其他测试工具', key: 'other' }
      ],
      activeName: 'half-real'
    }
  },
  computed:{

  },
  methods: {
    content_dis_func:function(e){
      return e+'偏差说明'
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
