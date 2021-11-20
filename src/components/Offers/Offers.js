import "./Offers.css"
import buybtn from "../../images/buy-btn.png"

function Offers() {
  return (
    <div className="container container__garage">
      <div className="row">
        <div className="col-sm-12 col-sm-12__car">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a className="breadcrumb__link" href="/garage">Мои машины</a></li>
              <li className="breadcrumb-item active" aria-current="page">BMW 6 GT Liftback (G32) 2.0 (249Hp) (B48B20) RWD AT</li>
            </ol>
          </nav>
        </div>
        <form className="garage__form offers__form">
          <div className="mb-3 mb-3__garage mb-3__offers">
            <select className="form-select form-select__garage" aria-label="Default select example">
              <option selected>Состояние заказов</option>
              <option value="1">Активные</option>
              <option value="2">Завершённые</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-primary__garage">Применить</button>
        </form>
        <h3 className="offers__title">Запрос №20050313 от 29.10.21</h3>
        <p className="offers__text">Предложения компаний:</p>
        <div className="col-sm-12 col-sm-12__garage col-sm-12__offers">
          <table className="table" id="offers-table__id">
            <thead>
              <tr>
                <th scope="col" className="garage-table__title garage-table__title-car">Цена</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Наличие</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Состояние</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Примечание</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Дата</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Компания</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3500 руб</td>
                <td>В наличии</td>
                <td>б.у. оригинал</td>
                <td></td>
                <td>08.05.21</td>
                <td>Автодеталь Москва ул. Ижорская, дом 13/18 +7 (925) 680-16-00</td>
                <td><button type="button" className="buy-btn"><img src={buybtn} alt=""></img></button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 col-xxl-11 col-sm-12__garage-text">
          <p><span className="garage-text__span">Внимание!</span> Данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной 
            офертой. Все зарегистрированные партнеры являются самостоятельными юридическими или физическими лицами, за деятельность которых 
            администрация сайта Gisz.ru ответственности не несет.</p>
        </div>
      </div>
    </div>
  )
}

export default Offers