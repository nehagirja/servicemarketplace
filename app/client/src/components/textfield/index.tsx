import React from 'react';
import { Box, Typography, InputBase, styled } from '@mui/material';
import { InputBaseProps } from '@mui/material/InputBase';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    borderColor?: string;
    margin?: string;
    disabled?: boolean; // Add the disabled prop
}

interface CustomInputBaseProps extends InputBaseProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    borderColor?: string;
    disabled?: boolean; // Add the disabled prop here too
}

const StyledInputBase = styled(InputBase)<CustomInputBaseProps>(
    ({ width, height, borderRadius, borderColor, disabled }) => ({
        width: width || '100%',
        fontSize: '13px',
        height: height || '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: `1px solid ${borderColor || 'rgba(48, 48, 103, 0.5)'}`,
        borderRadius: borderRadius || '60px',
        padding: '4px 8px',
        color: 'black', // Change text color when disabled
        '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)', // Change placeholder color when disabled
        },
        pointerEvents: disabled ? 'none' : 'auto', // Prevent interaction when disabled
    })
);

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    width,
    height,
    borderRadius,
    borderColor,
    margin,
    disabled = false, // Default to not disabled
}) => {
    return (
        <Box
            width={width}
            margin={margin}>
            <Typography
                variant="body1"
                sx={{
                    fontSize: '12px',
                    mb: 0.2,
                    paddingLeft: '2px',
                    textAlign: 'left',
                    color: 'rgba(0, 0, 0, 0.9)',
                }}
            >
                {label}
            </Typography>
            <StyledInputBase
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type={type}
                height={height}
                borderRadius={borderRadius}
                borderColor={borderColor}
                disabled={disabled} // Pass the disabled prop
            />
        </Box>
    );
};

export default InputField;
