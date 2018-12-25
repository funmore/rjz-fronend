<template>

  <div class="components-container">
    <div>
    <div class="left">
      <tinymce :height="300" v-model="content_des"></tinymce>
    </div>
    <div class="right">
      <tinymce :height="300" v-model="content_dis"></tinymce>
    </div>
  </div>
  <div>  <p>2312312412312</p></div>
  <div ><p>资源清单</p></div>
    <div>
              <el-tabs  v-model="wareName" type="card">
            <el-tab-pane v-for="ware in wareLabels" :label="ware.label" :key='ware.key' :name="ware.key">
              <res-info-table  :res_type="ware.props"></res-info-table>
            </el-tab-pane>
          </el-tabs>
  </div>
  




  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Tinymce from '@/components/Tinymce'
import resInfoTable from './res-info-table.vue'


export default {
  props:[
    'content_des_prop',
    'content_dis_prop'
    ],
  components: { 
    'tinymce':Tinymce,
    'res-info-table':resInfoTable
  },
  computed:{

  },
  data() {
    return {
      activeName2:'first',
      content_des:this.content_des_prop,
      content_dis:this.content_dis_prop,
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false,


      wareLabels: [
        { label: '硬件资源清单', key: 'hardware', props:'硬件' },
        { label: '软件资源清单', key: 'software', props:'软件' }
      ],
      wareName: 'hardware',
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    //this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
            handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
<style scoped>


  .left{
    float:left;
    width: 49%;
  }
  .right{
    float:right;
    width:49%;
  }

</style>

