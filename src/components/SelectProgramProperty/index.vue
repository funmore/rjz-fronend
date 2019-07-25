<template>
              <el-form-item :label="propLabel" :prop="propProp">
                <ele-multi-cascader
                    :options="list"
                    v-model="form.isp"
                    placeholder="请选择范围"
                    @change="ispChange"
                    ref="cascader"
                    show-all-levels
                    output-level-value
                    selectChildren
                    labelKey="name"
                    valueKey="id"
                    childrenKey="children"
                    :panelWidth="'auto'"
                  >
                </ele-multi-cascader>
                </el-form-item>
</template>

<script>


export default {
  name: 'select-employee',
  props:{
    propIdList:Array,
    propLabel:String,
    propProp:String
  },
  data() {
    return {
      rawList:[],
      list: [
        ],
      // id_list:this.propIdList,

      form: {
          isp: []
      }
    }
  },
  mounted(){
    this.getLists();
  },
   methods: {
    ispChange(values, items) {
      // this.id_list=
      values.filter(x=>x.includes('/')).map(x=>x.slice(x.indexOf('/')+1));
      this.$emit('rangeChange',this.id_list);
    }
  }

}
</script>

<style scoped>
</style>


