import React, { useState } from 'react'

import InfomationArea from './components/InfomationArea'
import Header from './components/Header'
import Instructions from './components/Instructions'
import SubmitForm from './components/SubmitForm'
import Confirmation from './components/Confirmation'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

let api: string
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  api = 'http://localhost:3001/api'
} else {
  api = '/api'
}

enum SeverityType {
  SUCCESSS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

const App = () => {
  const [showInformation, setShowInformation] = useState(false)
  const [informationType, setInformationType] = useState(SeverityType.SUCCESSS)
  const [emailInSubmit, setEmailInSubmit] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const showInformationArea = (show: boolean) => {
    show ? setShowInformation(true) : setShowInformation(false)
  }

  const modifyInformatioAreaType = (type: SeverityType) => {
    setInformationType(type)
  }

  const setSubmittedEmail = (email: string) => {
    setEmailInSubmit(email)
  }

  const togleUnsubscribeConfirmation = () => {
    setShowConfirmation(!showConfirmation)
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <Instructions />
        <SubmitForm
          api={api}
          modifyInformatioAreaType={modifyInformatioAreaType}
          showInformationArea={showInformationArea}
          setSubmittedEmail={setSubmittedEmail}
          togleUnsubscribeConfirmation={togleUnsubscribeConfirmation}
        />
        {showInformation && <InfomationArea severity={informationType} />}
        {showConfirmation && (
          <Confirmation
            api={api}
            togleUnsubscribeConfirmation={togleUnsubscribeConfirmation}
            emailInSubmit={emailInSubmit}
            modifyInformatioAreaType={modifyInformatioAreaType}
            showInformationArea={showInformationArea}
          />
        )}
      </Container>
    </div>
  )
}

export default App
