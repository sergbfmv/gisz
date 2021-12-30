import './About.css'
import InputMask from "react-input-mask"
import axios from "axios";

function About() {

  let phone,name = "";

  function recall(){
      axios.post("http://apelio.khonik.online/api/recall",{
          phone:phone,
          name:name,
      }).then(r=>{
          if(r.data.errors_count===0){
              alert("Заявка отправлена")
          } else{
              alert("Ошибка при заполнении полей")
          }
      })
  }

  return (
    <div className="container-sm container-sm__about">
    <div className="row">
      <div className="col-sm-6 col-sm-6__about">
        <p className="part-of">01/05</p>
        <h2 className="about__title">Профессиональный подбор запчастей</h2>
        <p className="about__text">Лишь сторонники тоталитаризма в науке являются только методом политического участия и рассмотрены.</p>
      </div>
      <div className="col-sm-6 col-sm-6__form">
        <form className="about__form">
          <div className="mb-3 mb-3__about">
            <label className="form-label">Поможем Вам найти запчасти</label>
            <InputMask onChange={e => phone=e.target.value} mask="+7 999 999 99 99" type="tel" id="phone" name="phone" placeholder="+7 999 999 99 99" className="form-controler" required />
          </div>
          <div className="mb-3 mb-3__about">
            <input onChange={e => name=e.target.value} type="text" placeholder="Имя" className="form-controler"/>
          </div>
          <button type="button" onClick={recall} className="btn btn-primary btn-primary__about">Отправить</button>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12 col-sm-12__about">
        <h3>Этапы работы:</h3>
      </div>
      <div className="col-sm-2">
        <h4 className="col-sm-2__title">01</h4>
        <p className="col-sm__text">Заявка</p>
      </div>
      <div className="col-sm-2">
        <h4 className="col-sm-2__title">02</h4>
        <p className="col-sm__text">Подбор</p>
      </div>
      <div className="col-sm-2">
        <h4 className="col-sm-2__title">03</h4>
        <p className="col-sm__text">Заказ</p>
      </div>
      <div className="col-sm-2">
        <h4 className="col-sm-2__title">04</h4>
        <p className="col-sm__text">Предоплата</p>
      </div>
      <div className="col-sm-2">
        <h4 className="col-sm-2__title">05</h4>
        <p className="col-sm__text">Доставка</p>
      </div>
      <div className="col-sm-2">
        <h4 className="col-sm-2__title">Готово</h4>
      </div>
    </div>
  </div>
  )
}

export default About