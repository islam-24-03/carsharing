import Header from "./components/Header/Header";
import About from "./components/about/About";
import Pricing from "./components/Pricing/Pricing";
import Calculator from "./components/Calculator/Calculator";
import LoyaltyProgram from "./components/LoyaltyProgram/LoyaltyProgram";
import OurCars from "./components/services/OurCars";
import BookingForm from "./components/body/BookingForm";
import Contact from "./components/contact/Contact";
import "./components/body/style.css"; 

const App = () => {
  return (
    <>
      <Header />
      <div id="home"></div>
      <About />
      <OurCars />
      <Pricing />
      <Calculator />
      <LoyaltyProgram />
      <BookingForm />
      <Contact />
    </>
  );
};

export default App;
