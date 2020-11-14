import Repository from "@/repositories/Repository";

const resource = '/branchs';
export default {
  findAll() {
    return Repository.get(`${resource}`);
  }
}
