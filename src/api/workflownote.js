import request from '@/utils/request'


export function indexWorkflowNote(query) {
  return request({
    url: 'workflownote',
    method: 'get',
    params: query
  })
}

export function showWorkflowNote(id) {
  return request({
    url:'workflownote/'+ id,
    method: 'get'
  })
}

export function storeWorkflowNote(data) {
  return request({
    url: 'workflownote',
    method: 'post',
    data
  })
}

export function updateWorkflowNote(data) {
  return request({
    url: 'workflownote/'+data.id,
    method: 'put',
    data
  })
}

export function destroyWorkflowNote(id) {
  return request({
    url: 'workflownote/'+id,
    method: 'delete'
  })
}
