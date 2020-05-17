import React from 'react';

import SnackbarCore from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface ISnackBar {
  open: boolean;
  severity?: 'success' | 'info' | 'warning' | 'error';
  key?: number;
  onExited?: () => void;

  setClose: (
    event?: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => void;
}

export const SnackBar: React.FC<ISnackBar> = (props) => (
  <SnackbarCore
    open={props.open}
    onClose={props.setClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    autoHideDuration={2000}
    onExited={props.onExited}
  >
    <MuiAlert
      onClose={props.setClose}
      severity={props.severity}
      variant="filled"
    >
      {props.children}
    </MuiAlert>
  </SnackbarCore>
);
