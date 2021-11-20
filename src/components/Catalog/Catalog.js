import "./Catalog.css"
import first from "../../images/1.png"
import second from "../../images/2.png"
import third from "../../images/3.png"
import fourth from "../../images/4.png"
import five from "../../images/5.png"
import six from "../../images/6.png"
import seven from "../../images/7.png"
import eight from "../../images/8.png"


function Catalog() {
  return (
    <div className="container-sm container-sm__elements">
      <p className="part-of part-of__line">02/05</p>
      <div className="row row__catalog">
        <div className="elements__box">
          <div className="col-sm-9">
            <h2 className="elements__title">Каталог нашей продукции</h2>
          </div>
          <div className="col-sm-3 col-sm-3__elements-text">
            <p className="elements__text">*Гарантия на все комплектующие</p>
          </div>
        </div>
        <div className="box">
          <div className="elements">
            <div className="element">
              <img src={first} alt="Двигатели" className="element__image"></img>
              <h3 className="element__title">Двигатели</h3>
              <p className="element__text">Двигатели для иностранных авто. Новые! Под заказ.</p>
            </div>
            <div className="element">
              <img src={second} alt="МКПП" className="element__image"></img>
              <h3 className="element__title">МКПП и АКПП</h3>
              <p className="element__text">Трансмиссии и коробка передач на иномарки.</p>
            </div>
            <div className="element">
              <img src={third} alt="Автостекла" className="element__image"></img>
              <h3 className="element__title">Автостекла</h3>
              <p className="element__text">Лобовые, задние и боковые стекла для автомобилей.</p>
            </div>
            <div className="element">
              <img src={fourth} alt="Кузовные детали" className="element__image"></img>
              <h3 className="element__title">Кузовные детали</h3>
              <p className="element__text">Бампера, двери, капоты, крыши багажника, крыши иномарок.</p>
            </div>
            <div className="element">
              <img src={five} alt="Оптика" className="element__image"></img>
              <h3 className="element__title">Оптика</h3>
              <p className="element__text">Фонари переднего освещения, противотуманные фары.</p>
            </div>
            <div className="element">
              <img src={six} alt="Подвеска" className="element__image"></img>
              <h3 className="element__title">Детали подвески</h3>
              <p className="element__text">Амортизаторы, рычаги, сайлентблоки и стойки для авто</p>
            </div>
            <div className="element">
              <img src={seven} alt="Масла" className="element__image"></img>
              <h3 className="element__title">Масла и жидкости</h3>
              <p className="element__text">Моторные и трансмиссионные масла, жидкости АКПП и ГУРа</p>
            </div>
            <div className="element">
              <img src={eight} alt="Комплектующие" className="element__image"></img>
              <h3 className="element__title">Комплекты для ТО</h3>
              <p className="element__text">Комплекты для прохождения ТО у офф. дилеров</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog