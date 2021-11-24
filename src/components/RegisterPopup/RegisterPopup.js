import "./RegisterPopup.css"
import InputMask from "react-input-mask"
import axios from 'axios'
import React from 'react'

/*function RegisterPopup(props) {
    return (
        <section className={props.isOpen ? `popup popup_opened` : `popup`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">Регистрация</h2>
                <form className="popup__form">
                    <InputMask mask="+7 999 999 99 99" type="tel" id="reg-phone" name="reg-phone" placeholder="+7 999 999 99 99" className="popup__placeholder" required />
                    <button type="button" name="save" className="popup__code-button" onClick={sendSMSCode}>Выслать код
                        подтверждения
                    </button>
                </form>
                <form className="popup__form">
                    <input type="text" id="reg-text" name="reg-text" placeholder="Код подтверждения из СМС"
                           className="popup__placeholder" required/>
                    <button type="button" name="save" className="popup__save-button" onClick={checkCode}>Сохранить
                    </button>
                </form>
            </div>
        </section>
    )

    async function sendSMSCode() {
        // AJAX
        axios.post('http://apelio.khonik.online/api/login',{
            phone: document.getElementById("reg-phone").value,
        }).then(response=>{
            alert("СМС отправлено")
        })
    }

    async function checkCode() {
        axios.post('http://apelio.khonik.online/api/confirm-phone',{
            phone: document.getElementById("reg-phone").value,
            phone_code: document.getElementById("reg-text").value,
        }).then(response=>{
            if(response.data.errors_count>0){
                alert(response.data.msg);
            }else {
                let token = response.data.data.api_token;
                localStorage.setItem('api_token', token);
                // Закрыть попап
            }
        })
    }
}*/
class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: true, onClose: props.onClose};

        //this.onClose = this.onClose.bind(this);
        this.close = this.close.bind(this);
        this.checkCode = this.checkCode.bind(this);
    }

    sendSMSCode() {
        // AJAX
        axios.post('http://apelio.khonik.online/api/login', {
            phone: document.getElementById("reg-phone").value,
        }).then(response => {
            alert("СМС отправлено")
        })
    }

    checkCode() {
        axios.post('http://apelio.khonik.online/api/confirm-phone', {
            phone: document.getElementById("reg-phone").value,
            phone_code: document.getElementById("reg-text").value,
        }).then(response => {
            if (response.data.errors_count > 0) {
                alert(response.data.msg);
            } else {
                let token = response.data.data.api_token;
                localStorage.setItem('api_token', token);
                // Закрыть попап
                this.close()
            }
        })
    }

    close()  {
        this.props.onClose()
    }

    render() {
        return (
            <section className={this.state.isOpen ? `popup popup_opened` : `popup`}>
                <div className="popup__container">
                    <button className="popup__close-button" type="button" onClick={this.close}></button>
                    <h2 className="popup__title">Регистрация</h2>
                    <form className="popup__form">
                        <InputMask mask="+7 999 999 99 99" type="tel" id="reg-phone" name="reg-phone"
                                   placeholder="+7 999 999 99 99" className="popup__placeholder" required/>
                        <button type="button" name="save" className="popup__code-button"
                                onClick={this.sendSMSCode}>Выслать код
                            подтверждения
                        </button>
                    </form>
                    <form className="popup__form">
                        <input type="text" id="reg-text" name="reg-text" placeholder="Код подтверждения из СМС"
                               className="popup__placeholder" required/>
                        <button type="button" name="save" className="popup__save-button"
                                onClick={this.checkCode}>Сохранить
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}

export default RegisterPopup