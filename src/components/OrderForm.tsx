import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Box,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    AppBar,
    Toolbar,
    Fade,
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import NormalPrintForm from './NormalPrintForm'; 

interface PrintJob {
    title: string;
    description: string;
    price: number;
    icon: React.ElementType;
    color: string;
    available: boolean;
}

const OrderForm: React.FC = () => {
    const [printJobs, setPrintJobs] = useState<PrintJob[]>([]);
    const [openNormalPrint, setOpenNormalPrint] = useState(false); // For Normal Print form
    const [customerName, setCustomerName] = useState<string>('');
    const [openNameDialog, setOpenNameDialog] = useState<boolean>(false); // Initially false

    useEffect(() => {
        const storedJobs = localStorage.getItem('printJobs');
        if (storedJobs) {
            const jobs = JSON.parse(storedJobs) as PrintJob[];
            setPrintJobs(jobs);
        }

        // Check for customer name in local storage
        const storedName = localStorage.getItem('customerName');
        const storedTime = localStorage.getItem('nameTime');

        if (storedName && storedTime) {
            const currentTime = new Date().getTime();
            const storedTimestamp = parseInt(storedTime, 10);
            // Reset the name if more than 24 hours have passed
            if (currentTime - storedTimestamp > 24 * 60 * 60 * 1000) {
                localStorage.removeItem('customerName');
                localStorage.removeItem('nameTime');
                setOpenNameDialog(true); // Open dialog if expired
            } else {
                setCustomerName(storedName); // Set customer name
            }
        } else {
            setOpenNameDialog(true); // Open dialog if no name stored
        }
    }, []);

    const handleOrder = (job: PrintJob) => {
        if (job.title === 'Normal Print') {
            // Open the form for Normal Print
            setOpenNormalPrint(true);
        } else {
            console.log(`Ordered: ${job.title}`);
        }
    };

    const handleNormalPrintSubmit = (details: any) => {
        // Handle the submission of the normal print details including files
        console.log('Normal Print Order Details:', details);
    };

    const handleNameSubmit = () => {
        localStorage.setItem('customerName', customerName);
        localStorage.setItem('nameTime', new Date().getTime().toString());
        setOpenNameDialog(false);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h5">Services We Offer</Typography>
                    {customerName && (
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Hello, {customerName}
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>

            {/* Dialog for Customer Name */}
            <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
                <DialogTitle>Enter Your Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="customerName"
                        label="Customer Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNameDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleNameSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={4} sx={{ mt: 2 }}>
                {printJobs
                    .filter(job => job.available) // Only show available jobs
                    .map((job, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Fade in timeout={500}>
                                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box
                                                sx={{
                                                    bgcolor: job.color,
                                                    borderRadius: '50%',
                                                    p: 2,
                                                    mr: 2,
                                                }}
                                            >
                                                <PrintIcon sx={{ color: 'white', fontSize: 40 }} />
                                            </Box>
                                            <Typography variant="h6">{job.title}</Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {job.description}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOrder(job)}
                                            sx={{ mt: 2 }}
                                        >
                                            Order Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
            </Grid>

            {/* Normal Print Form Component */}
            <NormalPrintForm
                open={openNormalPrint}
                onClose={() => setOpenNormalPrint(false)}
                onSubmit={handleNormalPrintSubmit}
            />
        </Container>
    );
};

export default OrderForm;
