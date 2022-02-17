import "./RegisterPopup.css"
import InputMask from "react-input-mask"
import axios from 'axios'
import React from 'react'

class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            onClose: props.onClose,
            SMSSent: false,
            phone: "",
            phoneCode: ""
        };

        this.close = this.close.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.sendSMSCode = this.sendSMSCode.bind(this);
    }

    sendSMSCode() {
        // AJAX
        axios.post('login', {
            phone: this.state.phone,
        }).then(response => {
            this.setState({
                SMSSent: true
            })
        })
    }

    checkCode() {
        axios.post('confirm-phone', {
            phone: this.state.phone,
            phone_code: this.state.phone_code,
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

    close() {
        this.props.onClose()
    }

    render() {
        let actualForm = <form className="popup__form">
            <InputMask mask="+7 999 999 99 99" type="tel" id="reg-phone" name="reg-phone" onChange={e => this.setState({phone: e.target.value})}
                       placeholder="+7 999 999 99 99" className="popup__placeholder" required/>
            <button type="button" name="save" className="popup__code-button"
                    onClick={this.sendSMSCode}>
                На указаный номер поступит звонок
            </button>
        </form>
        if (this.state.SMSSent) {
            actualForm = <form className="popup__form">
                <input type="text" id="reg-text" name="reg-text" placeholder="Введите последние 4 цифры номера, с которого звонили"
                       className="popup__placeholder" required onChange={e => this.setState({phone_code: e.target.value})}/>
                <button type="button" name="save" className="popup__save-button"
                        onClick={this.checkCode}>Сохранить
                </button>
            </form>
        }
        return (
            <section className={this.state.isOpen ? `popup popup_opened` : `popup`}>
                <div className="popup__container">
                    <button className="popup__close-button" type="button" onClick={this.close}></button>
                    <h2 className="popup__title">Регистрация</h2>
                    {actualForm}
                </div>
            </section>
        );
    }
}

export default RegisterPopup