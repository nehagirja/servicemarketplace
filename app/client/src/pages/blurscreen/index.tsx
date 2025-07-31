import React from 'react';
import { Grid } from '@mui/material';

interface BlurBackgroundComponentProps {
  children: React.ReactNode;
  placeholderText?: string;
}

const BlurBackgroundComponent: React.FC<BlurBackgroundComponentProps> = ({ children, placeholderText }) => {
  return (
    <>
      {placeholderText && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1,
            overflowY: 'hidden',
            fontSize: '20px',
          }}
        >
          {placeholderText}
        </div>
      )}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
          filter: 'blur(5px)',
          backgroundSize: 'cover',
          overflow: 'hidden',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {children}
      </Grid>
    </>
  );
};

export default BlurBackgroundComponent;
