import request from '@/utils/request'


export function indexDailyNote(query) {
  return request({
    url: 'dailynote',
    method: 'get',
    params: query
  })
}

export function showDailyNote(id) {
  return request({
    url:'dailynote/'+ id,
    method: 'get'
  })
}

export function storeDailyNote(data) {
  return request({
    url: 'dailynote',
    method: 'post',
    data
  })
}

export function updateDailyNote(data) {
  return request({
    url: 'dailynote/'+data.id,
    method: 'put',
    data
  })
}

export function destroyDailyNote(id) {
  return request({
    url: 'dailynote/'+id,
    method: 'delete'
  })
}
