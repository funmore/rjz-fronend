import request from '@/utils/request'
export function indexFileReview(query) {
  return request({
    url: 'filereview',
    method: 'get',
    params: query
  })
}

export function showFileReview(id) {
  return request({
    url: 'filereview/' + id,
    method: 'get',
    responseType: 'arraybuffer'

  })
}

export function storeFileReview(data) {
  const formData = jsonToFormData(data)
  return request({
    url: 'filereview',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}

export function updateFileReview(data) {
  const id = data.id
  const formData = jsonToFormData(data)
  return request({
    url: 'filereview/' + data.id,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}

export function destroyFileReview(id) {
  return request({
    url: 'filereview/' + id,
    method: 'delete'
  })
}

/*
* 将json对象转成FormData对象
* 只支持对象，暂不支持数组和多层嵌套。
*/
function jsonToFormData(json) {
  if (Array.isArray(json)) throw new Error('jsonToFormData dont support Array')
  const formData = new FormData()
  for (const x in json) {
    if (Array.isArray(json[x])) {
      json[x].forEach(val => formData.append(`${x}`, val))
    } else {
      formData.append(`${x}`, json[x])
    }
  }
  return formData
}

// export default {
//   uploadOrderHandleTaskAPI: upload('www.baidu.com'),
// }
