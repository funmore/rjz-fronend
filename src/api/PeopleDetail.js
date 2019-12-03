import request from '@/utils/request'

export function indexPeopleDetail(query) {
  return request({
    url: '/peopledetail',
    method: 'get',
    params: query
  })
}

export function showPeopleDetail(id) {
  return request({
    url: '/peopledetail/' + id,
    method: 'get'
  })
}

export function storePeopleDetail(data) {
  return request({
    url: '/peopledetail',
    method: 'post',
    data
  })
}

export function updatePeopleDetail(data) {
  return request({
    url: '/peopledetail/' + data.id,
    method: 'put',
    data
  })
}

export function destroyPeopleDetail(id) {
  return request({
    url: '/peopledetail/' + id,
    method: 'delete'
  })
}

