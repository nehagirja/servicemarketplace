import React from 'react';
import { Tooltip, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { stringReducer } from '../../utils/helpers';

interface OverflowTooltipProps {
  title: string;
  id?: string;
  length: number;
  fontSize?: string;
  color?: string;
  width?: string | number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  clickHandle?: React.MouseEventHandler<HTMLDivElement>;
  marginBottom?: string | number;
  fontFamily?: string;
  height?: string | number;
}

const OverflowTooltip: React.FC<OverflowTooltipProps> = ({
  title,
  id,
  length,
  fontSize,
  color,
  width,
  position,
  clickHandle,
  marginBottom,
  fontFamily,
  height,
}) => {
  return (
    <Tooltip
      sx={{ color: (theme) => theme.palette.text.primary }}
      disableInteractive={false} // Replace `interactive` with `disableInteractive`
      placement={position || 'top'}
      title={title.length > length ? title : ''}
    >
      <Grid
        sx={{
          height: height || undefined,
          width: width || undefined,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: fontSize || '14px',
          color: color || ((theme) => theme.palette.text.primary),
          fontFamily: fontFamily || 'DM Sans',
          userSelect: color === 'transparent' ? 'none' : 'auto',
          marginBottom: marginBottom || undefined,
        }}
        onClick={clickHandle}
      >
        {id ? (
          <Link style={{ color: '#CBCBD7', textDecoration: 'none' }} to={`/graph/${id}`} state={{}}>
            {stringReducer(title, length)}
          </Link>
        ) : (
          stringReducer(title, length)
        )}
      </Grid>
    </Tooltip>
  );
};

export default OverflowTooltip;
