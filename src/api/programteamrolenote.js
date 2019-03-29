import request from '@/utils/request'


export function indexProgramTeamRoleNote(query) {
  return request({
    url: 'programteamrolenote',
    method: 'get',
    params: query
  })
}

export function showProgramTeamRoleNote(id) {
  return request({
    url:'programteamroleNote/'+ id,
    method: 'get'
  })
}

export function storeProgramTeamRoleNote(data) {
  return request({
    url: 'programteamrolenote',
    method: 'post',
    data
  })
}

export function updateProgramTeamRoleNote(data) {
  return request({
    url: 'programteamrolenote/'+data.id,
    method: 'put',
    data
  })
}

export function destroyProgramTeamRoleNote(id) {
  return request({
    url: 'programteamrolenote/'+id,
    method: 'delete'
  })
}
