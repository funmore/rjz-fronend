import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/management/programs/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/management/programs/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/management/programs/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/management/programs/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/management/programs/update',
    method: 'post',
    data
  })
}

export function fetchManagementEmployeesList(query){
  return request({
    url:'/management/employees/list',
    method:'get',
    params:query
  })
}
