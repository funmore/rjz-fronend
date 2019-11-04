import request from '@/utils/request'


export function indexNode(query) {
  return request({
    url: 'node',
    method: 'get',
    params: query
  })
}

export function showNode(id) {
  return request({
    url:'node/'+ id,
    method: 'get'
  })
}

export function storeNode(data) {
  return request({
    url: 'node',
    method: 'post',
    data
  })
}

export function updateNode(data) {
  return request({
    url: 'node/'+data.id,
    method: 'put',
    data
  })
}

export function destroyNode(id) {
  return request({
    url: 'node/'+id,
    method: 'delete'
  })
}
