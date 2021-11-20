import "./RegisterPopup.css"

function RegisterPopup(props) {
  return(
    <section className={props.isOpen ? `popup popup_opened` : `popup`}>
    <div className="popup__container">
      <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      <h2 className="popup__title">Регистрация</h2>
      <form className="popup__form">
        <input type="phone" id="reg-phone" name="reg-phone" placeholder="+7 999 999 99 99" className="popup__placeholder" required/>
        <button type="submit" name="save" className="popup__code-button">Выслать код подтверждения</button>
      </form>
      <form className="popup__form">
        <input type="text" id="reg-text" name="reg-text" placeholder="Код подтверждения из СМС" className="popup__placeholder" required/>
        <button type="submit" name="save" className="popup__save-button">Сохранить</button>
      </form>
    </div>
  </section>
  )
}

export default RegisterPopup