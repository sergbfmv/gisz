import "./Offers.css"
import buybtn from "../../images/buy-btn.png"
import React from "react"
import {useParams} from "react-router"
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

    React.useEffect(() => {
        getOrder()
    }, [])


    return (
        <div className="container container__garage">
            <div className="row">
                <div className="col-sm-12 col-sm-12__car">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a className="breadcrumb__link" href="/garage">Мои
                                машины</a></li>
                            <li className="breadcrumb-item active"
                                aria-current="page">{order?.brand} {order?.model}</li>
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
                        <OffersList orderId={orderId}/>
                    </table>
                </div>
                <div className="col-sm-12 col-xxl-11 col-sm-12__garage-text">
                    <p><span className="garage-text__span">Внимание!</span> Данный интернет-сайт носит исключительно
                        информационный характер и ни при каких условиях не является публичной
                        офертой. Все зарегистрированные партнеры являются самостоятельными юридическими или физическими
                        лицами, за деятельность которых
                        администрация сайта Gisz.ru ответственности не несет.</p>
                </div>
            </div>
        </div>
    )
}

export default Offers

function OffersList(props) {
    const [offers, setOffers] = React.useState(null)

    function getOffer() {
        axios.get("http://apelio.khonik.online/api/orders/" + props.orderId + "/relevant-companies", {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        })
            .then(res => {
                setOffers(res.data.companies)
            })
    }

    React.useEffect(() => {
        getOffer()
    }, [])

    let list = offers ? offers.map(offer => <OfferItem key={offer.id} orderId={props.orderId} offer={offer}/>) : null;

    return (
        <tbody>
        {list}
        </tbody>
    )
}

function OfferItem(props) {
    //const [offer, setOffer] = React.useState(null)
    const offer = props.offer;

    function selectOffer() {
        console.log(offer);
        axios.post(`http://apelio.khonik.online/api/orders/${props.orderId}/set-company`, {
            company_id: offer.id,
        }, {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        }).then(r => {
            console.log(r.data);
            // Компания выбрана, УРА!
        })
    }

    return (
        <tr>
            <td>3500 руб</td>
            <td>{offer.detail_states_label}</td>
            <td>{offer.details_state}</td>
            <td></td>
            <td>{offer.updated_at}</td>
            <td>{offer.title} {offer.address} {offer.contacts.length > 0 ? offer.contacts[0].value : '-'}</td>
            <td>
                <button onClick={selectOffer} type="button" className="buy-btn"><img src={buybtn} alt=""></img></button>
            </td>
        </tr>
    )

}