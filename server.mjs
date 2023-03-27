import express from "express"
import webPush from "web-push"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import * as dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
app.use(bodyParser.json())

const subject = process.env.VAPID_SUBJECT
const publicKey = process.env.VAPID_PUBLIC_KEY
const privateKey = process.env.VAPID_PRIVATE_KEY

app.use(express.static(path.join(__dirname, "client")))

webPush.setVapidDetails(subject, publicKey, privateKey)

app.post("/subscribe", async (req, res) => {
  const subscription = req.body
  const payload = JSON.stringify({
    title: "Hello Body",
    body: "Fist notification !! ",
  })

  try {
    const data = await webPush.sendNotification(subscription, payload)
    res.status(201).json({ data })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ error })
  }
})

const port = 3000
const hostname = "localhost"

app.listen(port, hostname, () => {
  console.log(`Server start on port ${port}`)
})