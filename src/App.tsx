import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import ProductsList from "./pages/ProductsList";
import { Reset } from "styled-reset";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Shipment from "./pages/Shipment";
import Orders from "./components/Orders";
import User from "./components/User";
import { useAppSelector } from "./redux/store";
import { createGlobalStyle } from "styled-components";
import Payments from "./pages/Payments";
import UpdateUser from "./pages/UpdateUser";
import Terms from "./pages/Terms";

const GlobalStyle = createGlobalStyle` 
:root {
  font-family: 'Kalam', cursive;
  font-size: 16px; 
}
`;

function App() {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <>
      <GlobalStyle />
      <Reset />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products/:category" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* <Route path="/product/find/:id" element={<ProductPage />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/payment" element={<Payments />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/user" element={<User />} />
        <Route path="/userupdate" element={<UpdateUser />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  );
}

export default App;
