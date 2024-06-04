import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { CgMenuBoxed } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
// import '../../js/index.js'

function Layout() {
  const links = useLocation()
  console.log(links.pathname);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate()
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("products");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  console.log(items);

  useEffect(() => {
    const updateFromLocalStorage = () => {
      const cartQuantity = localStorage.getItem("cartQuantity");
      setQuantity(cartQuantity ? parseInt(cartQuantity) : 0);
      
      const storedItems = localStorage.getItem("products");
      setItems(storedItems ? JSON.parse(storedItems) : []);
    };

    updateFromLocalStorage();
    window.addEventListener("storage", updateFromLocalStorage);
    return () => {
      window.removeEventListener("storage", updateFromLocalStorage);
    };
  }, []);

  function hoverCartToSingle(id) {
    console.log(id);
    localStorage.setItem('id', id)
    if(links.pathname == '/single') {
      navigate(`/singleee`)
    } else {
      navigate(`/single`)
    }
  }

  function handleDelete(id) {
    const newItems = items.filter((item) => item.id!== id);
    setItems(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));
    setQuantity(quantity - 1);
    localStorage.setItem("cartQuantity", quantity - 1);
  }

  console.log(quantity);

  return (
    <div className="container">
      <header>
        <div className="logo">
          <HiShoppingBag className="logo-icon" size={40} />
          <h1>Store</h1>
        </div>
        <nav>
          {quantity > 0 && <div className="quantity">{quantity}</div>}
          <NavLink to="/">
            <AiFillProduct className="link-icon" /> Products
          </NavLink>
          <NavLink to="/categories">
            <CgMenuBoxed className="link-icon" /> Categories
          </NavLink>
          <NavLink to="/cart">
            <FaShoppingCart className="link-icon" /> Cart
          </NavLink>
          <div className="hover-cart">
            <h3>Items in the Cart</h3>
            <div className="hover-cart-carts">
              {items.map((item) => (
                <div className="hover-cart-cart" key={item.id}>
                  <div className="hover-cart-cart-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="hover-cart-info">
                    <h4 onClick={() => hoverCartToSingle(item.id)}>{item.title}</h4>
                    <div>
                      <span>${item.price}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="buttons">
                    <p> ${parseFloat(item.price * item.quantity).toFixed(2)} </p>
                    <h5> $
                      {parseFloat(
                        item.price * item.quantity -
                          item.discountPercentage * item.quantity
                      ).toFixed(2)}{" "}
                    </h5>
                    <button className="button" onClick={() => handleDelete(item.id)}>
                      <svg viewBox="0 0 448 512" className="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
