import React, { useState, useEffect, useCallback } from 'react';

import { SnackBar } from '@front/components/snack-bar';

import { TSnackSeverity } from '@shared/snack-messages';

export interface SnackbarMessage {
  message: string;
  key: number;
  severity: TSnackSeverity;
}

interface ISnackBarGroup {
  snackPack: SnackbarMessage[];
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessage[]>>;
}

export const SnackBarGroup: React.FC<ISnackBarGroup> = (props) => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  useEffect(() => {
    if (props.snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...props.snackPack[0] });
      props.setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (props.snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [props.snackPack, messageInfo, open]);

  const handleClose = () => (event?: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('dupa');
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <SnackBar open={open} setClose={handleClose} onExited={handleExited} severity={messageInfo?.severity}>
      {messageInfo?.message}
    </SnackBar>
  );
};
