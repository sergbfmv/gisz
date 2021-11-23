import "./RegisterPopup.css"
import InputMask from "react-input-mask"

function RegisterPopup(props) {
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
        const response = await fetch("http://apelio.khonik.online/api/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                phone: document.getElementById("reg-phone").value,
            }) // body data type must match "Content-Type" header
        })
        const data = await response.json();
        if (data.status === "success") {
            // ITS OK
        } else {
            // SOMETHING WENT WRONG
        }
    }

    async function checkCode() {
        const response = await fetch("http://apelio.khonik.online/api/confirm-phone", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                phone: document.getElementById("reg-phone").value,
                phone_code: document.getElementById("reg-text").value,
            }) // body data type must match "Content-Type" header
        })
        const data = await response.json();
        if (data.errors_count === 0) {
            // ITS OK
            let token = data.data.api_token;
            localStorage.setItem('api_token', token);
            // Запомнили токен - значит, авторизовались
        } else {
            // SOMETHING WENT WRONG
        }
    }
}

export default RegisterPopup