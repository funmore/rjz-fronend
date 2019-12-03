import request from '@/utils/request'

export function indexManagementEmployees(query) {
  return request({
    url: '/management/programs',
    method: 'get',
    params: query
  })
}

export function showManagementEmployees(id) {
  return request({
    url: '/management/programs/' + id,
    method: 'get'
  })
}

export function storeManagementEmployees(data) {
  return request({
    url: '/management/programs',
    method: 'post',
    data
  })
}

export function updateManagementEmployees(data) {
  return request({
    url: '/management/programs/' + data.id,
    method: 'put',
    data
  })
}

export function destroyManagementEmployees(id) {
  return request({
    url: '/management/programs/' + id,
    method: 'delete'
  })
}
