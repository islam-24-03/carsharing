import Header from "./components/Header/Header";
import About from "./components/about/About";
import OurCars from "./components/services/OurCars";
import BookingForm from "./components/body/BookingForm";
import Contact from "./components/contact/Contact";
import "./components/body/style.css"; // Импорт стилей

const App = () => {
  return (
    <>
      <Header />
      <div id="home"></div>
      <About />
      <OurCars />
      <BookingForm />
      <Contact />
    </>
  );
};

export default App;
