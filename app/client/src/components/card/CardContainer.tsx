import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface CardContainerProps {
    title?: string; // Optional title for the card
    background?: string; // Optional background color for the card
    children: React.ReactNode; // The content inside the card
    maxWidth?: string; // To allow flexible width control
}

const CardContainer: React.FC<CardContainerProps> = ({ title,background, children, maxWidth = '600px' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '2rem',
            }}
        >
            <Card
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth,
                    padding: '2rem',
                    borderRadius: '10px',
                    backgroundColor: background||'#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                {title && (
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            marginBottom: '1rem',
                            fontWeight: 600,
                            color: '#303067',
                        }}
                    >
                        {title}
                    </Typography>
                )}
                <CardContent>{children}</CardContent>
            </Card>
        </Box>
    );
};

export default CardContainer;
