import React, { useState, useEffect } from "react"
import { HeaderWithLabel, Button } from "../globalComponents"
import "./lineNotify.css"
import axios from "axios"

// Jaotin Line API Token xur9ggdIPAQlADPjnenYFVe7ModVVoJh5ojxfUPey84

function LineNotify() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (result) {
      setText("")
      setIsLoading(false)
    }
  }, [result])

  useEffect(() => {
    async function sendMessage() {
      try {
        const result = await axios.post("/linenotify", {
          token: "xur9ggdIPAQlADPjnenYFVe7ModVVoJh5ojxfUPey84",
          message: text
        })
        if (result.data.errors) {
          setIsLoading(false)
        } else {
          setResult(result.data)
        }
      } catch (err) {
        setIsLoading(false)
      }
    }
    if (isLoading) {
      sendMessage()
    }
  }, [text, isLoading])

  let clickSent = async () => {
    if (text) {
      setIsLoading(true)
    } else {
      alert("กรุณาใส่ข้อความ")
    }
  }
  return (
    <div className="body">
      <div className="center">
        {!isLoading && (
          <div className="paper">
            <HeaderWithLabel
              headerText="Line Notify"
              labelText="ใส่ข้อมูลที่ต้องการแจ้งเตือน"
            ></HeaderWithLabel>
            <div className="textArea">
              <textarea
                onChange={e => setText(e.target.value)}
                value={text}
              ></textarea>
            </div>
            <Button text="ส่งข้อความ" onClick={clickSent}></Button>
          </div>
        )}
        {isLoading && (
          <div className="paper">
            <HeaderWithLabel headerText="Sending..."></HeaderWithLabel>
          </div>
        )}
      </div>
    </div>
  )
}

export default LineNotify
