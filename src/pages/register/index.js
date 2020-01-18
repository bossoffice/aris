import React, { useState, useEffect } from "react"
import "./register.css"

let Header = props => (
  <div className="form_header">
    <p className="text_header">{props.headerText}</p>
    {props.labelText && <p className="text_label">{props.labelText}</p>}
  </div>
)

let NextButton = props => (
  <div className="next_button">
    <button
      className="button"
      onClick={props.onClick}
      disabled={!props.permisNext}
    >
      {props.text}
    </button>
  </div>
)

let InputOne = props => {
  let inputTimes = new Array(props.inputLength)
  for (let i = 0; i < props.inputLength; i++) {
    inputTimes[i] = props.value[i] ? props.value[i] : ""
  }
  const inputBox = inputTimes.map((item, index) => (
    <input
      type="text"
      key={index}
      maxLength={1}
      placeholder={0}
      value={item}
      onChange={e => {
        props.onChange(index, e.target.value.match(/\d/) ? e.target.value : "")
      }}
    ></input>
  ))
  return <div className="input_one">{inputBox}</div>
}

function Register() {
  const [verifyState, setVerifyState] = useState(1)
  const [permisNext, setPermisNext] = useState(false)
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" })
  const [pin, setPin] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" })
  const [confirmPin, setConfirmPin] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: ""
  })

  let goNext = () => {
    if (permisNext === true) {
      // setPermisNext(false)
      setVerifyState(verifyState + 1)
    }
  }

  let getValue = obj => {
    let result = ""
    for (let i = 0; i < 6; i++) {
      result = result + obj[i]
    }
    return result
  }
  useEffect(() => {
    if (verifyState === 1) {
      if (name && tel.length === 10) {
        console.log(`${verifyState} can next `)
        setPermisNext(true)
      } else {
        console.log(`${verifyState} can't next `)
        setPermisNext(false)
      }
    } else if (verifyState === 2) {
      console.log(getValue(otp))
      if (getValue(otp).length === 6 && getValue(otp) === "102938") {
        console.log(`${verifyState} can next `)
        setPermisNext(true)
      } else {
        console.log(`${verifyState} can't next `)
        setPermisNext(false)
      }
    } else if (verifyState === 3) {
      if (getValue(pin).length === 6) {
        console.log(`${verifyState} can next `)
        setPermisNext(true)
      } else {
        console.log(`${verifyState} can't next `)
        setPermisNext(false)
      }
    } else if (verifyState === 4) {
      if (
        getValue(confirmPin).length === 6 &&
        getValue(confirmPin) === getValue(pin)
      ) {
        console.log(`${verifyState} can next `)
        setPermisNext(true)
      } else {
        console.log(`${verifyState} can't next `)
        setPermisNext(false)
      }
    }
  }, [tel, name, otp, pin, confirmPin, verifyState])

  let inputOTP = (index, value) => {
    setOtp({ ...otp, [index]: value })
  }
  let inputPin = (index, value) => {
    setPin({ ...pin, [index]: value })
  }
  let inputConfirmPin = (index, value) => {
    setConfirmPin({ ...confirmPin, [index]: value })
  }

  return (
    <div className="body">
      <div className="center">
        {verifyState === 1 && (
          <div className="paper">
            <Header
              headerText="ยืนยันตัวตน"
              labelText="เพื่อความถูกต้องของข้อมูล"
            ></Header>
            <form className="form">
              <div className="input_bundle">
                <label className="input_label">ชื่อ นามสกุล</label>
                <input
                  type="text"
                  placeholder="ชื่อ นามสกุล"
                  className="input_input"
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                ></input>
              </div>
              <div style={{ marginTop: 40 }}></div>
              <div className="input_bundle">
                <label className="input_label">เบอร์โทรศัพย์</label>
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพย์"
                  className="input_input"
                  value={tel}
                  maxLength={10}
                  onChange={e => {
                    if (e.target.value.match(/^0+\d*$/)) {
                      setTel(e.target.value)
                    } else if (e.target.value === "") {
                      setTel(e.target.value)
                    }
                  }}
                ></input>
              </div>
            </form>
            <NextButton
              text="ต่อไป"
              onClick={goNext}
              permisNext={permisNext}
            ></NextButton>
          </div>
        )}
        {verifyState === 2 && (
          <div className="paper">
            <Header
              headerText="ยืนยัน OTP"
              labelText={`ของหมายเลข ${tel}`}
            ></Header>
            <form className="form">
              <div className="input_bundle">
                <label className="input_label">กรุณาระบุ OTP</label>
                <InputOne
                  inputLength={6}
                  value={otp}
                  onChange={inputOTP}
                ></InputOne>
              </div>
            </form>
            <NextButton
              text="ต่อไป"
              onClick={goNext}
              permisNext={permisNext}
            ></NextButton>
          </div>
        )}

        {verifyState === 3 && (
          <div className="paper">
            <Header
              headerText="ตั้ง PIN"
              labelText={`เพื่อใช้ยืนยันตัวตนในครั้งต่อไป`}
            ></Header>
            <form className="form">
              <div className="input_bundle">
                <label className="input_label">กรุณาระบุ OTP</label>
                <InputOne
                  inputLength={6}
                  value={pin}
                  onChange={inputPin}
                ></InputOne>
              </div>
            </form>
            <NextButton
              text="ต่อไป"
              onClick={goNext}
              permisNext={permisNext}
            ></NextButton>
          </div>
        )}

        {verifyState === 4 && (
          <div className="paper">
            <Header headerText="ตั้ง PIN" labelText={`ระบุอีกครั้ง`}></Header>
            <form className="form">
              <div className="input_bundle">
                <label className="input_label">กรุณาระบุ OTP</label>
                <InputOne
                  inputLength={6}
                  value={confirmPin}
                  onChange={inputConfirmPin}
                ></InputOne>
              </div>
            </form>
            <NextButton
              text="ต่อไป"
              onClick={goNext}
              permisNext={permisNext}
            ></NextButton>
          </div>
        )}

        {verifyState === 5 && (
          <div className="paper" style={{ boxShadow: "none" }}>
            <Header headerText="ข้อมูลสมาชิก"></Header>
            <div className="result">
              <div>
                <p>ชื่อ-นามสกุล&nbsp;:&nbsp;</p>
                <p>{name}</p>
              </div>
              <div>
                <p>หมายเลขโทรศัพย์&nbsp;:&nbsp;</p>
                <p>{tel}</p>
              </div>
              <div>
                <p>PIN&nbsp;:&nbsp;</p>
                <p>{getValue(pin)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
