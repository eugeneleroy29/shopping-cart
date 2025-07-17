import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShoppingCartContext } from "../../context";

function ProductDetailsPage() {

  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
    cartItems
  } = useContext(ShoppingCartContext);

  const [selectedImage, setSelectedImage] = useState(null);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();
    if (result) {
      setProductDetails(result);
      setSelectedImage(result.thumbnail);
      setLoading(false);
    };
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id])

  console.log(productDetails);

  if (loading) return <h1 className="text-center py-10-text-xl font-bold text-gray-600">Loading product details, please wait...</h1>

  if (!productDetails) return <div className="text-center py-10 text-red-600">Product not found.</div>;

  return (
    <>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">

          {/* Main image preview */}

          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img
                className="w-4/5 rounded object-cover"
                src={selectedImage}
                alt={productDetails?.title}
              />
            </div>

            {/* Thumbnail selector */}

            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {
                productDetails?.images?.length
                  ? productDetails?.images.map((imageItem, index) =>
                    <div
                      key={index}
                      className={`border rounded-xl p-1 cursor-pointer shadow-md ${selectedImage === imageItem
                        ? "border-cyan-700"
                        : "border-transparent"
                        }`}
                      onClick={() => setSelectedImage(imageItem)}
                    >
                      <img
                        src={imageItem}
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        alt={`Product view ${index + 1}`}
                      />
                    </div>
                  )
                  : null
              }
            </div>
          </div>

          {/* Product info and add to cart */}

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333333]">{productDetails?.title}</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold">${productDetails?.price}</p>
            </div>
            <div>
              <button
                onClick={() => handleAddToCart(productDetails)}
                className="disabled:opacity-45 shadow-md mt-5 min-w-[200px] px-4 py-3 border border-cyan-700 bg-transparent text-sm font-semibold rounded cursor-pointer"
                disabled={
                  !productDetails || cartItems.findIndex(item => item.id === productDetails?.id) > -1
                }
              >
                {!productDetails
                  ? 'Loading...'
                  : cartItems.findIndex(item => item.id === productDetails?.id) > -1
                    ? 'Already in cart'
                    : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailsPage