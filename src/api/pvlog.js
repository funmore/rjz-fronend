import request from '@/utils/request'


export function indexPvlog(query) {
  return request({
    url: 'pvlog',
    method: 'get',
    params: query
  })
}

export function showPvlog(id) {
  return request({
    url:'pvlog/'+ id,
    method: 'get'
  })
}

export function storePvlog(data) {
  return request({
    url: 'pvlog',
    method: 'post',
    data
  })
}

export function updatePvlog(data) {
  return request({
    url: 'pvlog/'+data.id,
    method: 'put',
    data
  })
}

export function destroyPvlog(id) {
  return request({
    url: 'pvlog/'+id,
    method: 'delete'
  })
}
