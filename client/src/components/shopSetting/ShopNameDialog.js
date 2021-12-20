import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import { CircularProgress } from '@material-ui/core';
export default function FormDialog(props) {
  const t = props.languageJson;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shopDataSubmitHandler = async () => {
    await props.shopDataSubmitHandler();
    handleClose();
  };
  return (
    <div>
      <Link
        variant="h3"
        style={{ color: '#305085' }}
        color="primary"
        onClick={handleClickOpen}
      >
        {t['Edit Shop Setting']}
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{t['Shop Details']} </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t['Shop Name']}
            type="text"
            fullWidth
            value={props.shop.shopName}
            onChange={(e) =>
              props.setShop({ ...props.shop, shopName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="name"
            label={t['Shop Description']}
            type="text"
            fullWidth
            value={props.shop.shopDescription}
            onChange={(e) =>
              props.setShop({ ...props.shop, shopDescription: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ color: '#fff', backgroundColor: '#088178' }}
          >
            {t['Close']}
          </Button>
          <Button
            variant="contained"
            onClick={shopDataSubmitHandler}
            style={{ color: '#fff', backgroundColor: '#088178' }}
            disabled={props.loading}
          >
            {props.loading ? <CircularProgress /> : t['Save']}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
