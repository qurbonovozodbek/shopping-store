import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Products from './layout/Products'
import Categories from './layout/Categories'
import Beauty from './components/Beauty'
import Fragrances from './components/Fragrances'
import Furniture from './components/Furniture'
import Groceries from './components/Groceries'
import HomeDecoration from './components/Home-decoration'
import KitchenAccessories from './components/KitchenAccessories'
import Laptops from './components/Laptops'
import MensShirts from './components/MensShirts'
import MensShoes from './components/MensShoes'
import MensWatches from './components/MensWatches'
import Single from './single/Single'
import Mobile from './components/MobileAccessories'
import Motorcycle from './components/Motorcycle'
import SkinCare from './components/SkinCare'
import Smartphone from './components/Smartphones'
import Sport from './components/SportsAccessories'
import Sunglasses from './components/Sunglasses'
import Tablet from './components/Tablets'
import Tops from './components/Tops'
import Vehicle from './components/vehicle'
import WomenBag from './components/womens-bags'
import WomenDress from './components/womens-dresses'
import WomenJeweller from './components/womens-jewellery'
import WomenShoes from './components/womens-shoes'
import WomenWatches from './components/womens-watches'
import Home from './layout/Home'
import Singleee from './single/Singleee'
import Cart from './layout/Cart'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/product' element={<Products />}/>
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/beauty' element={<Beauty />} />
        <Route path='/fragrances' element={<Fragrances />}></Route>
        <Route path='/furniture' element={<Furniture />}></Route>
        <Route path='/groceries' element={<Groceries />}></Route>
        <Route path='/homeDecoration' element={<HomeDecoration />}></Route>
        <Route path='/kitchenAccessories' element={<KitchenAccessories />}></Route>
        <Route path='/laptops' element={<Laptops />}></Route>
        <Route path='/mensShirts' element={<MensShirts />}></Route>
        <Route path='/mensShoes' element={<MensShoes />}></Route>
        <Route path='/mensWatches' element={<MensWatches />}></Route>
        <Route path='/mobileAccess' element={<Mobile />}></Route>
        <Route path='/motorcycle' element={<Motorcycle />}></Route>
        <Route path='/skin-care' element={<SkinCare />}></Route>
        <Route path='/smartphones' element={<Smartphone />}></Route>
        <Route path='/sports-accessories' element={<Sport />}></Route>
        <Route path='/sunglasses' element={<Sunglasses />}></Route>
        <Route path='/tablets' element={<Tablet />}></Route>
        <Route path='/tops' element={<Tops />}></Route>
        <Route path='/vehicle' element={<Vehicle />}></Route>
        <Route path='/womens-bags' element={<WomenBag />}></Route>
        <Route path='/womens-dresses' element={<WomenDress />}></Route>
        <Route path='/womens-jewellery' element={<WomenJeweller />}></Route>
        <Route path='/womens-shoes' element={<WomenShoes />}></Route>
        <Route path='/womens-watches' element={<WomenWatches />}></Route>
        <Route path='/single' element={<Single />}></Route>
        <Route path='/singleee' element={<Singleee />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
