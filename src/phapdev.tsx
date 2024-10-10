import React, { useRef, useState } from 'react';
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Phapdev = () => {
  const [open, setOpen] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);

  const handleShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Phapdev
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={window.location.href}
          inputRef={linkRef}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={{ ml: 1 }}
        >
          Share
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Link copied to clipboard!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <ContentCopyIcon fontSize="small" />
          </React.Fragment>
        }
      />
    </Box>
  );
};

export default Phapdev;
