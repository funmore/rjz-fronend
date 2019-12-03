import request from '@/utils/request'

export function indexDelayApply(query) {
  return request({
    url: 'delayapply',
    method: 'get',
    params: query
  })
}

export function showDelayApply(id) {
  return request({
    url: 'delayApply/' + id,
    method: 'get'
  })
}

export function storeDelayApply(data) {
  return request({
    url: 'delayapply',
    method: 'post',
    data
  })
}

export function updateDelayApply(data) {
  return request({
    url: 'delayapply/' + data.id,
    method: 'put',
    data
  })
}

export function destroyDelayApply(id) {
  return request({
    url: 'delayapply/' + id,
    method: 'delete'
  })
}
