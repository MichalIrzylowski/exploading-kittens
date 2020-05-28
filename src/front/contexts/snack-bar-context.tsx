import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

import { SnackBarGroup, SnackbarMessage } from '@front/components/snack-bar-group';

type TSnackBarContext = Dispatch<SetStateAction<SnackbarMessage[]>>;

const SnackBarContext = createContext<TSnackBarContext | null>(null);

export const SnackBarProvider: React.FC = ({ children }) => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  return (
    <SnackBarContext.Provider value={setSnackPack}>
      {children}
      <SnackBarGroup snackPack={snackPack} setSnackPack={setSnackPack} />
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  const value = useContext(SnackBarContext);

  if (!value) throw new Error('useSnackBar has to be used inside SnackBarProvider');

  return value;
};
