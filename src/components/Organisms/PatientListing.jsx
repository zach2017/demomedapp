import React from 'react'
import {  Grid2 } from '@mui/material'
import Typography from '@mui/material/Typography';
import PatientCard from '../Molecules/PatientCard';

export default function PatientListing() {
  return (
    <div> <Grid2 item xs={12}>
    <Typography variant="h5">
        Patient Listing
    </Typography>
</Grid2>
{/* TODO:  Stub out Layout */}
{Array(3).fill(null).map((_, index) => (
        <PatientCard key={index} index={index} />
      ))}
</div>
  )
}
