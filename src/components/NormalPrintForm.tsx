import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Button, Typography } from '@mui/material';

interface NormalPrintFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (details: NormalPrintDetails) => void;
}

interface NormalPrintDetails {
    paperSize: string;
    copies: number;
    colorOption: string;
    notes: string;
    files: File[];
}

const NormalPrintForm: React.FC<NormalPrintFormProps> = ({ open, onClose, onSubmit }) => {
    const [normalPrintDetails, setNormalPrintDetails] = useState<NormalPrintDetails>({
        paperSize: '',
        copies: 1,
        colorOption: 'Black & White',
        notes: '',
        files: []
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNormalPrintDetails({ ...normalPrintDetails, files: Array.from(e.target.files) });
        }
    };

    const handleFormSubmit = () => {
        onSubmit(normalPrintDetails);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Normal Print Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the details for your Normal Print order and upload any relevant files (DOCX, PDF, Excel).
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    id="paperSize"
                    label="Paper Size"
                    type="text"
                    fullWidth
                    variant="outlined"
                    select
                    value={normalPrintDetails.paperSize}
                    onChange={(e) => setNormalPrintDetails({ ...normalPrintDetails, paperSize: e.target.value })}
                >
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="A3">A3</MenuItem>
                    <MenuItem value="Letter">Letter</MenuItem>
                </TextField>

                <TextField
                    margin="dense"
                    id="copies"
                    label="Number of Copies"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={normalPrintDetails.copies}
                    onChange={(e) => setNormalPrintDetails({ ...normalPrintDetails, copies: Number(e.target.value) })}
                />

                <TextField
                    margin="dense"
                    id="colorOption"
                    label="Color Option"
                    select
                    fullWidth
                    variant="outlined"
                    value={normalPrintDetails.colorOption}
                    onChange={(e) => setNormalPrintDetails({ ...normalPrintDetails, colorOption: e.target.value })}
                >
                    <MenuItem value="Black & White">Black & White</MenuItem>
                    <MenuItem value="Colored">Colored</MenuItem>
                </TextField>

                <TextField
                    margin="dense"
                    id="notes"
                    label="Additional Notes"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={normalPrintDetails.notes}
                    onChange={(e) => setNormalPrintDetails({ ...normalPrintDetails, notes: e.target.value })}
                />

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Upload Files (DOCX, PDF, Excel)
                </Typography>

                <input
                    type="file"
                    accept=".docx,.pdf,.xls,.xlsx"
                    multiple
                    onChange={handleFileChange}
                    style={{ marginTop: '8px', marginBottom: '8px' }}
                />

                {normalPrintDetails.files.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                        {normalPrintDetails.files.length} file(s) selected.
                    </Typography>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NormalPrintForm;
