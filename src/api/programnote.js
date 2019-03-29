import request from '@/utils/request'


export function indexProgramNote(query) {
  return request({
    url: 'programnote',
    method: 'get',
    params: query
  })
}

export function showProgramNote(id) {
  return request({
    url:'programNote/'+ id,
    method: 'get'
  })
}

export function storeProgramNote(data) {
  return request({
    url: 'programnote',
    method: 'post',
    data
  })
}

export function updateProgramNote(data) {
  return request({
    url: 'programnote/'+data.id,
    method: 'put',
    data
  })
}

export function destroyProgramNote(id) {
  return request({
    url: 'programnote/'+id,
    method: 'delete'
  })
}
