import {MATERIALS} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getMaterial() {
  return request(MATERIALS, METHOD.GET);
}

export default {
  getMaterial,
}
