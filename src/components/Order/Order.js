import "./Order.css"
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            models: [],
            cities: [],
            selectedType: 1,
            selectedBrand: null,
            selectedModel: null,
            selectedCity: null,
            isLoading: false,
            carTypes: [
                {key: 1, value: 'легковые'},
                {key: 2, value: 'грузовые и автобусы'},
                {key: 3, value: 'мотоциклы'},
                {key: 4, value: 'спецтехника'}
            ],
            detailsCount: 0,
            details: [],

            selectedVIN: null,
            selectedAddress: null,
            selectedYear: null,
        };

        this.selectCarType = this.selectCarType.bind(this);
        this.searchBrands = this.searchBrands.bind(this);
        this.selectBrand = this.selectBrand.bind(this);
        this.searchModels = this.searchModels.bind(this);
        this.selectModel = this.selectModel.bind(this);
        this.searchCities = this.searchCities.bind(this);
        this.selectCity = this.selectCity.bind(this);

        this.submitOrder = this.submitOrder.bind(this)
        this.goBack = this.goBack.bind(this)
        this.addDetail = this.addDetail.bind(this)
        this.detailUpdated = this.detailUpdated.bind(this)
        this.getOrder = this.getOrder.bind(this)
    }

    selectCarType(e) {
        this.setState({
            selectedType: e.target.value,
        })
    }

    searchBrands(input) {
        this.setState({
            isLoading: true,
        })
        axios.get(`http://apelio.khonik.online/api/marka?type=${this.state.selectedType}&name=${input}`).then(r => {
            this.setState({
                isLoading: false,
                brands: r.data.brands,
            })
        })
    }

    selectBrand(selectedData) {
        if (selectedData.length > 0) {
            console.log(selectedData[0]);
            this.setState({
                selectedBrand: selectedData[0],
            })
        }
    }

    searchModels(input) {
        this.setState({
            isLoading: true,
        })
        axios.get("http://apelio.khonik.online/api/model?marka_id=" + this.state.selectedBrand.marka_id + "&name=" + input).then(r => {
            this.setState({
                isLoading: false,
                models: r.data.models,
            })
        })
    }

    selectModel(selectedData) {
        if (selectedData.length > 0) {
            this.setState({
                selectedModel: selectedData[0],
            })
        }
    }

    searchCities(input) {
        this.setState({
            isLoading: true,
        })
        axios.get("http://apelio.khonik.online/api/cities?name=" + input).then(r => {
            this.setState({
                isLoading: false,
                cities: r.data.data,
            })
        })
    }

    selectCity(selectedData) {
        if (selectedData.length > 0) {
            this.setState({
                selectedCity: selectedData[0],
            })
        }
    }

    submitOrder() {
        const body = {
            marka_id: this.state.selectedBrand.marka_id,
            model_id: this.state.selectedModel.model_id,
            year: this.state.selectedYear,
            vin: this.state.selectedVIN,
            city_id: this.state.selectedCity.id,
            address: this.state.selectedAddress
        };
        axios.post(`http://apelio.khonik.online/api/orders`, body, {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        }).then(response => {
            let order = response.data.data;
            // order.id -> ID заказа, нужное для прикрепления деталей к заказу
            this.state.details.forEach(detail => {
                this.attachDetailToOrder(order.id, detail)
            })
        })
    }

    attachDetailToOrder(order_id, detail) {
        axios.post(`http://apelio.khonik.online/api/details`, {
            order_id: order_id,
            name: detail.name,
            type: detail.type,
            state: detail.state
        }, {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        }).then(response => {

        })
    }

    goBack() {
        // позвращаемся в профиль
        console.log("BACK")
    }

    addDetail() {
        let currentDetails = this.state.details;
        let newDetail = {
            name: "",
            state: "",
            type: ""
        };
        currentDetails.push(newDetail);
        this.setState({
            details: currentDetails,
        })
    }

    detailUpdated(index, event) {
        let details = this.state.details;
        details[index] = event;
        this.setState({
            details: details
        })
    }

    getOrder() {
        const searchString = window.location.search;
        const searchParams = new URLSearchParams(searchString);
        const orderId = searchParams.get('copy_order');
        if (parseInt(orderId)) {
            axios.get(`http://apelio.khonik.online/api/orders/${orderId}`)
                .then(res => {
                    this.setState({
                        selectedBrand: {
                            marka_id: res.data.order.marka_id,
                            name: res.data.order.brand
                        },
                        selectedModel: {

                        },
                        selectedYear: res.data.order.year,
                        selectedVIN:res.data.order.vin,
                        selectCity: {},
                        selectedAddress: res.data.order.address
                    })

                    //document.querySelector(".brand-search input").value=res.data.order.brand;
                })
        }
    }

    componentDidMount() {
        this.getOrder()
    }

    render() {
        let typesList = this.state.carTypes.map((type) => <option key={type.key} value={type.key}>{type.value}</option>)
        let model;
        if (this.state.selectedBrand === null) {
            model = <AsyncTypeahead placeholder="Модель" disabled/>
        } else {
            model = <AsyncTypeahead
                id="model-search"
                isLoading={this.state.isLoading}
                labelKey="name"
                minLength={1}
                onSearch={this.searchModels}
                options={this.state.models}
                placeholder="Модель"
                onChange={this.selectModel}
            />
        }

        return (
            <div className="container container__order">
                <div className="row">
                    <div className="col-sm-12 col-sm-12__car">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a className="breadcrumb__link" href="/garage">Мои
                                    машины</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Новый запрос</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-sm-12 col-sm-12__order-form">
                        <form className="order__form">
                            <h3 className="order-form__title">Новый запрос</h3>
                            <div className="mb-3 mb-3__order">
                                <select className="form-select form-select__garage form-select__order"
                                        aria-label="Default select example"
                                        onChange={this.selectCarType}
                                >
                                    {typesList}
                                </select>
                                <AsyncTypeahead
                                    id="brand-search"
                                    isLoading={this.state.isLoading}
                                    labelKey="name"
                                    minLength={1}
                                    onSearch={this.searchBrands}
                                    options={this.state.brands}
                                    placeholder="Марка *"
                                    onChange={this.selectBrand}
                                    className="brand-search"
                               //     defaultInputValue={this.state.selectedBrand?.name || ''}
                                  //  selected={[this.state.selectedBrand]} // object
                                />
                                {model}
                                <input className="form-select form-select__garage form-select__order"
                                       placeholder="Год выпуска *"
                                       maxLength='4'
                                       onChange={e => this.setState({selectedYear: e.target.value})}
                                       value={this.state.selectedYear}
                                >
                                </input>
                                <input
                                    className="form-select form-select__garage form-select__order form-select__order_vin"
                                    placeholder="Vin *" maxLength='17'
                                    value={this.state.selectedVIN}
                                    onChange={e => this.setState({selectedVIN: e.target.value})}
                                >
                                </input>
                               {/*<div className="drop-zone">

        </div>*/}
                                <div className="mb-3 mb-3__about">
                                    <AsyncTypeahead
                                        id="city-search"
                                        isLoading={this.state.isLoading}
                                        labelKey="name"
                                        minLength={1}
                                        onSearch={this.searchCities}
                                        options={this.state.cities}
                                        placeholder='Город *'
                                        onChange={this.selectCity}
                                    />
                                </div>
                                <div className="mb-3 mb-3__about">
                                    <input type="text" placeholder="Адрес доставки *" className="form-input__order"
                                           required
                                           onChange={e => this.setState({selectedAddress: e.target.value})}
                                           value={this.state.selectedAddress}
                                    />
                                </div>
                                <div className="mb-3 mb-3__about">
                                    <input type="text" placeholder="Офис *" className="form-input__order" required/>
                                </div>

                                {this.state.details.map((detail, index) => <DetailForm name={detail.name}
                                                                                       type={detail.type}
                                                                                       state={detail.state}
                                                                                       index={index}
                                                                                       onChange={(event) => this.detailUpdated(index, event)}
                                />)}
                                <button type="button" className="order-button" onClick={this.addDetail}>
                                    + Добавить деталь
                                </button>
                            </div>
                            <div className="order-form__buttons">
                                <button type="button"
                                        className="btn btn-primary btn-primary__garage btn-primary__order"
                                        onClick={this.submitOrder}
                                >
                                    Отправить
                                </button>
                                <BackButton/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function BackButton() {
    const history = useNavigate()
    const redirect = path => {
        history(path)
    }
    return (
        <button type="button" className="btn-cancel" onClick={() => redirect("/")}>Отмена</button>
    )
}

class DetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: props.state,
            name: props.name,
            type: props.type,
            index: props.index
        }

        this.changeName = this.changeName.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        })

        this.detailChanged()
    }

    changeType(e) {
        this.setState({
            type: e.target.value
        })

        this.detailChanged()
    }

    changeState(e) {
        this.setState({
            state: e.target.value
        })
        this.detailChanged()
    }

    detailChanged() {
        let detail = {
            name: this.state.name,
            type: this.state.type,
            state: this.state.state,
        }
        this.props.onChange(detail)
    }

    render() {
        return (
            <div>
                <input
                    className="form-select form-select__garage form-select__order"
                    placeholder='Введите название'
                    type='text'
                    name={`name_${this.state.index}`}
                    value={this.state.name}
                    onChange={this.changeName}
                />
                <div>
                    <select className="form-select form-select__garage form-select__order"
                            aria-label="Default select example" onChange={this.changeType} id="select">
                        <option selected value={'value'}>Тип детали</option>
                        <option value={this.state.type} name={`state_${this.state.index}`}>Дешёвая стоимость</option>
                        <option value={this.state.type} name={`state_${this.state.index}`}>Качественный аналог</option>
                        <option value={this.state.type} name={`state_${this.state.index}`}>Оригинал</option>
                    </select>
                    <select className="form-select form-select__garage form-select__order"
                            aria-label="Default select example" onChange={this.changeState} id="select">
                        <option selected value={'value'}>Тип детали</option>
                        <option value={this.state.state} name={`state_${this.state.index}`}>Новая</option>
                        <option value={this.state.state} name={`state_${this.state.index}`}>Б/у</option>
                        <option value={this.state.state} name={`state_${this.state.index}`}>Любая</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Order