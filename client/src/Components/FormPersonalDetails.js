import React from "react"
import { TextField, Button, Card, CardActions, CardContent, Grid, Box, CardHeader } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../style.css'
import { WithContext as ReactTags } from 'react-tag-input';
import ChipInput from 'material-ui-chip-input'




export default function FormPersonalDetails(props) {

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
        props.handleAllChange({ type: 'nextStep', payload: props.values.step })

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
                            title="Personal Details"
                            style={{ textAlign: 'center' }}
                        />
                        <CardContent>

                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="FirstName"
                                        name="firstName"
                                        onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'personalDetails', eventArg: e })}
                                        defaultValue={props.values.firstName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Last Name"
                                        name="lastName"
                                        onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'personalDetails', eventArg: e })}
                                        defaultValue={props.values.lastName}
                                    />

                                </Grid>
                            </Grid>



                            <br />
                            <TextField
                                required
                                id="outlined-required"
                                label="email"
                                name="email"
                                type="email"
                                fullWidth
                                onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'personalDetails', eventArg: e })}
                                defaultValue={props.values.email}
                            />

                            <br />
                            <br />
                            <TextField
                                required
                                id="outlined-required"
                                label="Linkedin"
                                name="linkedIn"
                                fullWidth
                                onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'personalDetails', eventArg: e })}
                                defaultValue={props.values.linkedIn}
                            />
                            <br />
                            <br />
                            <TextField
                                required
                                id="outlined-required"
                                label="Phone Number"
                                name="phoneNo"
                                fullWidth
                                onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'personalDetails', eventArg: e })}
                                defaultValue={props.values.phoneNumber}
                            />
                            <br />
                            <br />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Professional Summary"
                                name="professionalSummary"

                                multiline
                                maxRows={4}
                                fullWidth
                                defaultValue={props.values.professionalSummary}
                                onChange={(e) => props.handleAllChange({ type: 'handleChange', payload: 'personalDetails', eventArg: e })}
                            />
                            <br />
                            <br />

                            <div >

                                <ChipInput

                                    variant="outlined"
                                    label={"Skills"}
                                    color="primary"
                                    value={props.values.skills}
                                    onAdd={(chip) => props.handleAllChange({ type: 'skills', payload: 'add', eventArg: chip })}
                                    onDelete={(chip, index) => props.handleAllChange({ type: 'skills', payload: 'delete', eventArg: index })}
                                    fullWidth={true}

                                    disableUnderline={true}
                                />

                            </div>

                        </CardContent>
                        <CardActions style={{ justifyContent: 'center' }}>
                            <Button
                                onClick={(e) => continueToNextStep(e)}
                                variant="outlined">Next Step</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </ThemeProvider>

    )

}