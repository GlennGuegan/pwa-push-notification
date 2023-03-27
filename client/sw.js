self.addEventListener("install", (event) => {
  console.log("Service Worker installing.")
})

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.")
})

self.addEventListener("fetch", (event) => {
  console.log("Service Worker fetch.")
})

self.addEventListener("push", async function (e) {
  const data = e.data.json()

  console.log("push event", data)

  self.registration.showNotification(data.title, {
    body: data.body,
  })
})
