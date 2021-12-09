import "./Offers.css"
import buybtn from "../../images/buy-btn.png"
import React from "react"
import { useParams } from "react-router"
import axios from "axios"

function Offers(props) {
  const [order, setOrder] = React.useState(null)


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
        <h3 className="offers__title">Запрос №{order?.id} от {order?.created_at}</h3>
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
            <OfferItem orderId={orderId} />
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

function OfferItem(props) {
  const [offer, setOffer] = React.useState(null)

  function getOffer() {
    axios.get("http://apelio.khonik.online/api/orders/" + props.orderId + "/relevant-companies", {
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

  return(
    <tbody>
    <tr>
      <td>3500 руб</td>
      <td>{offer && offer.length>0 ? offer[0]?.detail_states_label : null}</td>
      <td>{offer && offer.length>0 ? offer[0]?.details_state : null}</td>
      <td></td>
      <td>{offer && offer.length>0 ? offer[0]?.updated_at : null}</td>
      <td>{offer && offer.length>0 ? offer[0]?.title : null} {offer && offer.length>0 ? offer[0]?.address : null} {offer && offer.length>0 ? offer[0]?.contacts[0].value : null}</td>
      <td><button type="button" className="buy-btn"><img src={buybtn} alt=""></img></button></td>
    </tr>
  </tbody>
  )
}