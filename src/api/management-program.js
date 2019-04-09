import request from '@/utils/request'


export function indexManagementProgram(query) {
  return request({
    url: '/management/program',
    method: 'get',
    params: query
  })
}

export function showManagementProgram(id) {
  return request({
    url:'/management/program/'+ id,
    method: 'get'
  })
}

export function storeManagementProgram(data) {
  return request({
    url: '/management/program',
    method: 'post',
    data
  })
}

export function updateManagementProgram(data) {
  return request({
    url: '/management/program/'+data.id,
    method: 'put',
    data
  })
}

export function destroyManagementProgram(id) {
  return request({
    url: '/management/program/'+id,
    method: 'delete'
  })
}


