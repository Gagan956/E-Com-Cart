import React from 'react';

const ProductCard = ({ product, onAdd, disabled = false }) => {
  const handleAddToCart = () => {
    onAdd(product._id, product.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-48 w-full object-cover" 
          />
        ) : (
          <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        )}
        <p className="text-green-700 font-medium text-xl mb-3">₹{product.price}</p>
        <button 
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            disabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
          onClick={handleAddToCart}
          disabled={disabled}
        >
          {disabled ? 'Login to Add' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;