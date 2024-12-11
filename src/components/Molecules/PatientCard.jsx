import React from 'react'
import {  Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardHeader, Grid2 } from '@mui/material'

export default function PatientCard() {

    return (
    <div><Grid2 item xs={12}>
    <Card>
        <CardActionArea
            aria-label={`Open 1`}
            onClick={() => alert("Show Patient  Info")}
        >
           <CardHeader
                title={`Name`}
                titleTypographyProps={{ variant: "h6" }}
                subheader={'DODID'}
                avatar={<img src="/nopicture.png"/>}
            />

        </CardActionArea>
     </Card>
     <CardActions>
            <Box sx={{ flexGrow: 1 }} />
            <ButtonGroup>
                <Button
                    variant="contained"
                    onClick={() => alert("Show Patient  Info") }
                >
                    TCCC
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setVitalsOpen(true)}
                >
                    Vitals
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setMedsOpen(true)}
                >
                    Meds
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setNotesOpen(true)}
                >
                    Notes
                </Button>
            </ButtonGroup>
        </CardActions>
</Grid2></div>
  )
}
