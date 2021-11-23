import { Link } from 'react-router-dom';
import './Header.css'

function Header(props) {
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
}

export default Header;