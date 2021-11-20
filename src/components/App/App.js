import React from 'react';
import './App.css';
import '../../vendor/normalize.css'
import '../../vendor/fonts/fonts.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import { Route, Routes } from 'react-router';
import Garage from '../Garage/Garage';
import Car from '../Car/Car';
import Offers from '../Offers/Offers';
import Order from '../Order/Order';
import RegisterPopup from '../RegisterPopup/RegisterPopup';


function App() {
  const [isOpenPopup, setIsOpenPopup] = React.useState(false)

  function closeByEscape(event) {
    if (event.key === 'Escape') {
      setIsOpenPopup(false)
    }
  }

  function openPopup() {
    setIsOpenPopup(true)
    document.addEventListener('keydown', closeByEscape)
  }

  function closePopup() {
    setIsOpenPopup(false)
    document.removeEventListener('keydown', closeByEscape)
  }



  return (
    <div className="page">
      <main className="main">
        <Header openPopup={openPopup} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/car" element={<Car />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
        <RegisterPopup isOpen={isOpenPopup} onClose={closePopup} />
      </main>
    </div>
  );
}

export default App;
