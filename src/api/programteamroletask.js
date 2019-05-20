import request from '@/utils/request'


export function indexProgramTeamRoleTask(query) {
  return request({
    url: 'programteamroletask',
    method: 'get',
    params: query
  })
}

export function showProgramTeamRoleTask(id) {
  return request({
    url:'programteamroletask/'+ id,
    method: 'get'
  })
}

export function storeProgramTeamRoleTask(data) {
  return request({
    url: 'programteamroletask',
    method: 'post',
    data
  })
}

export function updateProgramTeamRoleTask(data) {
  return request({
    url: 'programteamroletask/'+data.id,
    method: 'put',
    data
  })
}

export function destroyProgramTeamRoleTask(id) {
  return request({
    url: 'programteamroletask/'+id,
    method: 'delete'
  })
}
