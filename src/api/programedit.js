import request from '@/utils/request'

export function indexProgramEdit(query) {
  return request({
    url: 'programedit',
    method: 'get',
    params: query
  })
}
export function indexCustomProgram(query) {
  return request({
    url: 'customprogramedit',
    method: 'get',
    params: query
  })
}

export function showProgramEdit(id) {
  return request({
    url: 'programedit/' + id,
    method: 'get'
  })
}

export function storeProgramEdit(data) {
  return request({
    url: 'programedit',
    method: 'post',
    data
  })
}

export function updateProgramEdit(data) {
  return request({
    url: 'programedit/' + data.id,
    method: 'put',
    data
  })
}

export function destroyProgramEdit(id) {
  return request({
    url: 'programedit/' + id,
    method: 'delete'
  })
}

