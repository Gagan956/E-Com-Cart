import axiosInstance from "../../api/axiosInstance";

export const getCart = async () => {
  const res = await axiosInstance.get('/api/cart');
  return res.data;
};

export const addToCart = async (data) => {
  const res = await axiosInstance.post('/api/cart', data);
  return res.data;
};

export const removeFromCart = async (id) => {
  const res = await axiosInstance.delete(`/api/cart/${id}`);
  return res.data;
};

export const updateCartItem = async (productId, quantity) => {
  const res = await axiosInstance.put(`/api/cart/${productId}`, { quantity });
  return res.data;
};

export const clearCart = async () => {
  const res = await axiosInstance.delete('/api/cart');
  return res.data;
};