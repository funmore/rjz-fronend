import request from '@/utils/request'

export function indexWorkflow(query) {
  return request({
    url: 'workflow',
    method: 'get',
    params: query
  })
}

export function showWorkflow(id) {
  return request({
    url: 'workflow/' + id,
    method: 'get'
  })
}

export function storeWorkflow(data) {
  return request({
    url: 'workflow',
    method: 'post',
    data
  })
}

export function updateWorkflow(data) {
  return request({
    url: 'workflow/' + data.id,
    method: 'put',
    data
  })
}

export function destroyWorkflow(id) {
  return request({
    url: 'workflow/' + id,
    method: 'delete'
  })
}
