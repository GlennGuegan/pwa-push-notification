# PWA with push notification

Building PWA with vanilla JS and express server to send push notification.

## Run Locally

Clone the project

```bash
  git clone https://gitlab.com/minicrash/vanilla-pwa-push-notification.git
```

Go to the project directory

```bash
  cd vanilla-pwa-push-notification
```

Install dependencies

```bash
  pnpm install
```

Start the development server

```bash
  pnpm start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. To Generate `VAPID_*` run this command `npx web-push generate-vapid-keys` and copy/past into `.env` file.

```
PORT=3000
VAPID_SUBJECT="mailto: <test@test.test>"
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
```

## Appendix

Check in your OS, if notification browser **activated**

## Authors

- [@GlennGuegan](https://github.com/GlennGuegan)

## License

[MIT](https://choosealicense.com/licenses/mit/)
