import React from 'react';
import { CircularProgress, useTheme } from '@material-ui/core';

export default function Loading() {
  const theme = useTheme();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress style={{ color: theme.palette.common.primary }} />
    </div>
  );
}
