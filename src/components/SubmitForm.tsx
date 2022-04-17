import React, { useState } from 'react'
import axios from 'axios'
import * as EmailValidator from 'email-validator'

import { Box, TextField, Button } from '@mui/material'

const boxStyling = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}

const buttonBoxStyling = {
  ...boxStyling,
  marginTop: '20px',
}

enum SeverityType {
  SUCCESSS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface Props {
  api: string
  modifyInformatioAreaType: (type: SeverityType) => void
  showInformationArea: (show: boolean) => void
  setSubmittedEmail: (email: string) => void
  togleUnsubscribeConfirmation: () => void
}

type apiResponse = { result: { subscribed: boolean } }

const validateEmail = (mail: string) => {
  return EmailValidator.validate(mail)
}

const SubmitForm = ({
  api,
  modifyInformatioAreaType,
  showInformationArea,
  setSubmittedEmail,
  togleUnsubscribeConfirmation,
}: Props) => {
  const [email, setEmail] = useState('')

  const handleInputChange = (event: any) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const isValidEmail = validateEmail(email)

    if (!isValidEmail) {
      modifyInformatioAreaType(SeverityType.WARNING)
      showInformationArea(true)
      return
    }

    axios
      .post<apiResponse>(`${api}/subscribe`, { email: email })
      .then((res) => {
        if (res.data.result.subscribed) {
          setSubmittedEmail(email)
          modifyInformatioAreaType(SeverityType.SUCCESSS)
          showInformationArea(true)
          setEmail('')
        } else {
          setSubmittedEmail(email)
          setEmail('')
          togleUnsubscribeConfirmation()
        }
      })
      .catch((err) => {
        setSubmittedEmail(email)
        modifyInformatioAreaType(SeverityType.ERROR)
        showInformationArea(true)
        setEmail('')
      })
  }

  return (
    <React.Fragment>
      <Box sx={boxStyling}>
        <TextField
          sx={{ width: '100%', marginTop: '20px' }}
          id="email"
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={handleInputChange}
          autoFocus
        />
      </Box>
      <Box sx={buttonBoxStyling}>
        <Button
          sx={{ width: '100%', height: '56px' }}
          variant="contained"
          onClick={handleSubmit}
        >
          Add / Remove Subscription
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default SubmitForm
