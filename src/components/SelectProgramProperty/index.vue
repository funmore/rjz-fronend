<template>
                <ele-multi-cascader
                    :options="propList"
                    placeholder="请选择范围"
                    @change="ispChange"
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
</template>

<script>


export default {
  name: 'select-program-property',
  props:{
    propList:Array,
    propSeparator:String
  },


   methods: {
    ispChange(values, items) {
      let trim_values=values.filter(x=>x.includes(this.propSeparator))
      let trim_items =items.filter(x=>(x.key!='programBasic')
                                        &&(x.key!='contact')
                                        &&(x.key!='softwareInfoCol')
                                        &&(x.key!='workflow')
                                        &&(x.key!='programTeamRole'))
      let treeData={keyPathArr:trim_values,objArr:trim_items}
      // var key_list=values.filter(x=>x.includes('/')).map(x=>x.slice(x.indexOf('/')+1));
      // let kv_list=key_list.map(x=>{var ret=this.getNodeBykey(this.propList,x); return ret});
      this.$emit('rangeChange',treeData);
    },
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


