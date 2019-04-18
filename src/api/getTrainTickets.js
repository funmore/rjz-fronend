import request from '@/utils/request'


export function indexTrainTickets(query) {
  return request({
    url: 'https://kyfw.12306.cn/otn/leftTicket/query',
    method: 'get',
    params: query
  })
}
