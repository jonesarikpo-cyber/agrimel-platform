import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Storefront from './Storefront'
import './styles.css'

const path=window.location.pathname.replace(/\/$/,'')
const Root=path==='/store'?Storefront:App
createRoot(document.getElementById('root')!).render(<React.StrictMode><Root/></React.StrictMode>)
