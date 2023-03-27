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
