import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import About from "./components/about/About";
import Pricing from "./components/Pricing/Pricing";
import Calculator from "./components/Calculator/Calculator";
import LoyaltyProgram from "./components/LoyaltyProgram/LoyaltyProgram";
import OurCars from "./components/services/OurCars";
import BookingForm from "./components/body/BookingForm";

import AdminPanel from "./pages/admin/AdminPanel";
import Account from "./components/account/Account";

import "./components/body/style.css";
import "./styles/global.css";

const MainLanding = () => {
  return (
    <>
      <Header />
      <div id="home"></div>
      <About />
      <OurCars />
      <BookingForm />
      <Pricing />
      <Calculator />
      <LoyaltyProgram />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/account" element={<Account />} />  {/* <-- добавили маршрут */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
