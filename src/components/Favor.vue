<template>
  <span >
    
      <el-select clearable style="width: 130px" class="filter-item" v-model="select" placeholder="我的收藏" @change="onChange">
        <el-option-group
        v-for="groupOne in group"
        :key="groupOne.type"
        :label="groupOne.type">
        <el-option
            v-for="item in groupOne.options"
            :key="item.created_at"
            :label="item.alias"
            :value="item">
            <span style="float: left">{{ item.alias }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.system=='否'"><i class="el-icon-delete" @click="OnDelete(item.id)"></i></span>
        </el-option>
        </el-option-group>
    </el-select>
      <el-button  type="primary" v-waves icon="el-icon-star-on" @click="saveFavor">{{saveName}}</el-button>
      
      
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible">
        <el-form :rules="rules" ref="form" :model="temp" label123456781-position="left" label-width="200px" style='width: 600px; margin-left:50px;'>

        <el-form-item label="保存名称" prop="alias">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.alias">
            </el-input>
            </el-form-item>

            <el-form-item :label="systemName+'？'" prop="system" v-if="isAdmin">
            <el-select v-model="temp.system" filterable placeholder="请选择">
                <el-option
                v-for="(item,index) in ['是','否']"
                :key="index"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
            </el-form-item>

            <el-form-item :label="defaultName+'？'" prop="default">
            <el-select v-model="temp.default" filterable placeholder="请选择">
                <el-option
                v-for="(item,index) in ['是','否']"
                :key="index"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
            </el-form-item>

      </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary"  @click="confirmCreate(temp)" v-if="dialogStatus=='create'">确认</el-button>
              <el-button type="primary"  @click="confirmUpdate(temp)" v-else>确认</el-button>
           </div>
          </el-dialog>




  </span>
</template>

<script>

import { indexFavor, showFavor, storeFavor, updateFavor,
  destroyFavor } from '@/api/favor'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'favor',

  data() {
    return {
      saveName: '保存当前'.concat(this.propName),
      systemName: '系统'.concat(this.propName),
      customName: '自定义'.concat(this.propName),
      defaultName: '首选'.concat(this.propName),

      rules: {
        alias: [
          { required: true, message: '请输入保存名称', trigger: 'blur' }
        ],
        default: [
        ],
        system: [
        ]
      },
      FavorList: [],
      select: null,

      visible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '创建'
      },
      temp: {
        type: this.propType,
        alias: '',
        value: '',
        system: '否',
        default: '否'
      },
      group: [
        {
          type: '系统'.concat(this.propName),
          options: []
        },
        {
          type: '自定义'.concat(this.propName),
          options: []
        }
      ]
    }
  },
  computed: {
    isAdmin() {
      if (this.$store.state.user.roles.some(x => x == '管理员')) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    FavorList: {
      handler: function(newVa, oldVa) {
        this.group.find(x => x.type == this.systemName).options = []
        this.group.find(x => x.type == this.customName).options = []
        newVa.map(x => {
          if (x.system == '是') {
            this.group.find(x => x.type == this.systemName).options.push(x)
          } else if (x.system == '否') {
            this.group.find(x => x.type == this.customName).options.push(x)
          }
        })
      },
      deep: true
    }
  },
  filters: {
    isSystem(args) {
      if (args == '是') {
        return this.systemName
      } else {
        return this.customName
      }
    }
  },
  props: {
    propType: String,
    propPropertySelect: Object,
    propName: {
      type: String,
      default: '视图'
    }

  },
  directives: {
    waves
  },
  created() {
    this.getFavor()
  },
  mounted() {

  },

  methods: {
    onChange(item) {
      this.$emit('favorChange', item.value)
    },
    getFavor() {
      var listQuery = {
        type: this.propType,
        default: ''
      }
      indexFavor(listQuery).then(response => {
        var data = response.data
        if (data.total != 0) {
          this.FavorList = Object.values(data.items)

          this.select = this.FavorList.findIndex(x => x.default == '是') != -1 ? this.FavorList[this.FavorList.findIndex(x => x.default == '是')] : this.FavorList[0]
          this.onChange(this.select)
        }
      })
    },
    saveFavor() {
      this.visible = true
      this.dialogStatus = 'create'
      this.temp = {
        type: this.propType,
        alias: '',
        value: this.propPropertySelect,
        default: '否',
        system: '否'
      }
    },
    confirmCreate(item) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.visible = false
          storeFavor(item).then(response => {
            var data = response.data
            item.id = data.id
            item.created_at = data.created_at
            this.FavorList.unshift(item)
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    confirmUpdate(item) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.visible = false
          updateFavor(item).then(response => {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    cancel() {
      this.visible = false
    },
    OnDelete(id) {
      this.$confirm('此操作将永久删除此' + this.propName + '组合, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroyFavor(id).then(response => {
          var data = response.data
          if (data.is_okay == true) {
            var options = this.group.find(x => x.type == this.customName).options
            for (const v of options) {
              if (v.id === id) {
                const index = options.indexOf(v)
                options.splice(index, 1)
                break
              }
            }
            this.select = this.FavorList.findIndex(x => x.default == '是') != -1 ? this.FavorList[this.FavorList.findIndex(x => x.default == '是')] : this.FavorList[0]
            this.onChange(this.select)
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '删除失败',
              message: data.note,
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
