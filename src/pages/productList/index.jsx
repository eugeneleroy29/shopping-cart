import { useContext } from "react"
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";



function ProductListPage() {

  const { listOfProducts, loading } = useContext(ShoppingCartContext);

  // console.log(listOfProducts);

  if (loading) return <h1 className="text-center">Loading data! Please wait.</h1>

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mt-4 mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Our Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-6 lg:mt-10 lg:gap-8 lg:grid-cols-4">
          {
            listOfProducts && listOfProducts.length > 0
              ? listOfProducts.map((singleProductTile, index) => <ProductTile singleProductTile={singleProductTile} key={index} />)
              : <h3>No products found</h3>
          }
        </div>
      </div>
    </section>
  )
}

export default ProductListPage