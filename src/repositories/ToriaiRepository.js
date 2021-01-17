import Repository from "@/repositories/Repository";

const resource = '/toriais';
const algorithm = '/exeAlgorithm';
export default {
  findAll() {
    return Repository.get(`${resource}`);
  },
  findById(id) {
    return Repository.get(`${resource}/${id}`);
  },
  create(payload) {
    return Repository.post(`${resource}`, payload);
  },
  update(id, payload) {
    return Repository.put (`${resource}/${id}`, payload);
  },
  delete(id) {
    return Repository.delete(`${resource}/${id}`);
  },
  deleteAllByIds(payload) {
    return Repository.delete(`${resource}`, payload);
  },
  saveAllData(payload) {
    return Repository.post(`${resource}`, payload);
  },
  exeAlgorithm(payload) {
    return Repository.post(`${resource}${algorithm}`, payload);
  },

}
