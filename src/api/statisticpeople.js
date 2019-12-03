import request from '@/utils/request'

export function indexStatisticPeople(query) {
  return request({
    url: '/statistic/people',
    method: 'get',
    params: query
  })
}

export function showStatisticPeople(id) {
  return request({
    url: '/statistic/people/' + id,
    method: 'get'
  })
}
export function showPeopleTask(query) {
  return request({
    url: '/statistic/people/task',
    method: 'get',
    params: query
  })
}

export function storeStatisticPeople(data) {
  return request({
    url: '/statistic/people',
    method: 'post',
    data
  })
}

export function updateStatisticPeople(data) {
  return request({
    url: '/statistic/people/' + data.id,
    method: 'put',
    data
  })
}

export function destroyStatisticPeople(id) {
  return request({
    url: '/statistic/people/' + id,
    method: 'delete'
  })
}

