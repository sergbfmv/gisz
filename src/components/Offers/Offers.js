import "./Offers.css"
import buybtn from "../../images/buy-btn.png"
import React from "react"
import {useParams} from "react-router"
import axios from "axios"
import moment from "moment"
import 'moment/locale/ru'

function Offers(props) {
    const [order, setOrder] = React.useState(null)

    let {orderId} = useParams()

    function getOffer() {
        axios.get("orders/" + orderId, {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        })
            .then(res => {
                setOrder(res.data.order)
            })
    }

    React.useEffect(() => {
        getOffer()
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
                <h3 className="offers__title">Запрос №{order?.id} от {order?.created_at}</h3>
                <p className="offers__text">Предложения компаний:</p>
                <div className="col-sm-12 col-sm-12__garage col-sm-12__offers">
                    <table className="table" id="offers-table__id">
                        <thead>
                        <tr>
                            <th scope="col" className="garage-table__title garage-table__title-car">Цена</th>
                            <th scope="col" className="garage-table__title garage-table__title-car">Состояние</th>
                            <th scope="col" className="garage-table__title garage-table__title-car">Возможности оплаты
                            </th>
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
    const [isSelected, setIsSelected] = React.useState(false)

    function getOffer() {
        axios.get("orders/" + props.orderId + "/relevant-companies", {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        })
            .then(res => {
                setOffers(res.data.companies)
                setIsSelected(res.data.is_selected);
            })
    }

    React.useEffect(() => {
        getOffer()
    }, [])

    let list = offers ? offers.map(offer => <OfferItem onSelected={getOffer} isSelected={isSelected} key={offer.id} orderId={props.orderId}
                                                       offer={offer}/>) : null;

    return (
        <tbody>
        {list}
        </tbody>
    )
}

function OfferItem(props) {
    const offer = props.offer;
    const isSelected = props.isSelected;

    function selectOffer() {
        axios.post(`orders/${props.orderId}/set-company`, {
            company_id: offer.id,
        }, {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        }).then(r => {
            console.log(r.data);
            // Компания выбрана, УРА!
            props.onSelected()

        })
    }

    moment.locale()

    let action;
    if (isSelected) {
        if (offer.is_selected) {
            action = <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
        }
    } else {
        action =
            <button onClick={selectOffer} type="button" className="buy-btn"><img src={buybtn} alt=""></img></button>
    }


    return (
        <tr>
            <td>3500 руб</td>
            <td>{offer.detail_states_label}</td>
            <td>{offer.payment_type_label}</td>
            <td>
                Часы работы: {offer.working_hours}<br/>
                Доставка: {offer.with_delivery ? 'Есть' : 'Нет'}
            </td>
            <td>{moment(offer.updated_at).format('LLL')}</td>
            <td>{offer.title}<br/>{offer.address}<br/>{offer.contacts.length > 0 ? offer.contacts[0].value : '-'}</td>
            <td>
                {action}
            </td>
        </tr>
    )

}