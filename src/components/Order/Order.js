import "./Order.css"
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import React from "react";
import axios from "axios";

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
        this.addDetail = this.addDetail(this)
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
        axios.post(`http://apelio.khonik.online/api/orders`, {
            marka_id: this.state.selectedBrand.marka_id,
            model_id: this.state.selectedModel.model_id,
            year: this.state.selectedYear,
            vin: this.state.selectedVIN,
            city_id: this.state.selectedCity.id,
            address: this.state.selectedAddress
        }, {
            headers: {
                ApiToken: localStorage.getItem('api_token')
            }
        }).then(response => {
            let order = response.data.data;
            // order.id -> ID заказа, нужное для прикрепления деталей к заказу

        })
    }

    goBack() {
        // позвращаемся в профиль
    }

    addDetail() {
      
    }

    render() {
        let typesList = this.state.carTypes.map((type) => <option value={type.key}>{type.value}</option>)
      let model;
      if (this.state.selectedBrand === null) {
        model = <AsyncTypeahead placeholder="Модель" disabled />
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
                                    id="search brand-search"
                                    isLoading={this.state.isLoading}
                                    labelKey="name"
                                    minLength={1}
                                    onSearch={this.searchBrands}
                                    options={this.state.brands}
                                    placeholder="Марка *"
                                    onChange={this.selectBrand}
                                />
                               {model}
                                <input className="form-select form-select__garage form-select__order"
                                       placeholder="Год выпуска *"
                                       maxLength='4'
                                       onChange={e => this.setState({selectedYear: e.target.value})}
                                >
                                </input>
                                <input
                                    className="form-select form-select__garage form-select__order form-select__order_vin"
                                    placeholder="Vin *" maxLength='17'

                                    onChange={e => this.setState({selectedVIN: e.target.value})}
                                >
                                </input>
                                <div className="drop-zone">

                                </div>
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
                                    />
                                </div>
                                <div className="mb-3 mb-3__about">
                                    <input type="text" placeholder="Офис *" className="form-input__order" required/>
                                </div>
                                <button type="button" className="order-button" onClick={this.addDetail}>+ Добавить деталь</button>
                            </div>
                            <div className="order-form__buttons">
                                <button type="button"
                                        className="btn btn-primary btn-primary__garage btn-primary__order"
                                        onClick={this.submitOrder}
                                >Отправить
                                </button>
                                <button type="button" className="btn-cancel" onClick={this.goBack}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order