import request from '@/utils/request'


export function indexSoftwareInfo(query) {
  return request({
    url: 'softwareinfo',
    method: 'get',
    params: query
  })
}

export function showSoftwareInfo(id) {
  return request({
    url:'softwareinfo/'+ id,
    method: 'get'
  })
}

export function storeSoftwareInfo(data) {
  return request({
    url: 'softwareinfo',
    method: 'post',
    data
  })
}

export function updateSoftwareInfo(data) {
  return request({
    url: 'softwareinfo/'+data.id,
    method: 'put',
    data
  })
}

export function destroySoftwareInfo(id) {
  return request({
    url: 'softwareinfo/'+id,
    method: 'delete'
  })
}
