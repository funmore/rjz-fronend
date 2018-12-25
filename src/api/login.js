import request from '@/utils/request'


export function getInfo(token,t,s) {
  return request({
    url: '/api/employee/getInfo',
    method: 'get',
    params: { token,t,s }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get',
    params: {}
  })
}

export function login(name,password) {
  return request({
    url: '/api/login',
    method: 'get',
    params: { name,password }
  })

}