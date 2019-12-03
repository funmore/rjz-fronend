import request from '@/utils/request'

export function indexPoll(query) {
  return request({
    url: 'poll',
    method: 'get',
    params: query
  })
}

export function showPoll(id) {
  return request({
    url: 'poll/' + id,
    method: 'get'
  })
}
export function showUnPollPeople(id) {
  return request({
    url: 'showUnPollPeople/' + id,
    method: 'get'
  })
}

export function storePoll(data) {
  return request({
    url: 'poll',
    method: 'post',
    data
  })
}

export function updatePoll(data) {
  return request({
    url: 'poll/' + data.id,
    method: 'put',
    data
  })
}

export function destroyPoll(id) {
  return request({
    url: 'poll/' + id,
    method: 'delete'
  })
}
