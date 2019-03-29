import request from '@/utils/request'


export function indexEmployee(query) {
  return request({
    url: 'employee',
    method: 'get',
    params: query
  })
}

export function showEmployee(id) {
  return request({
    url:'employee/'+ id,
    method: 'get'
  })
}

export function storeEmployee(data) {
  return request({
    url: 'employee',
    method: 'post',
    data
  })
}

export function updateEmployee(data) {
  return request({
    url: 'employee/'+data.id,
    method: 'put',
    data
  })
}

export function destroyEmployee(id) {
  return request({
    url: 'employee/'+id,
    method: 'delete'
  })
}

