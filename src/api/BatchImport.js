import request from '@/utils/request'

export function indexBatchImport(query) {
  return request({
    url: '/BatchImport',
    method: 'get',
    params: query
  })
}

export function showBatchImport(id) {
  return request({
    url: '/BatchImport/' + id,
    method: 'get'
  })
}

export function storeBatchImport(data) {
  return request({
    url: '/BatchImport',
    method: 'post',
    data
  })
}

export function updateBatchImport(data) {
  return request({
    url: '/BatchImport/' + data.id,
    method: 'put',
    data
  })
}

export function destroyBatchImport(id) {
  return request({
    url: '/BatchImport/' + id,
    method: 'delete'
  })
}

