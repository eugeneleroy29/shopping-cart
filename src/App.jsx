import { Route, Routes } from "react-router-dom"
import ProductListPage from "./pages/productList"
import ProductDetailsPage from "./pages/productDetails"
import CartListPage from "./pages/cartList"
import Nav from "./components/nav"


function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartListPage />} />
      </Routes>
    </>
  )
}

export default App
