import "./Garage.css"
import repeatbtn from "../../images/repeat-btn.png"
import copybtn from "../../images/copy-btn.png"
import {Link} from "react-router-dom"
import React from "react";
import {AsyncTypeahead} from 'react-bootstrap-typeahead'; // http://ericgio.github.io/react-bootstrap-typeahead/
import axios from 'axios'

class Garage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            selectedBrand: null,
            isLoading: false,
        };

        this.searchBrands = this.searchBrands.bind(this);
        this.selectBrand = this.selectBrand.bind(this);
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

    render() {
        return (
            <div className="container container__garage">
                <div className="row">
                    <div className="col-sm-12 col-sm-12__garage-form">
                        <form className="garage__form">
                            <div className="mb-3 mb-3__garage">
                                <AsyncTypeahead
                                    id="brand-search"
                                    className=""
                                    isLoading={this.state.isLoading}
                                    labelKey="name"
                                    minLength={1}
                                    onSearch={this.searchBrands}
                                    options={this.state.brands}
                                    placeholder="Выберите марку"
                                    onChange={this.selectBrand}
                                />

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
                                    <button type="button" className="garage-table__repeat-button"><img src={repeatbtn}
                                                                                                       alt=""></img>
                                    </button>
                                    <button type="button" className="garage-table__copy-button"><img src={copybtn}
                                                                                                     alt=""></img>
                                    </button>
                                </td>
                                <td><Link to="/car" className="garage-link">BMW 6 GT Liftback (G32) 2.0 (249Hp) (B48B20)
                                    RWD AT</Link></td>
                                <td>2018</td>
                                <td>34235245</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>№18248</td>
                                <td>
                                    <button type="button" className="garage-table__repeat-button"><img src={repeatbtn}
                                                                                                       alt=""></img>
                                    </button>
                                    <button type="button" className="garage-table__copy-button"><img src={copybtn}
                                                                                                     alt=""></img>
                                    </button>
                                </td>
                                <td><Link to="/car" className="garage-link">Cadillac Escalade SUV (L86) 6.2 (409Hp) (GMT
                                    K2) 4WD AT</Link></td>
                                <td>2011</td>
                                <td>614613</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>№204</td>
                                <td>
                                    <button type="button" className="garage-table__repeat-button"><img src={repeatbtn}
                                                                                                       alt=""></img>
                                    </button>
                                    <button type="button" className="garage-table__copy-button"><img src={copybtn}
                                                                                                     alt=""></img>
                                    </button>
                                </td>
                                <td><Link to="/car" className="garage-link">Aston Martin Vanquish Coupe 5.9 (565Hp)
                                    (AM11) RWD AT</Link></td>
                                <td>2007</td>
                                <td>353721</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>№74629</td>
                                <td>
                                    <button type="button" className="garage-table__repeat-button"><img src={repeatbtn}
                                                                                                       alt=""></img>
                                    </button>
                                    <button type="button" className="garage-table__copy-button"><img src={copybtn}
                                                                                                     alt=""></img>
                                    </button>
                                </td>
                                <td><Link to="/car" className="garage-link">Tesla Model X SUV 0.0E (525Hp) 4WD AT</Link>
                                </td>
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
}

/*function Garage() {
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