// React
import React, {useEffect, useState} from 'react'

// MUI 
import { Autocomplete, Button, Dialog, DialogActions, Paper, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// custom

import useStorage from '../../../api/useStorage'
import useEncryptedStorage from '../../../api/useEncryptedStorage'


const defaultPatient = {
    firstName: '',
    lastName: '',
    dodid: '',
    gender: [],
    bloodtype: '',
    dob: null,
    allergies: [],
    vitals: []
}

function NewPatientForm({ selectedSection, onSectionChange }) {
  

    const [patients, setPatients] = useStorage('patients', {})
    // const [patientsEncrypted, setEncryptedPatients ] = useEncryptedStorage('encryptedPatients', {})
    const [patient, setPatient] = useState(defaultPatient)
    const [db, setDB] = useState(null);

    // IndexedDB setup
    const initDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('FormDB', 1);

            request.onerror = () => {
                reject('Error opening database');
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('forms')) {
                    db.createObjectStore('forms', { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    };

    // Initialize IndexedDB when component mounts
    useEffect(() => {
        const setupDB = async () => {
            try {
                const database = await initDB();
                setDB(database);
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: 'Error initializing database',
                    severity: 'error'
                });
            }
        };
        setupDB();
    }, []);

    const saveToIndexedDB = (data) => {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject('Database not initialized');
                return;
            }

            const transaction = db.transaction(['forms'], 'readwrite');
            const store = transaction.objectStore('forms');

            // Add timestamp to the data
            const dataWithTimestamp = {
                ...data,
                timestamp: new Date().toISOString()
            };

            const request = store.add(dataWithTimestamp);

            request.onsuccess = () => resolve();
            request.onerror = () => reject('Error saving to database');
        });
    };

    const checkIfTitleExists = () => {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject('Database not initialized');
                return;
            }

            const transaction = db.transaction(['forms'], 'readonly');
            const store = transaction.objectStore('forms');
            const request = store.getAll();

            request.onsuccess = () => {
                const exists = request.result.some(form => form.textField === formData.textField);
                resolve(exists);
            };

            request.onerror = () => reject('Error checking title');
        });
    };

    function handleClose() {
        onSectionChange("List")
        setPatient(defaultPatient)
        close()
    }

    async function  submit() {
        setPatients({ ...patients, [patient.dodid]: patient })
        // setEncryptedPatients({...patientsEncrypted, [patient.dodid]: patient})
        setPatient(defaultPatient)
        await saveToIndexedDB({ ...patients, [patient.dodid]: patient });
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: 800, p: 2 }}>

            <Stack spacing={1} sx={{ marginTop: 1 }}>
                <TextField
                    label="Patient Identifier"
                    required
                    value={patient.dodid}
                    onChange={event => setPatient({ ...patient, dodid: event.target.value })}
                    fullWidth
                />
                <TextField
                    label="First Name"
                    value={patient.firstName}
                    onChange={event => setPatient({ ...patient, firstName: event.target.value })}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    value={patient.lastName}
                    onChange={event => setPatient({ ...patient, lastName: event.target.value })}
                    fullWidth
                />
                <TextField
                    label="Date Of Birth"
                    fullWidth
                    value={patient.dob}
                    onChange={value => setPatient({ ...patient, dob: value })}
                />
                <TextField
                    label="Blood Type"
                    value={patient.bloodType}
                    onChange={event => setPatient({ ...patient, bloodType: event.target.value })}
                    fullWidth
                />
                <Autocomplete
                    fullWidth

                    renderInput={(params) => <TextField {...params} label="Gender" />}
                    options={[
                        "Male",
                        "Female"
                    ]}
                    value={patient.gender ? patient.gender : "Male"
                    }
                    onChange={(_, newValue) => setPatient({ ...patient, gender: newValue })}
                />
                <Autocomplete
                    multiple
                    freeSolo
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Allergies" />}
                    options={[
                        "Ibuprofen",
                        "Shellfish",
                        "Cats"
                    ]}
                    value={patient.allergies}
                    onChange={(_, newValue) => setPatient({ ...patient, allergies: newValue })}
                />
            </Stack>

            <Button
                onClick={handleClose}
                size="large"
                aria-label="Cancel"
            >
                Cancel
            </Button>
            <Button
                onClick={submit}
                variant="contained"
                size="large"
                disabled={patient.dodid.length === 0}
            >
                Submit
            </Button>
        </Paper>
    )
}

export default NewPatientForm