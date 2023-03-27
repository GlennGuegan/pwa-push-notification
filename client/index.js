const VAPID_PUBLIC_KEY =
  "BKSIQInNLkapJJqXtKu_mlKpDrdHNoX7Oyr6oVRi5doFqGEhtUEGRf_PsqKp5GKOzsHlk9vq5O6eJEXUHHUZEJI"

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
        registerServiceWorker()
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err)
      }
    )
}
