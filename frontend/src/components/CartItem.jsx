import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../features/cart/cartSlice";
import { MdDelete } from "react-icons/md";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const product = item.productId || item.product;
  const quantity = item.quantity || item.qty;

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartQuantity({ 
      productId: product?._id, 
      quantity: newQty 
    }));
  };

  // Handle item removal
  const handleRemove = () => {
    dispatch(removeFromCart(product?._id));
  };

  if (!product) return null;

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-2xl mb-3 border border-gray-100">
      <div className="flex items-center gap-4 flex-1">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-xl"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
          <p className="text-gray-500 text-sm">₹{product.price} per item</p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-lg">₹{(product.price * quantity).toFixed(2)}</p>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
          title="Remove item"
        >
          <MdDelete size={22} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;