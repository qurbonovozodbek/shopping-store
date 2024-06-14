import React, { useEffect, useState } from "react";
import CustomCarousel from "../../image-slider/custom-slider";
import { Rating, Alert, Button, Stack } from "@mui/material";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCheck, FaBoxOpen, FaUser, FaBarcode } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { GiWeight } from "react-icons/gi";
import { IoMdPricetag } from "react-icons/io";
import { MdEmail, MdOutlineLocalPolice } from "react-icons/md";
import Loader from "../../loader/Loader";
import "../../loader/loader.css";
import { useNavigate } from "react-router-dom";

function Singleee() {
  const [single, setSingle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const [counter, setCounter] = useState(1);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setImgLoader(true);
    setLoading(true);
    let id = localStorage.getItem("id");
    console.log(id);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setSingle(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  setTimeout(() => {
    setImgLoader(false);
  }, 3000);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  function handleMinus() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  function handlePlus() {
    if (counter <= single.stock - 1) {
      setCounter(counter + 1);
    }
  }

  function handleClose() {
    navigate("/");
  }

  function handleAdd() {
    const data = {
      id: single.id,
      title: single.title,
      price: single.price,
      image: single.thumbnail,
      stock: single.stock,
      quantity: counter,
      discountPercentage: single.discountPercentage
    };
  
    let products = JSON.parse(localStorage.getItem("products")) || [];
  
    const existingProductIndex = products.findIndex(
      (product) => product.id === single.id
    );
  
    let cartQuantity = parseInt(localStorage.getItem("cartQuantity")) || 0;
  
    if (existingProductIndex !== -1) {
      products[existingProductIndex].quantity = counter;
      setAlert({ show: true, message: "Product quantity updated" });
    } else {
      products.push(data);
      cartQuantity += 1;
      setAlert({ show: true, message: "Product added to cart" });
    }
  
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cartQuantity", cartQuantity);
  
    window.dispatchEvent(new Event('storage'));
  }
  
  
  return (
    <div className="single">
      {alert.show && (
        <div id="alert">
          <Alert
            id="alert"
            className="alert"
            severity="success"
            onClose={() => setAlert({ show: false, message: "" })}
          >
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <IoMdPricetag className="d-icon" color="yellowgreen" />
              <span className="d-icon">{alert.message}</span>
            </Stack>
          </Alert>
        </div>
      )}
      <button className="close" onClick={handleClose}>
        close
      </button>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="single-page">
            <div className="left">
              {imgLoader ? (
                <div className="honeycomb">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <CustomCarousel>
                  {single &&
                    single.images &&
                    single.images.length > 0 &&
                    single.images.map((image, index) => {
                      return <img key={index} src={image} />;
                    })}
                </CustomCarousel>
              )}
            </div>
            <div className="center">
              <h1>{single.title}</h1>
              <div className="delivery">
                <div>
                  {" "}
                  <FaCheck className="d-icon" color="yellowgreen" />{" "}
                  <TbTruckDelivery className="d-icon" color="#E3FEF7" />{" "}
                  <span>{single.shippingInformation}</span>{" "}
                </div>
                <div>
                  {" "}
                  <FaCheck className="d-icon" color="yellowgreen" />{" "}
                  <LuPackage className="d-icon" color="#E3FEF7" />{" "}
                  <span>{single.warrantyInformation}</span>{" "}
                </div>
              </div>
              <div className="rating-only">
                <Rating
                  name="read-only"
                  value={parseFloat(single.rating)}
                  precision={0.1}
                  readOnly
                />
                <p>{single.rating}</p>
              </div>
              <div className="buy">
                <div className="prices">
                  <span>
                    {" "}
                    <FaBoxOpen className="p=icon" /> {single.stock}{" "}
                  </span>
                  <span>
                    {" "}
                    <GiWeight className="p=icon" /> {single.weight}{" "}
                  </span>
                  <span>
                    {" "}
                    <IoMdPricetag className="p=icon" /> {single.price}{" "}
                  </span>
                </div>
                <div className="add-cart">
                  <div className="amount">
                    <button onClick={handleMinus}>-</button>
                    <div className="amount-card"> {counter} </div>
                    <button onClick={handlePlus}>+</button>
                  </div>
                  <button className="Btn" onClick={handleAdd}>
                    add to cart
                  </button>
                </div>
              </div>
              <p>{single.description}</p>
            </div>
            <div className="right">
              <div className="reviews">
                <h3>Reviews</h3>
                {single &&
                  single.reviews &&
                  single.reviews.length > 0 &&
                  single.reviews.map((view, ind) => {
                    return (
                      <div key={ind} className="reviews-card">
                        <FaUser
                          style={{ fontSize: "35px", color: "#77B0AA" }}
                        />
                        <div className="info">
                          <div className="email">
                            <p>{view.reviewerName}</p>
                            <MdEmail style={{ cursor: "pointer" }} />
                          </div>
                          <p className="para">{view.comment}</p>
                          <Rating
                            name="read-only"
                            value={parseFloat(view.rating)}
                            precision={0.1}
                            readOnly
                            id="rating-mui"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="qrCode">
                {single && single.meta && single.meta.qrCode && (
                  <>
                    <img src={single.meta.qrCode} alt={single.title} />
                    <p>
                      #{single.meta.barcode}{" "}
                      <FaBarcode style={{ color: "gold", fontSize: "16px" }} />
                    </p>
                  </>
                )}
                {single && single.returnPolicy && (
                  <p>
                    {single.returnPolicy}{" "}
                    <MdOutlineLocalPolice
                      style={{ color: "gold", fontSize: "16px" }}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Singleee;
