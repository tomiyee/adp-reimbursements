import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';

// A popup modal using Material UI that allows the user to attach a file to a voucher
const AttachModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Attach File</DialogTitle>
      <DialogContent>
        <DialogContentText>Attach a file to this voucher.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="File Name"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="File"
          type="file"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Attach
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttachModal;
