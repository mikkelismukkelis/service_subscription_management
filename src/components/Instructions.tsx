import React from 'react'

import { Typography, Box } from '@mui/material'

const boxStyling = {
  display: 'flex',
  width: '100%',
  height: '150px',
  marginTop: '10px',
  alignItems: 'center',
  justifyContent: 'center',
}

const Instructions = () => {
  return (
    <Box sx={boxStyling}>
      <Typography variant="body1">
        Type email to textfield. Click "Add / Remove Subscription" button. If
        email not found, then subscription is added. If email already
        subscribed, then you get confirmation about unsubscription.
      </Typography>
    </Box>
  )
}

export default Instructions
