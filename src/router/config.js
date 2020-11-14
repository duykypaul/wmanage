import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: 'Home',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'material',
          name: 'Nguyên liệu',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'list',
              name: 'Danh sách',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/material/list'),
            },
            {
              path: 'new',
              name: 'Thêm mới',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/material/add'),
            }
          ]
        },
        /*{
          path: 'form',
          name: 'form',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'basic',
              name: 'basic',
              component: () => import('@/pages/form/basic'),
            },
            {
              path: 'step',
              name: 'step',
              component: () => import('@/pages/form/step'),
            },
            {
              path: 'advance',
              name: 'advance',
              component: () => import('@/pages/form/advance'),
            }
          ]
        },
        {
          path: 'list',
          name: 'list',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: 'query',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'primary',
              name: 'primary',
              component: () => import('@/pages/list/StandardList'),
            },
            {
              path: 'card',
              name: 'card',
              component: () => import('@/pages/list/CardList'),
            },
            {
              path: 'search',
              name: 'search',
              component: () => import('@/pages/list/search/SearchLayout'),
              children: [
                {
                  path: 'article',
                  name: 'article',
                  component: () => import('@/pages/list/search/ArticleList'),
                },
                {
                  path: 'application',
                  name: 'application',
                  component: () => import('@/pages/list/search/ApplicationList'),
                },
                {
                  path: 'project',
                  name: 'project',
                  component: () => import('@/pages/list/search/ProjectList'),
                }
              ]
            }
          ]
        },
        {
          path: 'details',
          name: 'details',
          meta: {
            icon: 'profile'
          },
          component: BlankView,
          children: [
            {
              path: 'basic',
              name: 'basic',
              component: () => import('@/pages/detail/BasicDetail')
            },
            {
              path: 'advance',
              name: 'advance',
              component: () => import('@/pages/detail/AdvancedDetail')
            }
          ]
        },
        {
          path: 'result',
          name: 'result',
          meta: {
            icon: 'check-circle-o',
          },
          component: PageView,
          children: [
            {
              path: 'success',
              name: 'success',
              component: () => import('@/pages/result/Success')
            },
            {
              path: 'error',
              name: 'error',
              component: () => import('@/pages/result/Error')
            }
          ]
        },
        {
          path: 'exception',
          name: 'error',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          path: 'components',
          name: 'components',
          meta: {
            icon: 'appstore-o'
          },
          component: PageView,
          children: [
            {
              path: 'taskCard',
              name: 'taskCard',
              component: () => import('@/pages/components/TaskCard')
            },
            {
              path: 'palette',
              name: 'palette',
              component: () => import('@/pages/components/Palette')
            },
            {
              path: 'table',
              name: 'table',
              component: () => import('@/pages/components/table')
            }
          ]
        },
        {
          name: '验权表单',
          path: 'auth/form',
          meta: {
            icon: 'file-excel',
            authority: {
              permission: 'form'
            }
          },
          component: () => import('@/pages/form/basic')
        }*/
      ]
    },
  ]
};

export default options;
