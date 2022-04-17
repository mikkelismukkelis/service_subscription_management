import React from 'react'

import { Typography, Box } from '@mui/material'

const boxStyling = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20%',
}

const Header = () => {
  return (
    <Box sx={boxStyling}>
      <Typography variant="h6">Service subscription management</Typography>
    </Box>
  )
}

export default Header
