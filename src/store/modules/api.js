
function API(url, params, method = 'post', configs) {
  // 开启全局loading
  store.commit('SHOW_PAGE_LOADING');

  return new Promise(resolve, reject) => {
    let ajx;
    axios[method](url, params, configs);
    ajx.then(res => {
      store.commit('HIDE_PAGE_LOADING');
      // 统一处理返回逻辑
      // ...
    }).catch(err => {
      store.commit('HIDE_PAGE_LOADING');

      // 出现400+，500+错误
      errorHandle(err);
    })
  }
}

const upload = (url, params) => params => {
  const formData = jsonToFormData(params);
  const configs = {
    {
      'Content-Type': 'multipart/form-data'
    }
  };
  return API(url, formData, 'post', configs);
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

export default {
  uploadOrderHandleTaskAPI: upload('www.baidu.com'),
}