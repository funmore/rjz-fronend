import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/management/programs/memberinfo/list',
    method: 'get',
    params: query
  })
}

export function fetchMemberInfo(id) {
  return request({
    url: '/management/programs/memberinfo/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/management/programs/memberinfo/pv',
    method: 'get',
    params: { pv }
  })
}

export function createMemberInfo(data) {
  return request({
    url: '/management/programs/memberinfo/create',
    method: 'post',
    data
  })
}

export function updateMemberInfo(data) {
  return request({
    url: '/management/programs/memberinfo/update',
    method: 'post',
    data
  })
}

