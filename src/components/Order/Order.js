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
            selectedBrand: null,
            selectedModel: null,
            selectedCity: null,
            isLoading: false,
        };

        this.searchBrands = this.searchBrands.bind(this);
        this.selectBrand = this.selectBrand.bind(this);
        this.searchModels = this.searchModels.bind(this);
        this.selectModel = this.selectModel.bind(this);
        this.searchCities = this.searchCities.bind(this);
        this.selectCity = this.selectCity.bind(this);
    }

    searchBrands(input) {
        this.setState({
            isLoading: true,
        })
        axios.get("http://apelio.khonik.online/api/marka?type=1&name=" + input).then(r => {
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

    render() {
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
                                        aria-label="Default select example">
                                    <option selected>Тип ТС *</option>
                                    <option value="1">Леговые автомобили</option>
                                    <option value="2">Грузовые автомобили</option>
                                    <option value="3">Мотоциклы</option>
                                    <option value="3">Спецтехника</option>
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
                                       placeholder="Год выпуска *" maxLength='4'>
                                </input>
                                <input
                                    className="form-select form-select__garage form-select__order form-select__order_vin"
                                    placeholder="Vin *" maxLength='17'>
                                </input>
                                <div className="drop-zone">

                                </div>
                                <select className="form-select form-select__garage form-select__order"
                                        aria-label="Default select example">
                                    <option selected>Список запчастей *</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
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
                                           required/>
                                </div>
                                <div className="mb-3 mb-3__about">
                                    <input type="text" placeholder="Офис *" className="form-input__order" required/>
                                </div>
                            </div>
                            <div className="order-form__buttons">
                                <button type="submit"
                                        className="btn btn-primary btn-primary__garage btn-primary__order">Отправить
                                </button>
                                <button type="submit" className="btn-cancel">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order