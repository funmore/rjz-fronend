<template>
  <div class="mixin-components-container">
<!--       <dynamic-form></dynamic-form>
 -->      <el-form  ref="pollfill"  :model="request_data" label123456781-position="left" label-width="100px" style='width: 600px; ' >
          <el-form-item label="表单名称" prop="name">
          <span>{{model.name}}</span>
        </el-form-item>



        <el-form-item   :key="item.name" v-for="(item,index) in model.pollColumn" :label="item.name" >
            <el-input-number 
            v-if="item.type==='数字'"
            v-model="request_data[item.id]"
            @input="handleInput($event, item.id)"
            v-bind="item"  
            :min="item.min"
            :max="item.max"
            label="描述文字"></el-input-number>


          <el-select 
              v-else-if="item.type==='单项选择'"
              v-model="request_data[item.id]" 
              @change="handleOneChange($event, item.id)"
              placeholder="请选择">
            <el-option
              v-for="(valid_item,valid_index) in item.valid_value"
              :key="valid_index"
              :label="valid_item"
              :value="valid_item">
            </el-option>
          </el-select>




            <el-checkbox-group 
                  v-else-if="item.type=='多项选择'"
                  @change="handleMutiChange($event, item.id)"
                  v-model="request_data[item.id]"
                  :min="1"
                  :max="item.length">
                  <el-checkbox 
                   v-for="(valid_item,valid_index) in item.valid_value" 
                  :label="valid_item" :key="valid_index">
                  {{valid_item}}
                   </el-checkbox>
            </el-checkbox-group>
            
          <div v-else>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="program.name"></el-input>
          </div>
        </el-form-item>

        <el-form-item   label="操作" >
          <el-button type="primary"  v-waves icon="el-icon-view" @click="OnPost">提交</el-button>
        </el-form-item>


      </el-form>


    </el-row>

      <el-dialog title="选择创建表单类型" :visible.sync="visible"  >
          <el-row class="tac">
            <el-col :span="12" >
              <router-link :to="'/setting/poll/imports'"> 
                <el-button type="primary" class="button" id="left" >创建空白表单</el-button>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link :to="'/setting/poll/imports'"> 
                <el-button type="success" class="button" id="right" >从Excel创建表单</el-button>
              </router-link>
            </el-col>

          </el-row>
      </el-dialog>
  </div>
</template>

<script>

import waves from '@/directive/waves/index.js' // 水波纹指令
import { showPoll } from '@/api/poll'
import { indexPollFill, showPollFill, storePollFill, updatePollFill,
destroyPollFill } from '@/api/pollfill'

export default {
  name: 'componentMixin-demo',
  components: {
  },
  directives: {
    waves
  },
  data() {
    return {
      visible:false,
      model:{},
      listLoading:false,
      request_data:{},
      id:null,


    }
  },
  created(){
      this.id = this.$route.params && this.$route.params.id
      this.getModel(this.id);
  },
  methods:{
    getModel(id){
      showPoll(id).then(response => {
        var data=response.data
        if(data.total!=0){
          this.model = data.items;
        }
        this.Init();
      })
    },
    Init(){
      this.model.pollColumn.forEach((value,index)=>{
        
        if(value.type=='数字'){
          value.max=parseInt(value.valid_value.split("|")[1]);
          value.min=parseInt(value.valid_value.split("|")[0]);
          this.request_data[value.id]=value.min;
        }else if(value.type=='单项选择'){
          value.valid_value=value.valid_value.split('|')
          this.request_data[value.id]=value.valid_value[0]
        }else if(value.type=='多项选择'){
          value.valid_value=value.valid_value.split('|')
          this.request_data[value.id]=value.valid_value[0];
        }
      });
     },
    handleInput(val, key) {
      this.request_data[key]=val;
    this.$forceUpdate(); 
    },
    handleOneChange(val,key){
      this.request_data[key]=val;
      this.$forceUpdate(); 
     },
    handleMutiChange(val,key){
      this.$forceUpdate(); 
     },
     OnPost(){
      var request_data={
        poll_id:this.id,
        poll_value:this.request_data
      }
      storePollFill(request_data).then(response => {
        var data=response.data
        if(data.is_okay==true){
          this.$router.push('/setting/poll') 
          this.$notify({
                title: '填写成功',
                message: '已成功填写',
                type: 'success',
                duration: 2000
              })
        }
      })
     }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}

.button{
  height: 200px;
  width: 200px;
  margin: 1px
}
#left{
  float:right;
}
#right{
  float:left;
}


</style>
