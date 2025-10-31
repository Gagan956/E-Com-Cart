import axiosInstance from "../../api/axiosInstance";

export const loginUser = async (data) => {
  const res = await axiosInstance.post('/api/users/login', data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axiosInstance.post('https://e-com-cart-phi.vercel.app/api/users/signup', data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post('/api/users/logout');
  return res.data;
};

export const getUserProfile = async () => {
  const res = await axiosInstance.get('/api/users/profile');
  return res.data;
};