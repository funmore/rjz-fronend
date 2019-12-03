const getters = {
  key: state => state.app.key,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  notice: state => state.user.notice,
  steps: state => state.guide.steps,
  s_team: state => state.program.s_team,
  g_team: state => state.program.g_team,
  w_team: state => state.program.w_team,
  d_team: state => state.program.d_team,
  programBasicId: state => state.program.programBasicId
}
export default getters
