import request from '@/utils/request'


export function indexModel(query) {
  return request({
    url: 'model',
    method: 'get',
    params: query
  })
}

export function showModel(id) {
  return request({
    url: 'model/'+ id,
    method: 'get'
  })
}

export function storeModel(data) {
  return request({
    url: 'model',
    method: 'post',
    data
  })
}

export function updateModel(data) {
  return request({
    url: 'model/'+data.id,
    method: 'put',
    data
  })
}

export function destroyModel(id) {
  return request({
    url: 'model/'+id,
    method: 'delete'
  })
}