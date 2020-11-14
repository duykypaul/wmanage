import config from '@/config'
import {ADMIN} from '@/config/default'
import {getLocalSetting} from '@/utils/themeUtil'
const localSetting = getLocalSetting(true);

export default {
  isMobile: false,
  animates: ADMIN.animates,
  palettes: ADMIN.palettes,
  pageMinHeight: 0,
  menuData: [],
  activatedFirst: undefined,
  ...config,
  ...localSetting
}
