import React from "react"
import { TextField, Button, Card, CardActions, CardContent, Grid, CardHeader } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';






export default function FormConfirmation(props) {


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        }
    })

    const lightTheme = createTheme({
        palette: {
            mode: 'light'

        }
    })

    function continueToNextStep(e) {
        e.preventDefault()
        console.log(props)
        props.handleSubmit()

    }

    function continueToPrevStep(e) {
        e.preventDefault()
        props.handleAllChange({ type: 'previousStep', payload: props.values.step })
    }



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
                            title="Confirmation"
                            style={{ textAlign: 'center' }}
                        />
                        <CardContent>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Resume Name"
                                    name="resumeName"
                                    onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'resumeName', eventArg: e, })}
                                    defaultValue={props.values.resumeName}
                                />
                            </Grid>
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
                                        variant="outlined">  Submit </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </ThemeProvider>

    )

}