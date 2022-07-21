import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import packageJson from '../package.json'

import 'normalize.css'

import './styles/app.scss'

import Root from './Root'
import * as serviceWorker from './serviceWorker'
import configureStore, { history } from './redux/store/configureStore'

const store = configureStore()

Sentry.init({
  dsn: 'https://9b869288a7e64080bc183129dc03e631@o459671.ingest.sentry.io/5459611',
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  release: `snapbook-fe@${packageJson.version}`,
  tracesSampleRate: 0.2,
  environment: process.env.SENTRY_ENVIRONMENT
})

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
