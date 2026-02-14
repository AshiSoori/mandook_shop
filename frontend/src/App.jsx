import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Tshirts from "./Components/Tshirts";
import Trousers from "./Components/Trousers";
import Cart from "./Components/Cart";
import CartProvider from "./store/cartProvider";
import DataProvider from "./store/DataContext";
import CardItem from "./Components/CardItem";
import CheckOut from "./Components/Checkout";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import AddAddress from "./Components/AddAddress";
// import EditProducts from "./AdminControlComponents/EditProducts";
// import EditProductForm from "./AdminControlComponents/EditProductForm";
// import AddProductForm from "./AdminControlComponents/AddProductForm";
import ContactUs from "./Components/ContactUs";

import OrderDetail from "./Components/OrderDetail";

const App = () => {
  return (
    <DataProvider>
      <CartProvider>
        {/* <BrowserRouter basename="/mandook_shop"> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Tshirts" element={<Tshirts />} />
            <Route path="/Trousers" element={<Trousers />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="/products/:type/:code" element={<CardItem />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/AddAddress" element={<AddAddress />} />
            {/* <Route path="/EditProducts" element={<EditProducts />} />
            <Route
              path="/EditProductForm/:code"
              element={<EditProductForm />}
            />
            <Route path="/AddProductForm" element={<AddProductForm />} /> */}
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </DataProvider>
  );
};

export default App;
