import axiosInstance from "../../api/axiosInstance";

export const fetchProducts = async () => {
  const res = await axiosInstance.get('/api/products');
  return res.data;
};

export const fetchProduct = async (id) => {
  const res = await axiosInstance.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await axiosInstance.post('/api/products', formData, { 
    headers: {'Content-Type': 'multipart/form-data'} 
  });
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(`/api/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/api/products/${id}`);
  return res.data;
};