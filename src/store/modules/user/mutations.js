export default {
  setUser (state, user) {
    state.user = user;
    localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
    localStorage.setItem(process.env.VUE_APP_PERMISSIONS_KEY, JSON.stringify(permissions))
  },
  setRoles(state, roles) {
    state.roles = roles;
    localStorage.setItem(process.env.VUE_APP_ROLES_KEY, JSON.stringify(roles))
  },
  setRoutesConfig(state, routesConfig) {
    state.routesConfig = routesConfig;
    localStorage.setItem(process.env.VUE_APP_ROUTES_KEY, JSON.stringify(routesConfig))
  }
}
