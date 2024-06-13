import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { CgMenuBoxed } from "react-icons/cg";
import { FaShoppingCart, FaStar, FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";

import "../layout/layout.css";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(0);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [imgLoader, setImgLoader] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=194`)
      .then((res) => res.json())
      .then((data) => setSearch(data.products))
      .catch((err) => console.log(err));
  }, []);

  console.log(search);

  useEffect(() => {
    const updateFromLocalStorage = () => {
      const cartQuantity = localStorage.getItem("cartQuantity");
      setQuantity(cartQuantity ? parseInt(cartQuantity) : 0);

      const storedItems = localStorage.getItem("products");
      setItems(storedItems ? JSON.parse(storedItems) : []);
    };

    updateFromLocalStorage();
    window.addEventListener("storage", updateFromLocalStorage);

    const handleCartUpdated = (event) => {
      setItems(event.detail.products);
      setQuantity(event.detail.cartQuantity);
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("storage", updateFromLocalStorage);
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

  const hoverCartToSingle = (id) => {
    localStorage.setItem("id", id);
    if (location.pathname === "/single") {
      navigate("/singleee");
    } else {
      navigate("/single");
    }
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));
    const quantity = localStorage.getItem("cartQuantity");
    const newQuantity = quantity - 1;
    localStorage.setItem("cartQuantity", newQuantity);
    window.dispatchEvent(new Event("storage"));
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredItems([]); // Clear filtered items when search is empty
    } else {
      const filtered = search.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredItems(filtered);
    }
    setTimeout(() => {
      setImgLoader(false);
    }, 3000);
  }, [searchValue, search]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleProduct = (id) => {
    console.log(id);
    localStorage.setItem("id", id);
    navigate(`/single`);
  };

  const isCartPage = location.pathname === "/cart";
  const openSearch = location.pathname === "/product";

  return (
    <div className="container">
      <header>
        <div className="logo">
          <HiShoppingBag className="logo-icon" size={40} />
          <h1 style={{cursor: 'pointer'}}  onClick={() => navigate('/')} >Store</h1>
        </div>
        {openSearch && (
          <>
            <div className="input-wrapper">
              <button className="icon">
                <FaSearch/>
              </button>
              <input
                placeholder="search.."
                className="inp"
                name="text"
                type="text"
                value={searchValue}
              onChange={handleSearchChange}
              />
            </div>
            {searchValue && filteredItems.length > 0 && (
              <div className="search-card">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="product-card"
                    onClick={() => handleProduct(item.id)}
                  >
                    {imgLoader ? (
                      <div className="loaderImg"></div>
                    ) : (
                      <img src={item.thumbnail} alt={item.title} />
                    )}
                    <h2>{item.title}</h2>
                    <div className="info">
                      <p>$ {item.price}</p>
                      <p>
                        <FaStar style={{ color: "yellow" }} /> {item.rating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <nav>
          {!isCartPage && quantity > 0 && (
            <div className="quantity">{quantity}</div>
          )}
          <NavLink to="/">
            <IoHomeSharp className="link-icon" /> Home
          </NavLink>
          <NavLink to="/product">
            <AiFillProduct className="link-icon" /> Products
          </NavLink>
          <NavLink to="/categories">
            <CgMenuBoxed className="link-icon" /> Categories
          </NavLink>
          <NavLink to="/cart">
            <FaShoppingCart className="link-icon" /> Cart
          </NavLink>
          {!isCartPage && (
            <div className="hover-cart">
              <h3>Items in the Cart</h3>
              <div className="hover-cart-carts">
                {items.map((item) => (
                  <div className="hover-cart-cart" key={item.id}>
                    <div className="hover-cart-cart-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="hover-cart-info">
                      <h4 onClick={() => hoverCartToSingle(item.id)}>
                        {item.title}
                      </h4>
                      <div>
                        <span>${item.price}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    </div>
                    <div className="buttons">
                      <p>
                        ${parseFloat(item.price * item.quantity).toFixed(2)}
                      </p>
                      <h5>
                        $
                        {parseFloat(
                          item.price * item.quantity -
                            item.discountPercentage * item.quantity
                        ).toFixed(2)}
                      </h5>
                      <button
                        className="button"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg viewBox="0 0 448 512" className="svgIcon">
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
