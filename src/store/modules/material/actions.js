
export default {
  async getMaterials1 ({commit}) {
    /*try {
      let config = {
        headers: {
          'accept': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
        }
      };
      let result;
      if (tagIndex) {
        // config.params.tagIndex = tagIndex;
        result = await axiosInstance.get('/posts/pagination/' + tagIndex + "/category", config);
      } else {
        result = await axiosInstance.get('/posts/pagination', config);
      }
      commit('SET_LOADING', false);
      console.log("post: ", result);
      if (result.data && result.data.status === 200) {
        if (pageNo === 0) {
          commit('SET_LIST_POSTS', result.data.data);
        } else {
          commit('PUSH_LIST_POSTS', result.data.data);
        }
      }
    } catch (error) {
      commit('SET_LOADING', false);
      console.log(error);
    }*/
  },
  async getMaterials({commit}) {

  }
}
