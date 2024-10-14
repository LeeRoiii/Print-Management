import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box, IconButton, Collapse } from '@mui/material';
import { Print as PrintIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface PrintJob {
    title: string;
    description: string;
    price: number;
    icon: React.ElementType;
    color: string;
    available: boolean;
}

const samplePrintJobs: PrintJob[] = [
    {
        title: 'Business Cards',
        description: 'Premium quality business cards',
        price: 25.00,
        icon: PrintIcon,
        color: '#1976d2',
        available: true,
    },
    {
        title: 'Flyers',
        description: 'High-quality flyer printing services',
        price: 15.00,
        icon: PrintIcon,
        color: '#d32f2f',
        available: true,
    },
    {
        title: 'Posters',
        description: 'Custom posters for advertising',
        price: 35.00,
        icon: PrintIcon,
        color: '#388e3c',
        available: true,
    },
];

const Service: React.FC = () => {
    const [printJobs, setPrintJobs] = useState<PrintJob[]>(() => {
        const storedJobs = localStorage.getItem('printJobs');
        return storedJobs ? JSON.parse(storedJobs) : samplePrintJobs;
    });

    const [expandedCards, setExpandedCards] = useState<{[key: number]: boolean}>({});

    const toggleAvailability = (index: number) => {
        const updatedJobs = [...printJobs];
        updatedJobs[index].available = !updatedJobs[index].available;
        setPrintJobs(updatedJobs);
        localStorage.setItem('printJobs', JSON.stringify(updatedJobs));
    };

    const toggleCardExpansion = (index: number) => {
        setExpandedCards(prev => ({...prev, [index]: !prev[index]}));
    };

    useEffect(() => {
        // Optional: Log the initial print jobs for debugging
        console.log('Print Jobs:', printJobs);
    }, [printJobs]);

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
            <Typography 
                variant="h4"
                className="font-bold mb-6 text-gray-800"
                sx={{ borderBottom: '2px solid #3f51b5', paddingBottom: 2, marginBottom: 4 }}
            >
                Print Job Services
            </Typography>
            <Grid container spacing={4}>
                {printJobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box 
                                            sx={{ 
                                                bgcolor: job.color, 
                                                borderRadius: '50%', 
                                                p: 1.5, 
                                                mr: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <PrintIcon sx={{ color: 'white', fontSize: 24 }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{job.title}</Typography>
                                    </Box>
                                    <IconButton 
                                        onClick={() => toggleCardExpansion(index)}
                                        sx={{
                                            transform: expandedCards[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s',
                                        }}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                    {job.description}
                                </Typography>
                                <Collapse in={expandedCards[index]} timeout="auto" unmountOnExit>
                                    <Box sx={{ mt: 2, mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Price:</strong> ${job.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Collapse>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                                    <Button
                                        variant={job.available ? "contained" : "outlined"}
                                        color={job.available ? "success" : "error"}
                                        onClick={() => toggleAvailability(index)}
                                        sx={{ 
                                            minWidth: '100px',
                                            transition: 'all 0.3s',
                                        }}
                                    >
                                        {job.available ? "Available" : "Unavailable"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Service;
