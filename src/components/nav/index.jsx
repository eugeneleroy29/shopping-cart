import { faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShoppingCartContext } from "../../context"

function Nav() {

  const { cartItems } = useContext(ShoppingCartContext);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-cyan-800 text-white px-6 py-3 shadow-md z-50">
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/" title="Home" className="hover:text-cyan-300 transition">
            <FontAwesomeIcon icon={faHouse} size="lg" />
          </Link>
        </li>
        <li>
          <Link to="/cart" title="Cart" className="hover:text-cyan-300 transition relative">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{totalQuantity}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav