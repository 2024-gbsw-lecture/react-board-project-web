import customAxios from '.';

const authAPI = {
  register: async (request) => {
    const { data } = await customAxios.post('/auth/sign-up', request);

    return data;
  },

  login: async (request) => {
    const { data } = await customAxios.post('/auth/sign-in', request);

    return data;
  },
};

export default authAPI;
