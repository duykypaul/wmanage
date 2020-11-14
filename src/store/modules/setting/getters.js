import {filterMenu} from "@/utils/authority-utils";
import {formatFullPath} from "@/utils/i18n";

export default {
  menuData(state, getters, rootState) {
    if (state.filterMenu) {
      const {permissions, roles} = rootState.user;
      filterMenu(state.menuData, permissions, roles)
    }
    return state.menuData
  },
  firstMenu(state) {
    const {menuData} = state;
    if (menuData.length > 0 && !menuData[0].fullPath) {
      formatFullPath(menuData)
    }
    return menuData.map(item => {
      const menuItem = {...item};
      delete menuItem.children;
      return menuItem;
    })
  },
  subMenu(state) {
    const {menuData, activatedFirst} = state;
    if (!menuData[0].fullPath) {
      formatFullPath(menuData);
    }
    const current = menuData.find(menu => menu.fullPath === activatedFirst);
    return current && current.children ? current.children : [];
  }
}
