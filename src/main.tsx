import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Storefront from './Storefront'
import CommerceReport from './CommerceReport'
import './styles.css'

const path=window.location.pathname.replace(/\/$/,'')
const Root=path==='/store'?Storefront:path==='/commerce-report'?CommerceReport:App
createRoot(document.getElementById('root')!).render(<React.StrictMode><Root/></React.StrictMode>)
