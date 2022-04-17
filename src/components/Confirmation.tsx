import React from 'react'
import axios from 'axios'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  api: string
  emailInSubmit: string
  togleUnsubscribeConfirmation: () => void
  modifyInformatioAreaType: (type: SeverityType) => void
  showInformationArea: (show: boolean) => void
}

enum SeverityType {
  SUCCESSS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

type apiResponse = { unsubscribed: boolean }

const Confirmation = ({
  api,
  emailInSubmit,
  togleUnsubscribeConfirmation,
  modifyInformatioAreaType,
  showInformationArea,
}: Props) => {
  const [open, _setOpen] = React.useState(true)

  const handleNo = () => {
    // setOpen(false)
    togleUnsubscribeConfirmation()
  }

  const handleYes = () => {
    axios
      .post<apiResponse>(`${api}/unsubscribe`, { email: emailInSubmit })
      .then((res) => {
        if (res.data.unsubscribed) {
          modifyInformatioAreaType(SeverityType.INFO)
          showInformationArea(true)
        }
      })
      .catch((err) => {
        modifyInformatioAreaType(SeverityType.ERROR)
        showInformationArea(true)
      })

    togleUnsubscribeConfirmation()
  }

  return (
    <Dialog open={open} onClose={handleNo}>
      <DialogTitle>Do you want to unsubscribe?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Email ${emailInSubmit} was found as subscribed. Do you want to unsubscribe?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation
