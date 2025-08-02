// import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface BasicCardProps {
  title: string;
  description: string;
}

export default function BasicCard({ title, description }: BasicCardProps) {
  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 2,
        padding: 3,
        background: 'linear-gradient(135deg, #cfe9ff, #eaf6ff)', // Gradient background
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography gutterBottom sx={{ color: '#555', fontWeight: 400 , fontSize: 25}}>
          {title}
        </Typography>
        <Typography
          sx={{ fontWeight: 700, color: '#000', mt: 2, fontSize: '24px' }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
