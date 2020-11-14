import Repository from "@/repositories/Repository";

const resource = '/material-type';
export default {
  findDistinctDimension() {
    let endPoint = 'dimensions';
    return Repository.get(`${resource}/${endPoint}`);
  },
  findDistinctByMaterialTypeAndAndMaterialTypeName() {
    let endPoint = 'types';
    return Repository.get(`${resource}/${endPoint}`);
  }
}
