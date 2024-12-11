import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import FormComponent from '../../Molecules/FormComponent';

const FormDialog = ({ selectedSection, onSectionChange } ) => {
  const [savedForms, setSavedForms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (open) {
      loadSavedForms();
    }
  }, [open]);

  const loadSavedForms = () => {
    const forms = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.textField) {
          forms.push(data);
        }
      } catch (e) {
        console.error('Error parsing form data:', e);
      }
    }
    setSavedForms(forms);
  };

  const handleDelete = (title) => {
    localStorage.removeItem(title);
    loadSavedForms();
  };

  const handleFormSaved = () => {
    loadSavedForms();
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {showForm ? 'New Form' : 'Saved Forms'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {showForm ? (
          <FormComponent onSave={handleFormSaved} />
        ) : (
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ mb: 2 }}
            >
              Add New Form
            </Button>
            
            {savedForms.length > 0 ? (
              <List>
                {savedForms.map((form, index) => (
                  <React.Fragment key={form.textField}>
                    <ListItem
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDelete(form.textField)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={form.textField}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {form.paragraph.substring(0, 100)}
                              {form.paragraph.length > 100 ? '...' : ''}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Selected options: {Object.entries(form.checkboxItems)
                                .filter(([, checked]) => checked)
                                .map(([key]) => key)
                                .join(', ')}
                            </Typography>
                            {form.radioOption && (
                              <Typography variant="body2" color="text.secondary">
                                Radio selection: {form.radioOption}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < savedForms.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                No saved forms yet. Click 'Add New Form' to create one.
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;