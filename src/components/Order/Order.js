import "./Order.css"

function Order() {
  return(
    <div className="container container__garage">
    <div className="row">
      <div className="col-sm-12 col-sm-12__car">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a className="breadcrumb__link" href="/garage">Мои машины</a></li>
            <li className="breadcrumb-item active" aria-current="page">Новый запрос</li>
          </ol>
        </nav>
      </div>
      <div className="col-sm-12 col-sm-12__order-form">
        <form className="order__form">
          <h3 className="order-form__title">Новый запрос</h3>
          <div className="mb-3 mb-3__order">
            <select className="form-select form-select__garage form-select__order" aria-label="Default select example">
              <option selected>Тип ТС *</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select form-select__garage form-select__order" aria-label="Default select example">
              <option selected>Марка *</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select form-select__garage form-select__order" aria-label="Default select example">
              <option selected>Модель *</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select form-select__garage form-select__order" aria-label="Default select example">
              <option selected>Год выпуска *</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select className="form-select form-select__garage form-select__order" aria-label="Default select example">
              <option selected>VIN *</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="drop-zone">
              
            </div>
            <select className="form-select form-select__garage form-select__order" aria-label="Default select example">
              <option selected>Список запчастей *</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="mb-3 mb-3__about">
              <input type="text" placeholder="Город *" className="form-input__order" required/>
            </div>
            <div className="mb-3 mb-3__about">
              <input type="text" placeholder="Адрес доставки *" className="form-input__order" required/>
            </div>
            <div className="mb-3 mb-3__about">
              <input type="text" placeholder="Офис *" className="form-input__order" required/>
            </div>
          </div>
          <div className="order-form__buttons">
            <button type="submit" className="btn btn-primary btn-primary__garage btn-primary__order">Отправить</button>
            <button type="submit" className="btn-cancel">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Order