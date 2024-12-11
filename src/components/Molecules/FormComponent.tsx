import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

const FormComponent = ( { selectedSection, onSectionChange } ) => {
  const [formData, setFormData] = useState({
    textField: '',
    paragraph: '',
    checkboxItems: {
      item1: false,
      item2: false,
      item3: false
    },
    radioOption: ''
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (itemName) => {
    setFormData({
      ...formData,
      checkboxItems: {
        ...formData.checkboxItems,
        [itemName]: !formData.checkboxItems[itemName]
      }
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      radioOption: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.textField.trim() === '') {
      setSnackbar({
        open: true,
        message: 'Please enter a title for the form',
        severity: 'error'
      });
      return;
    }

    if (localStorage.getItem(formData.textField)) {
      setSnackbar({
        open: true,
        message: 'A form with this title already exists',
        severity: 'error'
      });
     // return;
    }

    try {
      localStorage.setItem(formData.textField, JSON.stringify(formData));
      setSnackbar({
        open: true,
        message: 'Form saved successfully!',
        severity: 'success'
      });
      
      setFormData({
        textField: '',
        paragraph: '',
        checkboxItems: {
          item1: false,
          item2: false,
          item3: false
        },
        radioOption: ''
      });
      
    
        onSectionChange("List");
    
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving form. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="textField"
          value={formData.textField}
          onChange={handleTextChange}
          margin="normal"
          required
          helperText="This will be used as the unique identifier for your form"
        />

        <TextField
          fullWidth
          label="Paragraph"
          name="paragraph"
          value={formData.paragraph}
          onChange={handleTextChange}
          margin="normal"
          multiline
          rows={4}
        />

        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <FormLabel component="legend">Checkbox Items</FormLabel>
          <FormGroup>
            {['item1', 'item2', 'item3'].map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={formData.checkboxItems[item]}
                    onChange={() => handleCheckboxChange(item)}
                  />
                }
                label={`Option ${item.slice(-1)}`}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <FormLabel component="legend">Radio Options</FormLabel>
          <RadioGroup
            value={formData.radioOption}
            onChange={handleRadioChange}
            name="radio-buttons-group"
          >
            {['option1', 'option2', 'option3'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={`Radio ${option.slice(-1)}`}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Save
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FormComponent;