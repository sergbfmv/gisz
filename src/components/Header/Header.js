import { Link } from 'react-router-dom';
import './Header.css'
import React from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let button;
    let addButton;
    if (this.props.isLogin) {
      addButton = <Link to="/order" type="button" className="btn btn-warning btn-order"><span> Новый заказ</span></Link>
      button = <Link to="/garage" type="button" className="btn btn-primary btn-primary__header"><span>Личный кабинет</span></Link>;
    } else {
      button = <button type="button" className="btn btn-warning" onClick={this.props.openPopup}><span>Регистрация</span></button>;
    }
    return (
        <div className="header">
          <div className="header__box">
            <div className="header__content">
              <Link to="/" className="header__title">gisz.ru</Link>
              <div className="header__links">
                {addButton}
                {button}
              </div>
            </div>
          </div>
        </div>
    )
  }
}
/*function Header(props) {
  return (
    <div className="header">
      <div className="header__box">
        <div className="header__content">
          <Link to="/" className="header__title">gisz.ru</Link>
          <div className="header__links">
            <button type="button" className="btn btn-warning" onClick={props.openPopup}><span>Регистрация</span></button>
            <Link to="/garage" type="button" className="btn btn-primary btn-primary__header"><span>Личный кабинет</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}*/

export default Header;