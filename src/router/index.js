import Vue from 'vue'
import Router from 'vue-router'
import {formatRoutes} from '@/utils/routerUtil'

Vue.use(Router);

// Routing configuration without login interception
const loginIgnore = {
  names: ['404', '403'],      //Match by route name
  paths: ['/login'],   // According to routing fullPath matching
  /**
   * Determine whether the route is included in the configuration
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  }
};

/**
 * 初始化路由实例
 * @param isAsync 是否异步路由模式
 * @returns {VueRouter}
 */
function initRouter(isAsync) {
  const options = isAsync ? require('./async/config.async').default : require('./config').default;
  formatRoutes(options.routes);
  return new Router(options)
}
export {loginIgnore, initRouter}
