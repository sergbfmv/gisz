import "./Contacts.css"
import map from "../../images/map.png"
import circle3 from "../../images/circle3.png"

function Contacts() {
  return (
    <section className="contact">
      <div className="contacts__box">
        <div className="contacts__header">
          <p className="part-of part-of__line">05/05</p>
          <h2 className="contacts__title">Контакты</h2>
          <img src={circle3} alt="" className="circle"></img>
        </div>
        <div className="contacts__blocks">
          <div className="contacts__block">
            <p className="block__paragraph">Адрес:</p>
            <p className="block__text">Волгоградский пр-т., 43, к. 3, Москва, 109316</p>
          </div>
          <div className="contacts__block">
            <p className="block__paragraph">Телефон:</p>
            <p className="block__text">+7 (925) 680-16-00 </p>
            <p className="word">На связи 24/07</p>
          </div>
          <div className="contacts__block">
            <p className="block__paragraph">E-mail:</p>
            <p className="block__text">info@glez.com</p>
          </div>
        </div>
      </div>
      <div className="contacts__map" style={{ backgroundImage: `url(${map})`}}>
        </div>
    </section>
  )
}

export default Contacts