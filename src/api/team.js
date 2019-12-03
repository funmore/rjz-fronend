import request from '@/utils/request'

export function indexTeam(query) {
  return request({
    url: 'Team',
    method: 'get',
    params: query
  })
}

export function showTeam(id) {
  return request({
    url: 'Team/' + id,
    method: 'get'
  })
}

export function storeTeam(data) {
  return request({
    url: 'Team',
    method: 'post',
    data
  })
}

export function updateTeam(data) {
  return request({
    url: 'Team/' + data.id,
    method: 'put',
    data
  })
}

export function destroyTeam(id) {
  return request({
    url: 'Team/' + id,
    method: 'delete'
  })
}
