import request from '@/utils/request'


export function indexProgram(query) {
  return request({
    url: 'program',
    method: 'get',
    params: query
  })
}

export function showProgram(id) {
  return request({
    url:'program/'+ id,
    method: 'get'
  })
}
export function roleProgram(id) {
  return request({
    url:'program/role/'+ id,
    method: 'get'
  })
}
export function teamProgram(id){
  return request({
    url:'program/team/'+id,
    method: 'get'
  })
}

export function storeProgram(data) {
  return request({
    url: 'program',
    method: 'post',
    data
  })
}

export function updateProgram(data) {
  return request({
    url: 'program/'+data.id,
    method: 'put',
    data
  })
}

export function destroyProgram(id) {
  return request({
    url: 'program/'+id,
    method: 'delete'
  })
}
