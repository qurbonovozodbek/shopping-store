import React from "react";
import Globe from "react-globe.gl";
import "../layout/home.css";
import watch from "../assets/watch.png";
import moto from "../assets/moto.png";
import shoe from "../assets/shoe.png";
import { NavLink, useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { CgMenuBoxed } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";

function Home() {
  const navigate = useNavigate();

  const cities = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    { name: "Beijing", lat: 39.9042, lng: 116.4074 },
    { name: "Moscow", lat: 55.7558, lng: 37.6173 },
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
    { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "Seoul", lat: 37.5665, lng: 126.978 },
    { name: "Singapore", lat: 1.3521, lng: 103.8198 },
    { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
    { name: "Hong Kong", lat: 22.3964, lng: 114.1095 },
    { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
    { name: "Jakarta", lat: -6.1751, lng: 106.865 },
    { name: "Osaka", lat: 34.6937, lng: 135.5022 },
    { name: "Chicago", lat: 41.8781, lng: -87.6298 },
    { name: "Toronto", lat: 43.6532, lng: -79.3832 },
    { name: "Dallas", lat: 32.7767, lng: -96.797 },
    { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
    { name: "Cairo", lat: 30.0444, lng: 31.2357 },
    { name: "Berlin", lat: 52.52, lng: 13.405 },
    { name: "Rome", lat: 41.9028, lng: 12.4964 },
    { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
    { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
    { name: "Lagos", lat: 6.5244, lng: 3.3792 },
    { name: "Kuala Lumpur", lat: 3.139, lng: 101.6869 },
    { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
    { name: "Madrid", lat: 40.4168, lng: -3.7038 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "Barcelona", lat: 41.3851, lng: 2.1734 },
    { name: "Toronto", lat: 43.65107, lng: -79.347015 },
    { name: "Lima", lat: -12.0464, lng: -77.0428 },
    { name: "Riyadh", lat: 24.7136, lng: 46.6753 },
    { name: "Johannesburg", lat: -26.2041, lng: 28.0473 },
    { name: "Tehran", lat: 35.6892, lng: 51.389 },
    { name: "Baghdad", lat: 33.3152, lng: 44.3661 },
    { name: "Hanoi", lat: 21.0285, lng: 105.8542 },
    { name: "Lagos", lat: 6.5244, lng: 3.3792 },
    { name: "Santiago", lat: -33.4489, lng: -70.6693 },
    { name: "Athens", lat: 37.9838, lng: 23.7275 },
    { name: "Nairobi", lat: -1.2921, lng: 36.8219 },
    { name: "Kinshasa", lat: -4.4419, lng: 15.2663 },
    { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
    { name: "Manila", lat: 14.5995, lng: 120.9842 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
    { name: "Montreal", lat: 45.5017, lng: -73.5673 },
    { name: "Guangzhou", lat: 23.1291, lng: 113.2644 },
    { name: "Lahore", lat: 31.5497, lng: 74.3436 },
    { name: "Kabul", lat: 34.5553, lng: 69.2075 },
    { name: "Karachi", lat: 24.8607, lng: 67.0011 },
    { name: "Vienna", lat: 48.2082, lng: 16.3738 },
    { name: "Budapest", lat: 47.4979, lng: 19.0402 },
    { name: "Brussels", lat: 50.8503, lng: 4.3517 },
    { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
    { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
    { name: "Warsaw", lat: 52.2297, lng: 21.0122 },
    { name: "Sao Paulo", lat: -23.5505, lng: -46.6333 },
    { name: "Bucharest", lat: 44.4268, lng: 26.1025 },
    { name: "Copenhagen", lat: 55.6761, lng: 12.5683 },
    { name: "Helsinki", lat: 60.1695, lng: 24.9354 },
    { name: "Oslo", lat: 59.9139, lng: 10.7522 },
    { name: "Dublin", lat: 53.3498, lng: -6.2603 },
    { name: "Lisbon", lat: 38.7223, lng: -9.1393 },
    { name: "Prague", lat: 50.0755, lng: 14.4378 },
    { name: "Zurich", lat: 47.3769, lng: 8.5417 },
    { name: "Bogota", lat: 4.711, lng: -74.0721 },
    { name: "Brasilia", lat: -15.8267, lng: -47.9218 },
    { name: "Caracas", lat: 10.4806, lng: -66.9036 },
    { name: "Lusaka", lat: -15.3875, lng: 28.3228 },
    { name: "Gaborone", lat: -24.6282, lng: 25.9231 },
    { name: "Maputo", lat: -25.9699, lng: 32.5732 },
    { name: "Addis Ababa", lat: 9.0327, lng: 38.7469 },
    { name: "Algiers", lat: 36.7372, lng: 3.0863 },
    { name: "Accra", lat: 5.6037, lng: -0.187 },
  ];

  return (
    <div className="home">
      <div className="hero">
        <div className="left">
          <h1>Welcome to our Store!</h1>
          <p>
            Welcome to our online store, your one-stop destination for
            high-quality products across fashion, beauty, electronics, home
            décor, and more. We offer a wide selection of items at affordable
            prices. Enjoy the convenience of shopping from home with secure
            transactions and fast delivery. Happy shopping!
          </p>
          <button className="hero-btn" onClick={() => navigate('/product')} >Shop Now</button>
        </div>
        <div className="hero-right">
          <Globe
            width={500}
            height={500}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            pointsData={cities}
            pointLat={(d) => d.lat}
            pointLng={(d) => d.lng}
            pointLabel={(d) => d.name}
            pointColor={() => "#135d66"}
            pointAltitude={0.02}
            pointSize={5}
            labelsData={cities}
            labelLat={(d) => d.lat}
            labelLng={(d) => d.lng}
            labelText={(d) => d.name}
            labelSize={1.5}
            labelColor={() => "#e3fef7"}
            backgroundColor="#135d66"
            arcColor={() => "blue"}
            pathColor={() => "orange"}
            ringColor={() => "orange"}
          />
        </div>
      </div>
      <div className="section-one">
        <div className="section-one-left">
          <div className="title">
            <span>new</span>
            <h2>Rolex Submariner Watch</h2>
          </div>
          <p>
            The Rolex Submariner is a legendary dive watch with a rich history.
            Known for its durability and water resistance, it's a symbol of
            adventure and exploration.
          </p>
          <button className="Btn" onClick={() => navigate("/mensWatches")}>
            see product
          </button>
        </div>
        <div className="section-one-right">
          <img src={watch} alt="" />
        </div>
      </div>
      <div className="section-two">
        <div className="section-one-right">
          <img src={moto} alt="" />
        </div>
        <div className="section-one-left">
          <div className="title">
            <span>new</span>
            <h2>MotoGP CI.H1</h2>
          </div>
          <p>
            The MotoGP CI.H1 is a high-performance motorcycle inspired by MotoGP
            racing technology. It offers cutting-edge features and precision
            engineering for an exhilarating riding experience.
          </p>
          <button className="Btn" onClick={() => navigate("/motorcycle")}>
            see product
          </button>
        </div>
      </div>
      <div className="section-three">
        <div className="section-one-left">
          <div className="title">
            <span>new</span>
            <h2>Sports Sneakers Off White & Red</h2>
          </div>
          <p>
            The Sports Sneakers in Off White and Red combine style and
            functionality, making them a fashionable choice for sports
            enthusiasts. The red and off-white color combination adds a bold and
            energetic touch.
          </p>
          <button className="Btn" onClick={() => navigate("/mensShoes")}>
            see product
          </button>
        </div>
        <div className="section-one-right">
          <img src={shoe} alt="" />
        </div>
      </div>
      <div className="footer">
        <div className="logo">
          <HiShoppingBag className="logo-icon" size={40} />
          <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Store
          </h1>
        </div>
        <nav>
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
        </nav>
        <div className="copyright">
          <p className="p1">Copyright &copy; 2021</p>
          <p className="p2" >All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
