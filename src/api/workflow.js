import request from '@/utils/request'

export function fetchWorkflowList(query) {
  return request({
    url: '/management/programs/workflow/fetchlist',
    method: 'get',
    params: query
  })
}

export function fetchWorkflow(id) {
  return request({
    url: '/management/programs/workflow/fetch',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/management/programs/workflow/pv',
    method: 'get',
    params: { pv }
  })
}

export function createWorkflow(data) {
  return request({
    url: '/management/programs/workflow/create',
    method: 'post',
    data
  })
}

export function updateWorkflow(data) {
  return request({
    url: '/management/programs/workflow/update',
    method: 'post',
    data
  })
}

