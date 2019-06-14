import request from '@/utils/request'


export function indexPollFill(query) {
  return request({
    url: 'pollfill',
    method: 'get',
    params: query
  })
}

export function showPollFill(id) {
  return request({
    url: 'pollfill/'+ id,
    method: 'get'
  })
}

export function storePollFill(data) {
  return request({
    url: 'pollfill',
    method: 'post',
    data
  })
}

export function updatePollFill(data) {
  return request({
    url: 'pollfill/'+data.id,
    method: 'put',
    data
  })
}

export function destroyPollFill(id) {
  return request({
    url: 'pollfill/'+id,
    method: 'delete'
  })
}