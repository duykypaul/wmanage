import BranchRepository from '@/repositories/BranchRepository'
export default {
  async getBranches ({commit}) {
    try {
      let branches = await BranchRepository.findAll();
      console.log("action branch: ", branches);
      if (branches.status === 200) {
        commit('SET_BRANCHES', branches.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
}
