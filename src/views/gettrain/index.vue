<template>
  <div class="components-container">
    <el-button  @click="getTrain">获取火车票</el-button>
  </div>
</template>

<script>
import { indexTrainTickets } from '@/api/getTrainTickets'


export default {
  name: 'testCaseGen',
  data() {

   

    return {


    }
  },
  created() {

  },

   methods: {
    getTrain(){
      //leftTicketDTO.train_date=2019-05-04&leftTicketDTO.from_station=XTP&leftTicketDTO.to_station=BJP&purpose_codes=ADULT
      var leftTicketDTO={
        train_date:'2019-05-04',
           from_station:'XTP',
           to_station:'BJP'
         };
      var query={
        leftTicketDTO:leftTicketDTO,
        purpose_codes:'ADULT'
      }
      indexTrainTickets(query).then(response => {
        var data=response.data
        this.list = Object.values(data.items)
        this.total = data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })


    }
   
  }

}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
.raw{
  float:left;
  margin-right: 100px;
}

.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>


