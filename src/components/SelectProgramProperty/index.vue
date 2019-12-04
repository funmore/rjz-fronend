<template>
<div>
                <ele-multi-cascader
                    :options="propList"
                    placeholder="请选择范围"
                    @change="ispChange"
                    v-model="value"
                    ref="cascader"
                    show-all-levels
                    output-level-value
                    selectChildren
                    :separator="propSeparator"
                    labelKey="name"
                    valueKey="key"
                    childrenKey="children"
                    :panelWidth="'auto'"
                  >
                </ele-multi-cascader>

</div>
</template>

<script>

export default {
  name: 'select-program-property',
  props: {
    propList: Array,
    propSeparator: String,
    propValue: Array
  },
  data() {
    return {
      value: this.propValue
    }
  },
  watch: {
    propValue: function(newVa, oldVa) {
      this.value = newVa
    }
  },
  methods: {
    ispChange(values, items) {
      const treeData = { values: values, items: items }
      this.$emit('rangeChange', treeData)
    }
    // getNodeBykey(tree,key){
    //     var ret=null
    //     for(let i=0;i<tree.length;i++){
    //       if(tree[i].key==key){
    //         tree[i].children=null;
    //         ret=tree[i];
    //         break;
    //       }else if(tree[i].children!=null){
    //         ret=this.getNodeBykey(tree[i].children,key)
    //         if(ret!=null) break;
    //       }
    //     }
    //     return ret
    // },
  }

}
</script>

<style scoped>
</style>


