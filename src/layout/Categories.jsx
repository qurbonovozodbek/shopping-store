import React, { useEffect, useState } from "react";
import "../layout/category.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

function Categories() {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  } , [])
  return (
    <div className="category">
      <h1>All Categories</h1>
      {
        loader ? ( <Loader/> ) : (
          <div className="category-lists">
        <div id="card" className="card1">
          <button className="btn" onClick={() =>  navigate('/beauty')}>beauty</button>
        </div>
        <div id="card" className="card2">
          <button className="btn" onClick={() =>  navigate('/fragrances')}>fragrances</button>
        </div>
        <div id="card" className="card3">
          <button className="btn" onClick={() =>  navigate('/furniture')}>furniture</button>
        </div>
        <div id="card" className="card4">
          <button className="btn" onClick={() =>  navigate('/groceries')}>groceries</button>
        </div>
        <div id="card" className="card5">
          <button className="btn" onClick={() =>  navigate('/homeDecoration')}>home decoration</button>
        </div>
        <div id="card" className="card6">
          <button className="btn" onClick={() =>  navigate('/kitchenAccessories')}>kitchen accessories</button>
        </div>
        <div id="card" className="card7">
          <button className="btn" onClick={() =>  navigate('/laptops')}>laptops</button>
        </div>
        <div id="card" className="card8">
          <button className="btn" onClick={() =>  navigate('/mensShirts')}>mens shirts</button>
        </div>
        <div id="card" className="card9">
          <button className="btn" onClick={() =>  navigate('/mensShoes')}>mens shoes</button>
        </div>
        <div id="card" className="card10">
          <button className="btn" onClick={() =>  navigate('/mensWatches')}>mens watches</button>
        </div>
        <div id="card" className="card11">
          <button className="btn" onClick={() =>  navigate('/mobileAccess')}>mobile accessories</button>
        </div>
        <div id="card" className="card12">
          <button className="btn" onClick={() =>  navigate('/motorcycle')}>motorcycle</button>
        </div>
        <div id="card" className="card13">
          <button className="btn"onClick={() =>  navigate('/skin-care')}>skin care</button>
        </div>
        <div id="card" className="card14">
          <button className="btn" onClick={() =>  navigate('/smartphones')}>smartphones</button>
        </div>
        <div id="card" className="card15">
          <button className="btn" onClick={() =>  navigate('/sports-accessories')}>sports accessories</button>
        </div>
        <div id="card" className="card16">
          <button className="btn" onClick={() =>  navigate('/sunglasses')}>sunglasses</button>
        </div>
        <div id="card" className="card17">
          <button className="btn" onClick={() =>  navigate('/tablets')}>tablets</button>
        </div>
        <div id="card" className="card18">
          <button className="btn" onClick={() =>  navigate('/tops')}>tops</button>
        </div>
        <div id="card" className="card19">
          <button className="btn"onClick={() =>  navigate('/vehicle')}>vehicle</button>
        </div>
        <div id="card" className="card20">
          <button className="btn" onClick={() =>  navigate('/womens-bags')}>women bags</button>
        </div>
        <div id="card" className="card21">
          <button className="btn" onClick={() =>  navigate('/womens-dresses')}>women dresses</button>
        </div>
        <div id="card" className="card22">
          <button className="btn" onClick={() =>  navigate('/womens-jewellery')}>women jewelry</button>
        </div>
        <div id="card" className="card23">
          <button className="btn" onClick={() =>  navigate('/womens-shoes')}>women shoes</button>
        </div>
        <div id="card" className="card24">
          <button className="btn" onClick={() =>  navigate('/womens-watches')}>women watches</button>
        </div>
      </div>
        )
      }
    </div>
  );
}

export default Categories;
