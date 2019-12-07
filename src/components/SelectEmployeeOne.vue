<template>
  <span >
    <el-cascader
    v-model="employee_id"
    :options="list"
    @change="handleChange"></el-cascader>


  </span>
</template>

<script>
  import { indexEmployee } from '@/api/employee'

export default {
    name: 'select-employee-one',
    props: {
      propEmployeeId: Number,
      propRawList: Array
    },
    data() {
      return {
        list: [
        ],
        employee_id: this.propEmployeeId
      }
    },
    mounted() {
      this.getLists()
    },
    methods: {
      computeList(rawList) {
        // 获取一级分组
        var uniqueTeam = rawList.map((value, index, self) => {
          var arr = self.map(x => x.team.id)
          if (arr.indexOf(value.team.id) === index) {
            const t = value.team
            return { value: t.id, label: t.name }
          }
        }).filter(x => x !== undefined)

        this.list = uniqueTeam.map(x => {
          var children = rawList.filter(temp => temp.team.id === x.value)
            .map(x => { return { value: x.id, label: x.name, children: null } })
            .sort((x, y) => {
              if (x.label.length !== 0 && y.label.length !== 0) { return x.label[0].localeCompare(y.label[0], 'zh-CN') }
            })
          x.children = children
          return x
        })
      },
      getLists() {
        // 如果propRawList通过prop 发送了过来
        if (this.propRawList != null) {
          var rawList = this.propRawList
          this.computeList(rawList)
        } else {
          var listQuery = {
            checkForSelect: true
          }
          indexEmployee(listQuery).then(response => {
            var data = response.data
            var rawList = Object.values(data.items)
            this.computeList(rawList)
          })
        }
      },
      handleChange(path) {
        const employee_id = path[path.length - 1]
        console.log(employee_id)
        this.$emit('onHandleChange', employee_id)
      }
    }

}
</script>

