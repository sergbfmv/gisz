import "./Garage.css"
import repeatbtn from "../../images/repeat-btn.png"
import copybtn from "../../images/copy-btn.png"
import {Link, useNavigate} from "react-router-dom"
import React from "react";
import {AsyncTypeahead} from 'react-bootstrap-typeahead'; // http://ericgio.github.io/react-bootstrap-typeahead/
import axios from 'axios'

class Garage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            models: [],
            selectedStatus: null,
            selectedYear: null,
            selectedBrand: null,
            selectedModel: null,
            isLoading: false,
            orders: [],
        };

        this.searchBrands = this.searchBrands.bind(this);
        this.selectBrand = this.selectBrand.bind(this);
        this.searchModels = this.searchModels.bind(this);
        this.selectModel = this.selectModel.bind(this);
        this.getOrders = this.getOrders.bind(this)
        this.selectYear = this.selectYear.bind(this)
        this.selectStatus = this.selectStatus.bind(this)
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

  selectYear(e) {
    this.setState({
      selectedYear: e.target.value
    })
  }

  selectStatus(e) {
    this.setState({
      selectedStatus: e.target.value
    })
}


  getOrders() {
    let query = {
      brand: this.state.selectedBrand ? this.state.selectedBrand.name : "",
      model: this.state.selectedModel ? this.state.selectedModel.name : "",
      year: this.state.selectedYear ? this.state.selectedYear : "",
      status: this.state.selectedStatus ? this.state.selectedStatus : ""
    };
  
    axios.get("http://apelio.khonik.online/api/orders?" + new URLSearchParams(query).toString(), {
      headers: {
        ApiToken: localStorage.getItem('api_token')
    }
  })
  .then((res) => {
    let orders = res.data.orders
    if (orders) {
      this.setState({
       orders: orders
     })
    }
  })
}

  componentDidMount() {
    this.getOrders()
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
            <div className="container container__garage">
                <div className="row">
                    <div className="col-sm-12 col-sm-12__garage-form">
                        <form className="garage__form">
                            <div className="mb-3 mb-3__garage">
                                <AsyncTypeahead
                                  id="brand-search"
                                  isLoading={this.state.isLoading}
                                  labelKey="name"
                                  minLength={1}
                                  onSearch={this.searchBrands}
                                  options={this.state.brands}
                                  placeholder="Марка"
                                  onChange={this.selectBrand}
                                />
                                {model}
                                <input className="rbt-input rbt-input-main form-control form-control__garage"  placeholder="Год выпуска" maxLength='4' onChange={this.selectYear}></input>
          

                                <select className="rbt-input rbt-input-main form-control form-control__garage" aria-label="Default select example" onChange={this.selectStatus} id="select">
                                    <option selected value={'value'}>Состояние заказов</option>
                                    <option value="0">Новый заказ</option>
                                    <option value="1">Заказ в обработке</option>
                                    <option value="2">Ожидает товара</option>
                                    <option value="3">В доставке</option>
                                    <option value="4">Доставлено</option>
                                    <option value="5">В архиве</option>
                                </select>

                              <button type="button" className="btn btn-primary btn-primary__garage" onClick={this.getOrders}>Применить</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12 col-sm-12__garage">
                        <table className="table" id="garage-table__id">
                            <thead>
                            <tr>
                                <th scope="col" className="garage-table__title">#</th>
                                <th scope="col" className="garage-table__title">Действия</th>
                                <th scope="col" className="garage-table__title">Марка</th>
                                <th scope="col" className="garage-table__title">Год</th>
                                <th scope="col" className="garage-table__title">VIN (FRAME)</th>
                                <th scope="col" className="garage-table__title">Состояние заказа</th>
                                <th scope="col" className="garage-table__title">Комплектация</th>
                            </tr>
                            </thead>
                            <tbody>
                          {this.state.orders.map(order => 
                            <OrderItem key={order.id} order={order} />
                          )
                        }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-sm-12__garage-text">
                        <p>Для просмотра доступны не более 15 машин.</p>
                    </div>
                </div>
            </div>
        )
    }
}

function OrderItem(props) {
  const history = useNavigate()
  const redirect = path => {
    history(path)
  }

  function archiveStatus(e) {
    
    axios.post("http://apelio.khonik.online/api/orders/" + props.order.id + "/status", {
      status: "5"
  })
    .then((res) => {
      console.log("Статус изменен!")
    })
  }
  
    return(
      <tr>
        <td>{props.order.id}</td>
        <td>
            <button type="button" className="garage-table__repeat-button" onClick={() => redirect("/order?copy_order=" + props.order.id)}><img src={repeatbtn} alt=""></img></button>
            <button type="button" className="garage-table__copy-button" onClick={archiveStatus}><img src={copybtn} alt=""></img></button>
        </td>
        <td><Link to={`/garage/${props.order.id}`} className="garage-link">{props.order.brand} {props.order.model}</Link></td>
        <td>{props.order.year}</td>
        <td>{props.order.vin}</td>
        <td>{props.order.status}</td>
        <td></td>
      </tr>
    )
  }

/*function Garage() {

function OrderItem(props) {

  function archiveStatus() {
    axios.post("http://apelio.khonik.online/api/orders/" + props.orderId + "/status", {
      status: "5"
  })
    .then((res) => {
      console.log("Статус изменен!")
    })
  }


    return(
      <tr>
        <td>{props.order.id}</td>
        <td>
            <button type="button" className="garage-table__repeat-button"><img src={repeatbtn} alt="" onClick={archiveStatus}></img></button>
            <button type="button" className="garage-table__copy-button"><img src={copybtn} alt=""></img></button>
        </td>
        <td><Link to={`/garage/${props.order.id}`} className="garage-link">{props.order.brand} {props.order.model}</Link></td>
        <td>{props.order.year}</td>
        <td>{props.order.vin}</td>
        <td>{props.order.status}</td>
        <td></td>
      </tr>
    )
  }


  return (
    <div className="container container__garage">
      <div className="row">
        <div className="col-sm-12 col-sm-12__garage-form">
          <form className="garage__form">
            <div className="mb-3 mb-3__garage">
              <select className="form-select form-select__garage" aria-label="Default select example">
                <option selected>Марка</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select className="form-select form-select__garage" aria-label="Default select example">
                <option selected>Модель</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select className="form-select form-select__garage" aria-label="Default select example">
                <option selected>Год машины</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-primary__garage">Применить</button>
          </form>
        </div>
        <div className="col-sm-12 col-sm-12__garage">
          <table className="table" id="garage-table__id">
            <thead>
              <tr>
                <th scope="col" className="garage-table__title">#</th>
                <th scope="col" className="garage-table__title">Действия</th>
                <th scope="col" className="garage-table__title">Марка</th>
                <th scope="col" className="garage-table__title">Год</th>
                <th scope="col" className="garage-table__title">VIN (FRAME)</th>
                <th scope="col" className="garage-table__title">Комплектация</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>№19346</td>
                <td>
                  <button type="button" className="garage-table__repeat-button"><img src={repeatbtn} alt=""></img></button>
                  <button type="button" className="garage-table__copy-button"><img src={copybtn} alt=""></img></button>
                </td>
                <td><Link to="/car" className="garage-link">BMW 6 GT Liftback (G32) 2.0 (249Hp) (B48B20) RWD AT</Link></td>
                <td>2018</td>
                <td>34235245</td>
                <td></td>
              </tr>
              <tr>
                <td>№18248</td>
                <td>
                  <button type="button" className="garage-table__repeat-button"><img src={repeatbtn} alt=""></img></button>
                  <button type="button" className="garage-table__copy-button"><img src={copybtn} alt=""></img></button>
                </td>
                <td><Link to="/car" className="garage-link">Cadillac Escalade SUV (L86) 6.2 (409Hp) (GMT K2) 4WD AT</Link></td>
                <td>2011</td>
                <td>614613</td>
                <td></td>
              </tr>
              <tr>
                <td>№204</td>
                <td>
                  <button type="button" className="garage-table__repeat-button"><img src={repeatbtn} alt=""></img></button>
                  <button type="button" className="garage-table__copy-button"><img src={copybtn} alt=""></img></button>
                </td>
                <td><Link to="/car" className="garage-link">Aston Martin Vanquish Coupe 5.9 (565Hp) (AM11) RWD AT</Link></td>
                <td>2007</td>
                <td>353721</td>
                <td></td>
              </tr>
              <tr>
                <td>№74629</td>
                <td>
                  <button type="button" className="garage-table__repeat-button"><img src={repeatbtn} alt=""></img></button>
                  <button type="button" className="garage-table__copy-button"><img src={copybtn} alt=""></img></button>
                </td>
                <td><Link to="/car" className="garage-link">Tesla Model X SUV 0.0E (525Hp) 4WD AT</Link></td>
                <td>2020</td>
                <td>12432543</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 col-sm-12__garage-text">
          <p>Для просмотра доступны не более 15 машин.</p>
        </div>
      </div>
    </div>
  )
}
*/
export default Garage