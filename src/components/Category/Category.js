import "./Category.css"
import cars from "../../images/cars.png"
import truck from "../../images/truck.png"
import moto from "../../images/moto.png"
import spec from "../../images/spec.png"

function Category() {
  return (
    <div className="container-sm container-sm__category">
      <p className="part-of part-of__line">03/05</p>
      <div className="row row__catalog">
        <div className="col-sm-9">
          <h2 className="elements__title">Категории</h2>
        </div>
        <div className="box">
          <div className="elements-row">
            <div className="element">
              <img src={cars} alt="Двигатели" className="image__row"></img>
              <h3 className="element__title">Легковые</h3>
            </div>
            <div className="element">
              <img src={truck} alt="МКПП" className="image__row"></img>
              <h3 className="element__title">Грузовые</h3>
            </div>
            <div className="element">
              <img src={moto} alt="Автостекла" className="image__row"></img>
              <h3 className="element__title">Мотоциклы</h3>
            </div>
            <div className="element">
              <img src={spec} alt="Кузовные детали" className="image__row"></img>
              <h3 className="element__title">Спецтехника</h3>
            </div>
          </div>
        </div>
      </div>
      <p className="part-of part-of__line part-of__line_bottom">04/05</p>
    </div>
  )
}

export default Category