async function registerServiceWorker() {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    }

    // serviceWorkerRegistration.pushManager
    //   .getSubscription()
    //   .then((subscription) => subscription.unsubscribe())

    serviceWorkerRegistration.pushManager.subscribe(options).then(
      async (pushSubscription) => {
        console.log(pushSubscription)
        // The push subscription details needed by the application
        // server are now available, and can be sent to it using,
        // for example, an XMLHttpRequest.
        await fetch("/subscribe", {
          method: "POST",
          body: JSON.stringify(pushSubscription),
          headers: {
            "Content-Type": "application/json",
          },
        })
      },
      (error) => {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.error(error)
      }
    )
  })

  // const subscription = await register.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: VAPID_PUBLIC_KEY,
  // })
}

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
