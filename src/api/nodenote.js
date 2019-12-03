import request from '@/utils/request'

export function indexNodeNote(query) {
  return request({
    url: 'nodenote',
    method: 'get',
    params: query
  })
}

export function showNodeNote(id) {
  return request({
    url: 'nodenote/' + id,
    method: 'get'
  })
}

export function storeNodeNote(data) {
  return request({
    url: 'nodenote',
    method: 'post',
    data
  })
}

export function updateNodeNote(data) {
  return request({
    url: 'nodenote/' + data.id,
    method: 'put',
    data
  })
}

export function destroyNodeNote(id) {
  return request({
    url: 'nodenote/' + id,
    method: 'delete'
  })
}
