import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import "./input.css";
import img from "../assets/pay-icons.png";
import { FaOpencart } from "react-icons/fa";
import check from "../assets/check.png";
import { FaCheck } from "react-icons/fa";
import empty from "../assets/empty-box.png";

function Cart() {
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();
  const [numberError, setNumberError] = useState();
  const [dateError, setDateError] = useState();
  const [cvvError, setCvvError] = useState();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const storedItems = localStorage.getItem("products");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const handleProductDelete = (productId) => {
    const newItems = cart.filter((product) => product.id !== productId);
    setCart(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));

    const quantity = localStorage.getItem("cartQuantity");
    const newQuantity = quantity - 1;
    localStorage.setItem("cartQuantity", newQuantity);

    // Dispatch custom event to update quantity in other components
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      const storedItems = localStorage.getItem("products");
      setCart(storedItems ? JSON.parse(storedItems) : []);
    });

    return () =>
      window.removeEventListener("storage", () => {
        const storedItems = localStorage.getItem("products");
        setCart(storedItems ? JSON.parse(storedItems) : []);
      });
  }, []);

  const handleDelete = (id) => {
    handleProductDelete(id);
  };

  function handleQuantityPlus(id) {
    const newItems = cart.map((product) => {
      if (product.id === id && product.quantity < product.stock) {
        product.quantity += 1;
      }
      return product;
    });
    setCart(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));

    const event = new CustomEvent("cartUpdated", {
      detail: { products: newItems, cartQuantity: newQuantity },
    });
    window.dispatchEvent(event);
  }

  function handleQuantityMinus(id) {
    const newItems = cart.map((product) => {
      if (product.id === id && product.quantity > 1) {
        product.quantity -= 1;
      }
      return product;
    });
    setCart(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));

    const event = new CustomEvent("cartUpdated", {
      detail: { products: newItems, cartQuantity: newQuantity },
    });
    window.dispatchEvent(event);
  }

  function handleNumber(e) {
    let input = e.target.value.replace(/[^0-9]/g, ""); // Remove all existing spaces
    if (input.length > 16) {
      input = input.slice(0, 16); // Limit to 16 digits
    }
    let formattedInput = input.match(/.{1,4}/g)?.join(" ") || ""; // Add a space every 4 digits
    e.target.value = formattedInput;
    console.log(e.target.value);
    setCardNumber(e.target.value);
  }

  function handleData(e) {
    let input = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    if (input.length > 4) {
      input = input.slice(0, 4); // Limit to 4 digits
    }

    if (input.length >= 2) {
      input = input.slice(0, 2) + "/" + input.slice(2); // Add '/' after the first 2 digits
    }

    e.target.value = input;
    console.log(e.target.value);
    setExpiryDate(e.target.value);
  }
  function handleCvv(e) {
    let input = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (input.length > 3) {
      input = input.slice(0, 3); // Limit to 3 digits
    }
    e.target.value = input;
    console.log(e.target.value);
    setCvv(e.target.value);
  }

  function validate(cardNumber, expiryDate, cvv) {
    if (cardNumber.length !== 19) {
      // 16 digits + 3 spaces
      setNumberError("Invalid card number");
      return false;
    } else {
      setNumberError("");
    }
    if (expiryDate.length !== 5) {
      setDateError("Invalid expiry date");
      return false;
    } else {
      setDateError("");
    }
    if (cvv.length !== 3 && cvv.length !== 4) {
      setCvvError("Invalid CVV");
      return false;
    } else {
      setCvvError("");
    }
    return true;
  }

  function handleBuy() {
    if (validate(cardNumber, expiryDate, cvv)) {
      console.log(2);
      setModal(true);
    } else {
      console.log(3);
    }
  }

  function handleClose() {
    navigate("/");
    setModal(false);
    localStorage.removeItem("products");
    localStorage.removeItem("cartQuantity");
    window.location.reload();
  }

  console.log(cart);
  return (
    <div className="cart">
      {modal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <img src={check} alt="" />
            <div className="modal-content">
              <div className="modal-header">
                <h3>Payment Successful</h3>
              </div>
              <div className="modal-body">
                <h4>Thank you for your purchase!</h4>
                <p>
                  <FaCheck /> Your order will be delivered soon.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn-modal" onClick={handleClose}>
                  <span className="btn-text-one">Close</span>
                  <span className="btn-text-two">Thank you !</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="cart-left">
        <h1>Shopping Cart.</h1>
        <div className="titles">
          <p>Product</p>
          <p id="quantity">Quantity</p>
          <p>Total Price</p>
        </div>
        <div className="shopping-carts">
          {cart.length === 0 ? (
            <div className="empty">
              <img src={empty} alt="" />
              <p>No product selected yet !</p>
            </div>
          ) : (
            cart.map((product) => (
              <div className="shopping-cart" key={product.id}>
                <div className="title">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.title}</h3>
                </div>
                <div className="shop-quantity">
                  <button onClick={() => handleQuantityMinus(product.id)}>
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button onClick={() => handleQuantityPlus(product.id)}>
                    +
                  </button>
                </div>
                <div className="price-shopping">
                  <span>
                    ${parseFloat(product.price * product.quantity).toFixed(2)}
                  </span>
                  <h5>
                    $
                    {parseFloat(
                      product.price * product.quantity -
                        product.discountPercentage * product.quantity
                    ).toFixed(2)}
                  </h5>
                </div>
                <div className="delete">
                  <AiFillDelete
                    onClick={() => handleDelete(product.id)}
                    className="delete-icon"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="total">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            <GrFormPreviousLink className="continue-btn" /> continue shopping
          </button>
          <div className="total-price">
            <div className="sub-ship">
              <div className="sub">
                <h3>Subtotal:</h3>
                <p>
                  $
                  {parseFloat(
                    cart.reduce(
                      (total, product) =>
                        total +
                        product.price * product.quantity -
                        product.discountPercentage * product.quantity,
                      0
                    )
                  ).toFixed(2)}
                </p>
              </div>
              <div className="ship">
                <h3>Shipping:</h3>
                <div>
                  <span>$4.99</span>
                  <p>$0</p>
                </div>
              </div>
            </div>
            <div className="grand-total">
              <h3>Total:</h3>
              <p>
                $
                {parseFloat(
                  cart.reduce(
                    (total, product) =>
                      total +
                      product.price * product.quantity -
                      product.discountPercentage * product.quantity,
                    0
                  )
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-right">
        <h1>Payment Info</h1>
        <div className="card">
          <img src={img} alt="" />
          <div className="card-number">
            <h3>Card Number:</h3>
            <input
              onChange={handleNumber}
              autocomplete="off"
              name="cardNumber"
              type="text"
              class="input"
              maxLength="19" // 16 digits + 3 spaces
              placeholder="1234 5678 9012 3456"
            />
            {numberError && <p className="error"> {numberError} </p>}
          </div>
          <div className="data">
            <div className="texts">
              <p>MM/YY:</p>
              <p>CVV:</p>
            </div>
            <div className="inputs">
              <input
                onChange={handleData}
                type="text"
                autoComplete="off"
                name="text"
                className="input"
                maxLength="5" // MM/YY format
                placeholder="MM/YY"
              />
              <input
                onChange={(e) => handleCvv(e)}
                type="text"
                autocomplete="off"
                name="text"
                class="input"
                placeholder="CVV"
                maxLength="3" // CVV format
              />
            </div>
            <div className="errors">
              {dateError && <p className="er1"> {dateError} </p>}
              {cvvError && <p className="er2"> {cvvError} </p>}
            </div>
          </div>
          <button onClick={handleBuy} disabled={cart.length === 0}>
            {" "}
            <FaOpencart style={{ marginRight: "5px" }} /> Buy $
            {parseFloat(
              cart.reduce(
                (total, product) =>
                  total +
                  product.price * product.quantity -
                  product.discountPercentage * product.quantity,
                0
              )
            ).toFixed(2)}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
