import { asyncSteps, constantSteps } from '@/guide/steps.js'

/**
 * 根据data生成新的steps的增加部分
 * @param data
 */
function getAddSteps(name) {
  var addSteps = null
  var addStepObj = null
  var addStepObj = asyncSteps.find(x => x.name == name)
  if (addStepObj != null) {
    addSteps = addStepObj.step
  }
  return addSteps
}

const guide = {
  state: {
    steps: constantSteps,
    addSteps: []
  },
  mutations: {
    // RE_SET_STEPS: (state) => {
    //   state.steps = constantSteps
    //   state.addSteps = []
    // },
    SET_STEPS: (state, addSteps) => {
      state.addSteps = addSteps
      state.steps = addSteps != null ? constantSteps.concat(addSteps) : constantSteps
    }
  },
  actions: {
    // //data对应新的路由页码，也就是对应的页面
    // ReSetSteps({ commit }) {
    //     return new Promise(resolve => {
    //       commit('RE_SET_STEPS')
    //       resolve()
    //     })
    //   },
    // data对应新的路由页码，也就是对应的页面
    GenerateSteps({ commit }, to) {
      return new Promise(resolve => {
        const name = to.name
        var addSteps = null
        if (name != null) {
          addSteps = getAddSteps(name)
        }
        commit('SET_STEPS', addSteps)
        resolve()
      })
    }
  }
}

export default guide
