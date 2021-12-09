import axios from "axios"
import React from "react"
import { Link, useParams } from "react-router-dom"
import "./Car.css"

function Car(props) {
  const [order, setOrder] = React.useState(null)
  const [offer, setOffer] = React.useState(null)

  let {orderId} = useParams()

  function getOrder() {
    axios.get("http://apelio.khonik.online/api/orders/" + orderId, {
      headers: {
        ApiToken: localStorage.getItem('api_token')
      }
    })
    .then(res => {
      setOrder(res.data.order)
    })
  }

  React.useEffect(()=>{
    getOrder()
  }, [])

  function getOffer() {
    axios.get("http://apelio.khonik.online/api/orders/" + orderId + "/relevant-companies", {
      headers: {
        ApiToken: localStorage.getItem('api_token')
      }
    })
    .then(res => {
      setOffer(res.data.companies)
    })
  }
  
  React.useEffect(()=>{
    getOffer()
  }, [])

  return (
    <div className="container container__garage">
      <div className="row">
        <div className="col-sm-12 col-sm-12__car">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a className="breadcrumb__link" href="/garage">Мои машины</a></li>
              <li className="breadcrumb-item active" aria-current="page">{order?.brand} {order?.model}</li>
            </ol>
          </nav>
        </div>
        <div className="col-sm-12 col-sm-12__garage">
          <table className="table" id="car-table__id">
            <thead>
              <tr>
                <th scope="col" className="garage-table__title garage-table__title-car">Запрос №{order?.id}</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Ответы</th>
                <th scope="col" className="garage-table__title garage-table__title-car">Лучшие предложения</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link to={`/offers/${orderId}`} className="garage-link">{order?.brand} {order?.model}</Link></td>
                <td>{offer?.length}</td>
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