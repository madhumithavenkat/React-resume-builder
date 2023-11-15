import React from "react"
import { TextField, Button, Card, CardActions, CardContent, Grid, IconButton, CardHeader } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../../style.css'





export default function FormEducationalDetails(props) {


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        }
    })

    const lightTheme = createTheme({
        palette : {
            mode : 'light'

        }
    })

    function continueToNextStep(e) {
        e.preventDefault()
        props.handleAllChange({ type: 'nextStep', payload: props.values.step })

    }

    function continueToPrevStep(e) {
        e.preventDefault()
        props.handleAllChange({ type: 'previousStep', payload: props.values.step })
    }

    function removeEducationaFeilds(e, id) {
        e.preventDefault()
        props.handleAllChange({ type: 'removeFields', payload: 'educationDetails' , id:id})
    }

    function addEducationalFeilds(e) {
        e.preventDefault()
        props.handleAllChange({ type: 'addFields'  , payload: 'educationDetails'})
    }

    const educationalElements = props.values.educationDetails.map(inputField => (

        <div key={inputField.id}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
                <Grid item xs={4}>
                    <TextField
                        required
                        id="outlined-required"
                        label="School/University"
                        name = "organisation"
                        onChange={(e) => props.handleAllChange({ type: 'handleChange'  , payload: 'educationDetails', eventArg:e, id : inputField.id})}
                        defaultValue={inputField.organisation}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Year"
                        name = "year"
                        onChange={(e) => props.handleAllChange({ type: 'handleChange'  , payload: 'educationDetails', eventArg:e, id : inputField.id})}
                        defaultValue={inputField.year}
                    />

                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Qualification"
                        name = "qualification"
                        onChange={(e) => props.handleAllChange({ type: 'handleChange'  , payload: 'educationDetails', eventArg:e, id : inputField.id})}
                        defaultValue={inputField.qualification}
                    />

                </Grid>
            </Grid>



            <br />
            <TextField
                required
                id="outlined-required"
                label="Description"
                name = "description"
                fullWidth
                onChange={(e) => props.handleAllChange({ type: 'handleChange' , payload: 'educationDetails', eventArg:e, id : inputField.id})}
                defaultValue={inputField.description}
            />



            <IconButton disabled={props.values.educationDetails.length === 1} onClick={(e) => removeEducationaFeilds(e, inputField.id)}>
                <RemoveIcon />
            </IconButton>
            <IconButton disabled={props.values.educationDetails.length >= 5}
                onClick={(e) => addEducationalFeilds(e,inputField.id)}
            >
                <AddIcon />
            </IconButton>
        </div>
    ))
    
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                display="flex"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={5}>
                    <Card>
                        <CardHeader
                            title="Education Details"
                            style={{ textAlign: 'center' }}
                        />
                        <CardContent>
                            <div >
                                { educationalElements}
                            </div>
                        </CardContent>
                        <CardActions >
                            <Grid container justify="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                <Grid item xs={6} align="center">
                                    <Button
                                        onClick={(e) => continueToPrevStep(e)}
                                        variant="outlined">Previous Step</Button>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <Button
                                        onClick={(e) => continueToNextStep(e)}
                                        variant="outlined">  Next Step  </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </ThemeProvider>

    )

}