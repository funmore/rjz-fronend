import { teamProgram} from '@/api/program'

const program = {
  state: {
    s_team:[],   //short for strict_teamrole 只局限于项目组长和项目组员
    g_team:[],    //short for general_teamrole 标准项目组  项目组长&项目组员&质量&配置管理&监督人员
    w_team:[],   //short for wide_teamrole  项目组长&项目组员&质量&配置管理&监督人员  型号负责人&项目组长
    d_team:[],    //short for dynamic_teamrole 用户自定义项目组长 for future use
    programBasicId:null   //项目id
  },

  mutations: {
    SET_S_TEAM: (state, s_team) => {
      state.s_team = s_team
    },
    SET_G_TEAM: (state, g_team) => {
      state.g_team = g_team
    },
    SET_W_TEAM: (state, w_team) => {
      state.w_team = w_team
    },
    SET_D_TEAM: (state, d_team) => {
      state.d_team = d_team
    },
    SET_PROGRAM_BASIC_ID: (state, id) => {
      state.programBasicId = id
    },

  },

  actions: {
    
    // 进入每个项目都会调用
    TEAM({ commit }, id) {
      return new Promise((resolve, reject) => {
        teamProgram(id).then(response => {
          const data = response.data.team
              commit('SET_S_TEAM', data.s_team)
              commit('SET_G_TEAM', data.g_team)
              commit('SET_W_TEAM', data.w_team)
              commit('SET_D_TEAM', data.d_team)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default program
