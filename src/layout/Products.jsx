import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [imgLoader, setImgLoader] = useState(false)

  useEffect(() => {
    setImgLoader(true);
    setLoader(true);
    fetch(`https://dummyjson.com/products?limit=30&skip=80`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));

      setTimeout(() => {
        setImgLoader(false);
      },3000)

  }, []);

  const navigate = useNavigate();

  const handleProduct = (id) => {
    console.log(id);
    localStorage.setItem('id', id);
    navigate(`/single`);
  };

  return (
    <div className="product">
      <h1>Some Products</h1>
      <div className="products">
        {loader ? (
          <Loader />
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProduct(product.id)}
            >
              {
                imgLoader? (
                  <div class="loaderImg"></div>
                ) : (
                  <img src={product.thumbnail} alt={product.title} />
                )
              }
              <h2>{product.title}</h2>
              <div className="info">
                <p>$ {product.price}</p>
                <p>
                  <FaStar style={{ color: "yellow" }} /> {product.rating}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
