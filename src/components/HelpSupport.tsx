import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const HelpAndSupport: React.FC = () => {
    return (
        <Container maxWidth="md" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Help and Support
            </Typography>
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Contact Support
            </Typography>
            <Typography variant="body1" gutterBottom>
                If you need further assistance, feel free to reach out via email:
            </Typography>
            <Typography variant="body1" style={{ fontWeight: 'bold', color: '#1976d2' }}>
                idolmingming@gmail.com
            </Typography>

            <Button 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '20px' }}
                onClick={() => window.open(`mailto:idolmingming@gmail.com`)}
            >
                Report an Issue
            </Button>
        </Container>
    );
};

export default HelpAndSupport;
