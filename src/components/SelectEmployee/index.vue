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
  import { indexEmployee } from '@/api/employee'


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
      id_list:this.propIdList,

      form: {
          isp: []
      }
    }
  },
  mounted(){
    this.getLists();
  },
   methods: {
    getLists(){
      var listQuery={
          checkForSelect:true
        }
      indexEmployee(listQuery).then(response => {
        var data=response.data
        this.rawList = Object.values(data.items)
        //获取一级分组
        var uniqueTeam=this.rawList.map((value,index,self)=>{
          var arr=self.map(x=>x.team.id);
          if(arr.indexOf(value.team.id)===index){
            return value.team
          }
        }).filter(x=>x!==undefined)

        this.list=uniqueTeam.map(x=>{
          let children=this.rawList.filter(value=>value.team.id===x.id).map(x=>{return {id:x.id,name:x.name,children:null};})
          x.children=children
          return x;
        })

        var a=1;

      })
    },
    ispChange(values, items) {
      this.id_list=values.filter(x=>x.includes('/')).map(x=>x.slice(x.indexOf('/')+1));
      this.$emit('rangeChange',this.id_list);
    }
  }

}
</script>

<style scoped>
</style>


