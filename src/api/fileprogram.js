import request from '@/utils/request'
export function indexFileProgram(query) {
  return request({
    url: 'fileprogram',
    method: 'get',
    params: query
  })
}

export function showFileProgram(id) {
  return request({
    url:'fileprogram/'+ id,
    method: 'get',
    responseType: 'arraybuffer'

  })
}

export function storeFileProgram(data) {
  const formData = jsonToFormData(data);
  return request({
    url: 'fileprogram',
    method: 'post',
    headers:{'Content-Type': 'multipart/form-data'},
    data:formData
  })
}

export function updateFileProgram(data) {
  return request({
    url: 'fileprogram/'+data.id,
    method: 'put',
    data
  })
}

export function destroyFileProgram(id) {
  return request({
    url: 'fileprogram/'+id,
    method: 'delete'
  })
}



/*
* 将json对象转成FormData对象
* 只支持对象，暂不支持数组和多层嵌套。
*/
function jsonToFormData(json) {
  if (Array.isArray(json)) throw new Error('jsonToFormData dont support Array');
  let formData = new FormData();
  for (let x in json) {
    if (Array.isArray(json[x])) {
      json[x].forEach(val => formData.append(`${x}`, val));
    } else {
      formData.append(`${x}`, json[x]);
    }
  }
  return formData;
}

// export default {
//   uploadOrderHandleTaskAPI: upload('www.baidu.com'),
// }