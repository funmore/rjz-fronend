import request from '@/utils/request'

export function indexNoTestWork(query) {
  return request({
    url: 'notestwork',
    method: 'get',
    params: query
  })
}
export function indexNoTestWorkLogMonth(query) {
  return request({
    url: 'notestworklogmonth',
    method: 'get',
    params: query
  })
}

export function showNoTestWork(id) {
  return request({
    url: 'notestwork/' + id,
    method: 'get'
  })
}

export function storeNoTestWork(data) {
  return request({
    url: 'notestwork',
    method: 'post',
    data
  })
}

export function updateNoTestWork(data) {
  return request({
    url: 'notestwork/' + data.id,
    method: 'put',
    data
  })
}

export function destroyNoTestWork(id) {
  return request({
    url: 'notestwork/' + id,
    method: 'delete'
  })
}
