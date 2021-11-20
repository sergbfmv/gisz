import { Link } from "react-router-dom"
import "./Car.css"

function Car() {
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
        <div className="col-sm-12 col-sm-12__garage">
          <table className="table" id="car-table__id">
            <thead>
              <tr>
                <th scope="col" className="garage-table__title garage-table__title-car">Запрос №20050313</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Ответы</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Лучшие предложения</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link to="/offers" className="garage-link">BMW 6 GT Liftback (G32) 2.0 (249Hp) (B48B20) RWD AT</Link></td>
                <td>1/0</td>
                <td>"Автодеталь"</td>
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

export default Car