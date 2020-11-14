export default {
  setDevice (state, isMobile) {
    state.isMobile = isMobile
  },
  setTheme (state, theme) {
    state.theme = theme
  },
  setLayout (state, layout) {
    state.layout = layout
  },
  setMultiPage (state, multiPage) {
    state.multiPage = multiPage
  },
  setAnimate (state, animate) {
    state.animate = animate
  },
  setWeekMode(state, weekMode) {
    state.weekMode = weekMode
  },
  setFixedHeader(state, fixedHeader) {
    state.fixedHeader = fixedHeader
  },
  setFixedSideBar(state, fixedSideBar) {
    state.fixedSideBar = fixedSideBar
  },
  setLang(state, lang) {
    state.lang = lang
  },
  setHideSetting(state, hideSetting) {
    state.hideSetting = hideSetting
  },
  correctPageMinHeight(state, minHeight) {
    state.pageMinHeight += minHeight
  },
  setMenuData(state, menuData) {
    state.menuData = menuData
  },
  setAsyncRoutes(state, asyncRoutes) {
    state.asyncRoutes = asyncRoutes
  },
  setPageWidth(state, pageWidth) {
    state.pageWidth = pageWidth
  },
  setActivatedFirst(state, activatedFirst) {
    state.activatedFirst = activatedFirst
  },
  setFixedTabs(state, fixedTabs) {
    state.fixedTabs = fixedTabs
  }
}
