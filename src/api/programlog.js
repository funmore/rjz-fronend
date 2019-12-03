import request from '@/utils/request'

export function indexProgramLog(query) {
  return request({
    url: 'programlog',
    method: 'get',
    params: query
  })
}

export function showProgramLog(id) {
  return request({
    url: 'programlog/' + id,
    method: 'get'
  })
}

export function storeProgramLog(data) {
  return request({
    url: 'programlog',
    method: 'post',
    data
  })
}

export function updateProgramLog(data) {
  return request({
    url: 'programlog/' + data.id,
    method: 'put',
    data
  })
}

export function destroyProgramLog(id) {
  return request({
    url: 'programlog/' + id,
    method: 'delete'
  })
}
