import './Footer.css'
import arrow  from '../../images/arrow.svg'

function Footer() {
  return (
  <div className="footer">
    <div className="footer__box">
      <div className="footer__content">
        <h2 className="footer__title">gisz.ru</h2>
        <div className="footer__links">
          <div className="contacts">
            <a className="phone" href="tel:+79256801600">+7 (925) 680-16-00</a>
            <p className="text">• Операторы на связи 24/07</p>
          </div>
          <button type="button" className="btn btn-primary btn-primary__footer"><img src={arrow} alt="Стрелка вверх" className="footer-button-image"></img></button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer