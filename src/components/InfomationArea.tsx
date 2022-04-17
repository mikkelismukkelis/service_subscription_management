import React from 'react'

import Alert, { AlertColor } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

interface Props {
  severity: string
}

const getAlertContent = (checkString: string) => {
  if (checkString === 'success') {
    return { title: 'Subscribed', text: 'Subscription successful' }
  } else if (checkString === 'error') {
    return { title: 'Error', text: 'Something went wrong' }
  } else if (checkString === 'warning') {
    return {
      title: 'Check Email',
      text: 'Email is not in correct format, please check and try again',
    }
  } else if (checkString === 'info') {
    return { title: 'Unsubscribed', text: 'Unsubscribed succesfully' }
  } else {
    return { title: 'Dunno', text: 'Whats happening' }
  }
}

const InfomationArea = ({ severity }: Props) => {
  const alertContent = getAlertContent(severity)

  return (
    <Alert sx={{ marginTop: '50px' }} severity={severity as AlertColor}>
      <AlertTitle>{alertContent.title}</AlertTitle>
      {alertContent.text}
    </Alert>
  )
}

export default InfomationArea
