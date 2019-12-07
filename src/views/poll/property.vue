<template>
  <div class="app-container" >



    

    <div >
      <el-form :model="request_data.poll" label-width="100px" :rules="rules" ref="request_data_form">
           <el-form-item label="表单名称" prop="name">
            <el-input v-model="request_data.poll.name"></el-input>
          </el-form-item>
          <el-form-item label="是否允许多次填写" prop="is_multiple">
            <el-switch
              v-model="request_data.poll.is_multiple"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="填写截止日期" prop="due_day">
            <el-date-picker v-model="request_data.poll.due_day" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date"></el-date-picker>
          </el-form-item>
      <select-employee :propIdList="request_data.poll.range" propLabel="表单范围" propProp="range" @rangeChange="OnRangeChange"></select-employee>
    </el-form>
        

         <span >在</span>
        <el-select v-model="insertAfterName" placeholder="字段名">
              <el-option
                v-for="(item,index) in propertyData"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
        </el-select>
        <span >后新增一行名为</span>
        <el-input v-model="insertName"  style="width: 180px;" placeholder="字段名" ></el-input>
        <span >的字段</span>
        <el-button type="primary" @click="OnInsert">确认</el-button>

        <el-table ref="multipleTable" :data="propertyData" border highlight-current-row style="width: 100%;margin-top:20px;" >

        <el-table-column width="80px" align="center" label="标题">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column width="150px" align="center" label="数据类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" placeholder="请选择">
              <el-option
                v-for="(item,index) in typeOptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column width="600px" align="center" label="有效值">
            <template slot-scope="scope">
              <div v-if="scope.row.type==='数字'">
                <el-form ref="form" :model="scope.row.valid_value" label-width="100px">
                 <el-form-item label="最小值">
                  <el-input v-model="scope.row.valid_value[0]" width="100px"></el-input>
                </el-form-item>
                <el-form-item label="最大值">
                  <el-input v-model="scope.row.valid_value[1]" width="100px"></el-input>
                </el-form-item>
              </el-form>
              </div>
              <div v-else-if="scope.row.type==='单项选择'">
                <el-tag
                :key="tag"
                v-for="tag in scope.row.valid_value"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,scope.row)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                :ref="scope.row.name"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 有效值</el-button>
              </div>

              <div v-else-if="scope.row.type==='多项选择'">
                <el-tag
                :key="tag"
                v-for="tag in scope.row.valid_value"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,scope.row)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                :ref="scope.row.name"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 有效值</el-button>
              </div>
              <div v-else-if="scope.row.type==='单行文字'">
              </div>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="OnDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-button type="primary" @click="OnCreatedClicked">创建</el-button>
    </div>
    

  </div>
</template>

<script>
import SelectEmployee from '@/components/SelectEmployee/index.vue'
import { storePoll } from '@/api/poll'
export default {
  name: 'uploadExcel',
  components: { SelectEmployee },
  props: {
    propPropertyData: Array
  },
  data() {
    return {
      id: 0,
      insertAfterName: '', // 在某一行之后新增
      insertName: '',
      typeOptions: ['数字', '多项选择', '单项选择', '单行文字'],
      propertyData: this.propPropertyData === undefined ? [] : this.propPropertyData,
      request_data: {
        poll: {
          name: '',
          due_day: '',
          is_multiple: false,
          range: []
        },
        poll_column: []
      },
      rules: {
        name: [
          { required: true, message: '请输入表单名称', trigger: 'blur' }
        ],
        due_day: [
          { required: true,
            trigger: 'change',
            validator(rule, val, cb) {
              if (val === '') {
                cb(new Error('请选择截止日期'))
              } else if (new Date(val) < new Date()) {
                cb(new Error('截止日期必须大于当前时间'))
              } else {
                cb()
              }
            } }
        ],
        range: [
          {
            required: true,
            trigger: 'change',
            validator(rule, val, cb) {
              if (val.length === 0) {
                cb(new Error('请选择表单使用范围'))
              } else {
                cb()
              }
            }
          }
        ]
      }

    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    // 有效值tag  start
    handleClose(tag, row) {
      row.valid_value.splice(row.valid_value.indexOf(tag), 1)
    },

    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs[row.name].$refs.input.focus()
      })
    },

    handleInputConfirm(row) {
      const inputValue = row.inputValue
      if (inputValue) {
        row.valid_value.push(inputValue)
      }
      row.inputVisible = false
      row.inputValue = ''
    },
    // 有效值tag  end
    OnCreatedClicked() {
      this.$refs['request_data_form'].validate((valid) => {
        if (valid) {
          this.request_data.poll_column = this.propertyData
          storePoll(this.request_data).then(response => {
            this.$router.push('/dashboard/poll')
            this.$notify({
              title: '创建成功',
              message: '请通知同事填写表单',
              type: 'success',
              duration: 2000
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    OnRangeChange(args) {
      this.request_data.poll.range = args
    },
    OnDelete(row) {
      for (const v of this.propertyData) {
        if (v === row) {
          const index = this.propertyData.indexOf(v)
          this.propertyData.splice(index, 1)
          break
        }
      }
    },
    OnInsert() {
      if (this.propertyData.length === 0) {
        const value = {
          name: this.insertName === '' ? '新增字段' + (++this.id).toString() : this.insertName,
          type: '数字',
          valid_value: [],
          inputValue: '',
          inputVisible: false
        }
        this.propertyData.push(value)
        return
      }
      for (const v of this.propertyData) {
        if (v.name === this.insertAfterName) {
          const index = this.propertyData.indexOf(v)
          const value = {
            name: this.insertName === '' ? '新增字段' + (++this.id).toString() : this.insertName,
            type: '数字',
            valid_value: [],
            inputValue: '',
            inputVisible: false
          }
          this.propertyData.splice(index + 1, 0, value)
          break
        }
      }
    }

  }
}
</script>
