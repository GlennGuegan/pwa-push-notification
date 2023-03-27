const VAPID_PUBLIC_KEY =
  "BKSIQInNLkapJJqXtKu_mlKpDrdHNoX7Oyr6oVRi5doFqGEhtUEGRf_PsqKp5GKOzsHlk9vq5O6eJEXUHHUZEJI"

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js", {
      scope: ".", // <--- THIS BIT IS REQUIRED
    })
    .then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        )
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err)
      }
    )
}

const subscribeButton = document.querySelector(".subscribe")
const notifyMeButton = document.querySelector(".notify-me")

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOMContentLoaded")
  const swRegistration =
    await navigator.serviceWorker.getRegistration()
  const subscribe = await swRegistration.pushManager.getSubscription()
  if (subscribe) {
    console.info("Already subscribe")
    subscribeButton.disabled = true
    notifyMeButton.disabled = false
  }
})

subscribeButton.addEventListener("click", async (event) => {
  const swRegistration =
    await navigator.serviceWorker.getRegistration()
  const subscribe = await swRegistration.pushManager.getSubscription()

  if (Notification.permission === "granted") {
    console.info("Notification accepted !!")
  }
  if (subscribe) {
    console.info("Subscibe")
    subscribeButton.disabled = true
  } else {
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    })
    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
})

notifyMeButton.addEventListener("click", async (event) => {
  const swRegistration =
    await navigator.serviceWorker.getRegistration()
  const subscription =
    await swRegistration.pushManager.getSubscription()

  await fetch("/notify-me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscription }),
  })
})

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

    console.log(serviceWorkerRegistration)
  })

  // const subscription = await register.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: VAPID_PUBLIC_KEY,
  // })
}
