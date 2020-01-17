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
    <button className="button" onClick={props.onClick}>
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

  useEffect(() => {
    if (name && tel.length === 10 && tel.match(/0\d+\b/g)) {
      if (verifyState === 1) {
        // console.log("canclick")
        setPermisNext(true)
      }
    } else {
      if (verifyState === 1) {
        setPermisNext(false)
      }
    }
  }, [name, tel, verifyState])

  let goNext = () => {
    if (permisNext === true) {
      setPermisNext(false)
      setVerifyState(verifyState + 1)
    }
  }

  useEffect(() => {
    let full_otp = ""
    for (let i = 0; i < 6; i++) {
      full_otp = full_otp + otp[i]
    }
    if (
      full_otp.length === 6 &&
      full_otp.match(/\d+/g) &&
      full_otp === "102938"
    ) {
      if (verifyState === 2) {
        setPermisNext(true)
      }
    } else {
      if (verifyState === 2) {
        setPermisNext(false)
      }
    }
  }, [otp, verifyState])

  useEffect(() => {
    let full_pin = ""
    for (let i = 0; i < 6; i++) {
      full_pin = full_pin + pin[i]
    }
    if (
      full_pin.length === 6 &&
      full_pin.match(/\d+/g)
      // &&  full_otp === "102938"
    ) {
      if (verifyState === 3) {
        setPermisNext(true)
      }
    } else {
      if (verifyState === 3) {
        // setPermisNext(false)
        setPermisNext(false)
      }
    }
  }, [pin, verifyState])

  useEffect(() => {
    let full_confirmPin = ""
    let full_pin = ""
    for (let i = 0; i < 6; i++) {
      full_pin = full_pin + pin[i]
    }
    for (let i = 0; i < 6; i++) {
      full_confirmPin = full_confirmPin + confirmPin[i]
    }
    if (
      full_confirmPin.length === 6 &&
      full_confirmPin.match(/\d+/g) &&
      full_confirmPin === full_pin
    ) {
      if (verifyState === 4) {
        setPermisNext(true)
      }
    } else {
      if (verifyState === 4) {
        setPermisNext(false)
      }
    }
  }, [pin, confirmPin, verifyState])

  let inputOTP = (index, value) => {
    setOtp({ ...otp, [index]: value })
  }
  let inputPin = (index, value) => {
    setPin({ ...pin, [index]: value })
  }
  let inputConfirmPin = (index, value) => {
    setConfirmPin({ ...confirmPin, [index]: value })
  }

  let getPin = pin => {
    let pinText = ""
    for (let i = 0; i < 6; i++) {
      pinText += pin[i] ? pin[i] : ""
    }
    return pinText
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
                    setTel(e.target.value)
                  }}
                ></input>
              </div>
            </form>
            <NextButton text="ต่อไป" onClick={goNext}></NextButton>
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
            <NextButton text="ต่อไป" onClick={goNext}></NextButton>
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
                {/* <label className="input_label">กรุณาระบุ OTP</label> */}
                <InputOne
                  inputLength={6}
                  value={pin}
                  onChange={inputPin}
                ></InputOne>
              </div>
            </form>
            <NextButton text="ต่อไป" onClick={goNext}></NextButton>
          </div>
        )}
        {verifyState === 4 && (
          <div className="paper">
            <Header headerText="ตั้ง PIN" labelText={`ระบุอีกครั้ง`}></Header>
            <form className="form">
              <div className="input_bundle">
                {/* <label className="input_label">กรุณาระบุ OTP</label> */}
                <InputOne
                  inputLength={6}
                  value={confirmPin}
                  onChange={inputConfirmPin}
                ></InputOne>
              </div>
            </form>
            <NextButton text="ต่อไป" onClick={goNext}></NextButton>
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
                <p>{getPin(pin)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
