import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Icon from '../icon';
import closeIcon from '../../assets/icons/action/close.svg';

interface CustomisedSnackbarProps {
  open: boolean;
  testId?: string;
  message: string;
  multipleSelectedItems?: any[]; 
  action?: 'pin' | string;
  onClick?: () => void;
  clickHandler?: () => void;
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const CustomisedSnackbar: React.FC<CustomisedSnackbarProps> = ({
  open,
  testId,
  message,
  multipleSelectedItems = [],
  action,
  onClick,
  clickHandler,
  onClose
}) => {
  return (
    <Snackbar
      data-testid={testId}
      open={open}
      autoHideDuration={10000}
      message={message}
      action={
        <>
          {action === 'pin' && multipleSelectedItems.length <= 1 && (
            <Button
              sx={{
                backgroundColor: '#FAFAFA',
                // color: '#000000',
                '&:hover': {
                  // backgroundColor: '#FAFAFA'
                }
              }}
              size="small"
              onClick={onClick}
            >
              Undo
            </Button>
          )}
          <Icon
            type="pointer"
            padding="2.1px 3.5px 3px 3px"
            src={closeIcon}
            clickHandler={clickHandler}
            alt="closeSnackbar"
            testId="closeSnackbar"
          />
        </>
      }
      onClose={onClose}
    />
  );
}

export default CustomisedSnackbar;