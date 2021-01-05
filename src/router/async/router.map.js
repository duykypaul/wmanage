// View component
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
};

// Routing component registration
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    name: 'Home',
    redirect: '/login',
    component: view.tabs
  },
  Material: {
    name: 'Material',
    icon: 'table',
    component: view.page
  },
  ListMaterial: {
    path: 'query',
    name: 'query',
    component: () => import('@/pages/material/list')
  },
  AddNewMaterial: {
    path: 'query',
    name: 'query',
    component: () => import('@/pages/material/add')
  },
  Orders: {
    name: 'Order',
    icon: 'gold',
    component: view.page
  },
  Consignments: {
    path: 'query',
    name: 'consignments',
    component: () => import('@/pages/order/list')
  },
  New: {
    path: 'query',
    name: 'query',
    component: () => import('@/pages/order/add')
  },
  form: {
    name: 'form',
    icon: 'form',
    component: view.page
  },
  basicForm: {
    path: 'basic',
    name: 'basic',
    component: () => import('@/pages/form/basic')
  },
  stepForm: {
    path: 'step',
    name: 'step',
    component: () => import('@/pages/form/step')
  },
  advanceForm: {
    path: 'advance',
    name: 'advance',
    component: () => import('@/pages/form/advance')
  },
  list: {
    name: 'list',
    icon: 'table',
    component: view.page
  },
  queryList: {
    path: 'query',
    name: 'query',
    component: () => import('@/pages/list/QueryList')
  },
  primaryList: {
    path: 'primary',
    name: 'primary',
    component: () => import('@/pages/list/StandardList')
  },
  cardList: {
    path: 'card',
    name: 'card',
    component: () => import('@/pages/list/CardList')
  },
  searchList: {
    path: 'search',
    name: 'search',
    component: () => import('@/pages/list/search/SearchLayout')
  },
  article: {
    name: 'article',
    component: () => import('@/pages/list/search/ArticleList')
  },
  application: {
    name: 'application',
    component: () => import('@/pages/list/search/ApplicationList')
  },
  project: {
    name: 'project',
    component: () => import('@/pages/list/search/ProjectList')
  },
  details: {
    name: 'details',
    icon: 'profile',
    component: view.blank
  },
  basicDetails: {
    path: 'basic',
    name: 'basic',
    component: () => import('@/pages/detail/BasicDetail')
  },
  advanceDetails: {
    path: 'advance',
    name: 'advance',
    component: () => import('@/pages/detail/AdvancedDetail')
  },
  result: {
    name: 'result',
    icon: 'check-circle-o',
    component: view.page
  },
  success: {
    name: 'success',
    component: () => import('@/pages/result/Success')
  },
  error: {
    name: 'error',
    component: () => import('@/pages/result/Error')
  },
  exception: {
    name: 'exception',
    icon: 'warning',
    component: view.blank
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  components: {
    name: 'components',
    icon: 'appstore-o',
    component: view.page
  },
  taskCard: {
    name: 'taskCard',
    component: () => import('@/pages/components/TaskCard')
  },
  palette: {
    name: 'palette',
    component: () => import('@/pages/components/Palette')
  }
};
export default routerMap

