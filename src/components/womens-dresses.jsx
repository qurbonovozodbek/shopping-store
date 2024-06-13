import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WomenDress() {
  const [beauty, setBeauty] = useState([]);
  const navigate = useNavigate()

  const handleProduct = (id) => {
    console.log(id)
    localStorage.setItem('id', id)
    navigate(`/single`)
  }

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/womens-dresses`)
      .then((res) => res.json())
      .then((data) => setBeauty(data.products))
      .catch((err) => console.log(err));
  }, []);
  console.log(beauty);

  return (
    <div className="product">
      <h1>Women Dress</h1>
      <div className="products">
        {beauty.map((product) => (
          <div className="product-card" onClick={() => handleProduct(product.id)}>
            <img src={product.thumbnail} alt={product.name} />
            <h2>{product.title}</h2>
            <div className="info">
              <p> $ {product.price}</p>
              <p>
                {" "}
                <FaStar style={{ color: "yellow" }} /> {product.rating}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WomenDress;
