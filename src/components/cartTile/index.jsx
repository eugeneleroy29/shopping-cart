import { useContext } from "react"
import { ShoppingCartContext } from "../../context"
import { useNavigate } from "react-router-dom";


function CartTile({ singleCartItem }) {

  const { handleRemoveFromCart, handleAddToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  function handleGoToDetails(id) {
    navigate(`/product-details/${id}`)
  }

  return (
    <>
      <div className="grid grid-cols-3 items-start gap-5 px-4">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-200 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              className="w-full h-full object-contain cursor-pointer hover:opacity-60 transition"
              onClick={() => handleGoToDetails(singleCartItem?.id)}
              title="View details"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{singleCartItem?.title}</h3>
            <button onClick={() => handleRemoveFromCart(singleCartItem, true)} className="mt-2 text-sm px-4 py-2 bg-cyan-800 hover:bg-cyan-600 text-white font-extrabold rounded-sm cursor-pointer">Remove</button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">${singleCartItem?.totalPrice.toFixed(2)}</h3>
          <p className="mt-2 mb-3 font-bold text-[16px]">Qty: {singleCartItem.quantity}</p>
          <div className="mt-3">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="disabled:opacity-20 border border-[#000] px-3 py-1 rounded mr-2 cursor-pointer"
              disabled={singleCartItem?.quantity === 1}
            >
              -
            </button>
            <button
              onClick={() => handleAddToCart(singleCartItem)}
              className="border border-[#000] px-3 py-1 rounded cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 mx-3" />
    </>
  )
}

export default CartTile