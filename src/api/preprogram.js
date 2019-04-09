import request from '@/utils/request'


export function indexPreProgram(query) {
  return request({
    url: '/pre/program',
    method: 'get',
    params: query
  })
}

export function showPreProgram(id) {
  return request({
    url:'/pre/program/'+ id,
    method: 'get'
  })
}

export function storePreProgram(data) {
  return request({
    url: '/pre/program',
    method: 'post',
    data
  })
}

export function updatePreProgram(data) {
  return request({
    url: '/pre/program/'+data.id,
    method: 'put',
    data
  })
}

export function destroyPreProgram(id) {
  return request({
    url: '/pre/program/'+id,
    method: 'delete'
  })
}


