import request from '@/utils/request'

export function indexFavor(query) {
  return request({
    url: 'favor',
    method: 'get',
    params: query
  })
}

export function showFavor(id) {
  return request({
    url: 'favor/' + id,
    method: 'get'
  })
}

export function storeFavor(data) {
  return request({
    url: 'favor',
    method: 'post',
    data
  })
}

export function updateFavor(data) {
  return request({
    url: 'favor/' + data.id,
    method: 'put',
    data
  })
}

export function destroyFavor(id) {
  return request({
    url: 'favor/' + id,
    method: 'delete'
  })
}
