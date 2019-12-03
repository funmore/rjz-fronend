import request from '@/utils/request'

export function indexManagementContract(query) {
  return request({
    url: '/management/programs',
    method: 'get',
    params: query
  })
}

export function showManagementContract(id) {
  return request({
    url: '/management/programs/' + id,
    method: 'get'
  })
}

export function storeManagementContract(data) {
  return request({
    url: '/management/programs',
    method: 'post',
    data
  })
}

export function updateManagementContract(data) {
  return request({
    url: '/management/programs/' + data.id,
    method: 'put',
    data
  })
}

export function destroyManagementContract(id) {
  return request({
    url: '/management/programs/' + id,
    method: 'delete'
  })
}
