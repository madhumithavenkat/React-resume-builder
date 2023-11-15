import React from "react"
import { TextField, Button, Card, CardActions, CardContent, Grid, IconButton, CardHeader } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../../style.css'





export default function FormCertificationDetails(props) {


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
        props.handleAllChange({type : 'nextStep', payload: props.values.step})

    }

    function continueToPrevStep(e) {
        e.preventDefault()
        props.handleAllChange({ type: 'previousStep', payload: props.values.step })
    }

    function removeCertificationFeilds(e, id) {
        e.preventDefault()
        props.handleAllChange({ type: 'removeFields', payload: 'certificationDetails' , id:id})
    }

    function addCertificationFeilds(e) {
        e.preventDefault()
        props.handleAllChange({ type: 'addFields'  , payload: 'certificationDetails'})
    }

    const certificationElements = props.values.certificationDetails.map(inputField => (

        <div key={inputField.id}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Certification"
                        name = "certificate"
                        onChange={(e) => props.handleAllChange({ type: 'handleChange'  , payload: 'certificationDetails', eventArg:e, id : inputField.id})}
                        defaultValue={inputField.certificate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Provider"
                        name = "provider"
                        onChange={(e) => props.handleAllChange({ type: 'handleChange'  , payload: 'certificationDetails', eventArg:e, id : inputField.id})}
                        defaultValue={inputField.provider}
                    />

                </Grid>
            </Grid>


            <IconButton disabled={props.values.certificationDetails.length === 1} onClick={(e) => removeCertificationFeilds(e, inputField.id)}>
                <RemoveIcon />
            </IconButton>
            <IconButton disabled={props.values.certificationDetails.length >= 5}
                onClick={(e) => addCertificationFeilds(e,inputField.id)}
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
                            title="Certification"
                            style={{ textAlign: 'center' }}
                        />
                        <CardContent>
                            <div >
                                { certificationElements}
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
                                        variant="outlined">  Next Step </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </ThemeProvider>

    )

}