import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";


function ProductTile({ singleProductTile }) {

  const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  function handleNavigateToProductDetailsPage(getCurrentProductId) {
    navigate(`/product-details/${getCurrentProductId}`);
  }

  return (
    <div className="relative group border border-transparent hover:border-cyan-500 hover:shadow-xl rounded-xl transition-all duration-300 bg-white">
      <div className="overflow-hidden aspect-square">
        <img
          src={singleProductTile?.thumbnail}
          alt={singleProductTile?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex flex-wrap items-start justify-between mt-4 space-x-4 px-4">
        <div className="font-bold text-gray-900 px-4 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{singleProductTile.title}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 px-4 sm:text-sm md:text-[14px] whitespace-nowrap">$ {singleProductTile?.price}</p>
        </div>
      </div>
      <button
        onClick={() => handleNavigateToProductDetailsPage(singleProductTile?.id)}
        className="px-5 my-5 py-2 rounded bg-black text-white hover:opacity-65 font-bold text-lg mx-auto block cursor-pointer"
      >
        View Details
      </button>
      <button
        onClick={() => handleAddToCart(singleProductTile)}
        className="disabled:opacity-65 px-5 my-5 py-2 rounded bg-black text-white hover:opacity-65 font-bold text-lg mx-auto block cursor-pointer"
        disabled={cartItems.findIndex(item => item.id === singleProductTile.id) > -1}
      >
        {cartItems.findIndex(item => item.id === singleProductTile.id) > -1 ? 'Already in cart' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default ProductTile