import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Typography, DialogTitle } from '@material-ui/core';
export default function AlertDialog(props) {
  const t = props.languageJson;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(t['']);
  const [description, setDescription] = useState(
    t['Use Your Guidlines Description Here']
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        {' '}
        <Typography variant="h6"> {t['View Full Guidelines']}</Typography>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {' '}
          <Typography variant="h4"> {title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h2"> {description}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
