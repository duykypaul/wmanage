import Repository from "@/repositories/Repository";

const resource = '/users';
const auth = '/auth';
export default {
  login(payload) {
    return Repository.post(`${auth}`, payload);
  },
  findAll() {
    return Repository.get(`${resource}`)
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
  }
}
