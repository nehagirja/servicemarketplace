import React from 'react';
import { Button as MuiButton, ButtonProps, styled } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  text?: string;
  onClick: () => void;
  width?: string;
  height?: string;
  borderRadius?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => 
    !['width', 'height', 'borderRadius', 'borderColor', 'backgroundColor', 'hoverColor'].includes(prop as string),
})<CustomButtonProps>(({ theme, width, height, borderRadius, borderColor, backgroundColor, hoverColor }) => ({
  textTransform: 'none',
  fontWeight: 500,
  width: width || '100%',
  height: height || '40px',
  borderRadius: borderRadius || '10px',
  border: `1px solid ${borderColor || 'black'}`,
  backgroundColor: backgroundColor || 'transparent',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: hoverColor || theme.palette.action.hover,
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px',
  },
  '& .MuiButton-endIcon': {
    marginLeft: '8px',
  },
}));

const Button: React.FC<CustomButtonProps> = ({
  variant = 'outlined',
  color = 'inherit',
  fullWidth = true,
  startIcon,
  endIcon,
  text,
  onClick,
  width,
  height,
  borderRadius,
  borderColor,
  backgroundColor,
  hoverColor,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      width={width}
      height={height}
      borderRadius={borderRadius}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default Button;