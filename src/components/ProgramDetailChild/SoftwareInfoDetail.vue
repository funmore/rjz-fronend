 <template>
 <div :visible.sync="propVisible">
   <div v-if="softwareInfo!=null">
        <el-table :key='tableKey' :data="softwareInfo"   border fit highlight-current-row
                style="width: 100%;">

                <el-table-column width="85px" align="center" label="软件名称">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="版本号">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.version_id}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="编译器">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.complier}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="运行环境">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.runtime}}</span>
                  </template>
                </el-table-column>
                
                <el-table-column width="85px" align="center" label="软件规模">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.size}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="折算后代码行">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.reduced_code_size}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="折算原因">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.reduced_reason}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件类型">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.software_cate}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件子类型">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.software_sub_cate}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="CPU类型">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.cpu_type}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="编程语言">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.code_langu}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件用途">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.software_usage}}</span>
                  </template>
                </el-table-column>

                <el-table-column width="85px" align="center" label="软件类型">
                  <template slot-scope="scope">
                    <span @click="handleConfigure(true)">{{scope.row.software_type}}</span>
                  </template>
                </el-table-column>

                <el-table-column min-width="80px" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="handleConfigure(true)">更新</el-button>
                  </template>
                </el-table-column>
</el-table>
</div>
<div v-else>
     <el-button @click="handleConfigure(false)">尚未配置</el-button>
</div>

<ccc :propProgramBasicId="propProgramBasicId" :propIsExist="is_exist"  :propVisible="generalVisible" @close="handleClose"></ccc>

</div>
 




</template>
<script>

import { indexSoftwareInfo, showSoftwareInfo, storeSoftwareInfo, updateSoftwareInfo,
  destroySoftwareInfo } from '@/api/softwareinfo'
import ccc from '@/components/PreProgramCom/SoftwareInfo.vue'
export default {

  name: 'workflow-demo',
  components: { ccc },
  data() {
    return {
      generalVisible: false,
      is_exist: true,

      tableKey: 0,

      softwareInfo: null

    }
  },
  props: {
    propVisible: Boolean,
    propProgramBasicId: Number
  },
  watch: {
    // propVisible start
    propVisible: function(newVa, oldVa) {
      if (newVa == true) {
        this.getData()
      }
    }
    // propVisible end
  },
  created() {
    // this.getData()
  },

  methods: {
    getData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      showSoftwareInfo(this.propProgramBasicId).then(response => {
        var data = response.data
        if (data.isOkay == true) {
          this.softwareInfo = []
          this.softwareInfo.push(data.item)
        }
        loading.close()
      })
    },
    handleConfigure(is_exist) {
      this.is_exist = is_exist
      this.generalVisible = true
    },
    handleClose(args) {
      this.generalVisible = false
      this.getData()
    }
  }
}
</script>
<style>
</style>

