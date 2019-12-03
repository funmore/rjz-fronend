import request from '@/utils/request'

export function indexProgramTeamRole(query) {
  return request({
    url: 'programteamrole',
    method: 'get',
    params: query
  })
}

export function showProgramTeamRole(id) {
  return request({
    url: 'programteamrole/' + id,
    method: 'get'
  })
}

export function storeProgramTeamRole(data) {
  return request({
    url: 'programteamrole',
    method: 'post',
    data
  })
}

export function updateProgramTeamRole(data) {
  return request({
    url: 'programteamrole/' + data.id,
    method: 'put',
    data
  })
}

export function destroyProgramTeamRole(id) {
  return request({
    url: 'programteamrole/' + id,
    method: 'delete'
  })
}
