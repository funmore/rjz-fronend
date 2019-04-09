import request from '@/utils/request'


export function indexContact(query) {
  return request({
    url: 'contact',
    method: 'get',
    params: query
  })
}

export function showContact(id) {
  return request({
    url:'contact/'+ id,
    method: 'get'
  })
}

export function storeContact(data) {
  return request({
    url: 'contact',
    method: 'post',
    data
  })
}

export function updateContact(data) {
  return request({
    url: 'contact/'+data.id,
    method: 'put',
    data
  })
}

export function destroyContact(id) {
  return request({
    url: 'contact/'+id,
    method: 'delete'
  })
}
