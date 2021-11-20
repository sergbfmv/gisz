import "./Banner.css"
import phone from "../../images/phone.png"
import gplay from "../../images/gplay.png"
import astore from "../../images/astore.png"

function Banner() {
  return (
    <div className="banner">
      <div className="banner__box">
        <div className="banner__content">
          <div className="banner__buttons">
            <h3 className="banner__title">Скачивайте наше приложение</h3>
            <a href="site?" ><img src={gplay} alt="GooglePlay" className="banner__link"></img></a>
            <a href="site?" ><img src={astore} alt="AppStore" className="banner__link"></img></a>
          </div>
          <div className="banner__pic">
            <img src={phone} alt="Телефон" className="banner__image"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner