const express = require("express")
const app = express()
// const cors = require("cors")

var rp = require("request-promise")
const PORT = 1150

// app.use(cors())
app.use(express.json())

app.post("/linenotify", async (req, res) => {
  //   jaotin group = xur9ggdIPAQlADPjnenYFVe7ModVVoJh5ojxfUPey84
  //   salapao group = B2lBPHjAKYeLs1g4VFdBfl8eYLZoDVVsCjwJo1oUB2j
  if (!req.body.token || !req.body.message) {
    return res.status(400).json({ errors: "token or message not valid" })
  }
  const config = {
    method: "POST",
    uri: "https://notify-api.line.me/api/notify",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      bearer: req.body.token
    },
    form: {
      message: req.body.message
    },
    json: true,
    resolveWithFullResponse: true
  }
  try {
    const result = await rp(config)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ errors: "can't send data" })
  }
})

app.use((req, res) => {
  res.status(404).json({ errors: "not found" })
})

app.listen(PORT, () => {
  console.log(`http:localhost:${PORT}`)
})
