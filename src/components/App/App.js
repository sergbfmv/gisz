import React from 'react';
import './App.css';
import '../../vendor/normalize.css'
import '../../vendor/fonts/fonts.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import {Route, Routes} from 'react-router';
import Garage from '../Garage/Garage';
import Car from '../Car/Car';
import Offers from '../Offers/Offers';
import Order from '../Order/Order';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import PrivateWrapper from '../PrivateWrapper/PrivatWrapper';
import PageNotFound from '../PNF/PNF';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.authToken = localStorage.getItem("api_token");

        this.state = {isLogin: !!this.authToken, popupOpened: false};

        // Эта привязка обязательна для работы `this` в колбэке.
        this.setAuthState = this.setAuthState.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    setAuthState() {
        this.authToken = localStorage.getItem("api_token");
        this.setState({
            isLogin: !!this.authToken
        });
    }

    exitAuth() {
      localStorage.removeItem("api_token");
      this.setState({
        isLogin: this.authToken
    });
    }

    openPopup() {
        this.setState({
            popupOpened: true
        })
    }

    closePopup() {
        this.setAuthState();
        this.setState({
            popupOpened: false,
        })
    }

    render() {
        let popup;
        if (this.state.popupOpened) {
            popup = <RegisterPopup onClose={this.closePopup}/>;
        }
        return (
            <div className="page">
                <main className="main">
                    <Header isLogin={this.state.isLogin} openPopup={this.openPopup} exitAuth={this.exitAuth}/>
                    <Routes>
                      <Route exact path="/" element={<Main/>}/>
                      <Route element={<PrivateWrapper isLogin={this.state.isLogin} />}>
                        <Route path="/garage" element={<Garage/>}/>
                        <Route path="/garage/:orderId" element={<Car/>}/>
                        <Route path="/offers/:orderId" element={<Offers/>}/>
                        <Route path="/order" element={<Order/>}/>
                      </Route>
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <Footer/>
                    {popup}
                </main>
            </div>
        )
    }
}

/*function App() {
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
}*/

export default App;
