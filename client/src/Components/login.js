import React from "react"
import { TextField, Button, Card, CardActions, CardContent, Grid, CardHeader, Input } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../style.css'
import {useNavigate, useLocation} from "react-router-dom"
import axios from '../api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from "../hooks/useAuth"

const SIGNUP_URL = '/user/signUp'
const LOGIN_URL = '/user/login'




export default function Login(props) {

   
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [register, setRegister] = React.useState(false)
    const {setAuth} = useAuth()
    //const axiosPrivate = useAxiosPrivate()
    

    const lightTheme = createTheme({
        palette: {
            mode: 'light'

        }
    })

   
   const login = async(e) => {
    e.preventDefault()
    try{
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({email :email,password:password}),
            {
                headers : {'Content-Type' : 'application/json'},
                withCredentials : true
            })
        
        const accessToken = response?.data?.data?.rec?.accessToken
        const id = response?.data?.data?.rec?._id
        
        setAuth({id,accessToken});
        setEmail('')
        setPassword('')
        navigate(from,{replace:true})
    }catch(err){
        console.log(err)
   }
}


   const onRegister = async (e) =>{

    e.preventDefault();
    try{
        const response = await axios.post(SIGNUP_URL,
            JSON.stringify({email :email,password:password}),
            {
                headers : {'Content-Type' : 'application/json'},
                withCredentials : true
            })
        
        const accessToken = response?.data?.data?.rec?.accessToken
        const id = response?.data?.data?.rec?._id
       
        setAuth({id,accessToken});
        setEmail('')
        setPassword('')
        navigate(from,{replace:true})
    }catch(err){
        console.log(err.response)
    }
   }

//    function oRegister(e){
//     e.preventDefault()
//     console.log(email,password)
//     fetch('http://localhost:8010/user/signUp', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email, 
//             password : password
//           }),
//         })
//         .then((res) => res.json())
//         .then((result) => {
//             console.log("success")
//             console.log(result.data.rec)
//            navigate("/")
//         })
          
//         .catch((err) => console.log('error'))
    
//    }

   function onSwitchButtons(e){
    e.preventDefault()
    setRegister(value => !value)
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
                            title = {register ? "Register" : "Login"}
                            style={{ textAlign: 'center' }}
                        />
                        <CardContent>


                            <br />
                            <TextField
                                required
                                id="outlined-required"
                                label="email"
                                name="email"
                                type="email"
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={email}
                            />
                            <br />
                            <br />
                            <TextField
                                        required
                                        type = "password"
                                        id="outlined-required"
                                        label="Password"
                                        name="password"
                                        fullWidth
                                        onChange={(e) => setPassword(e.target.value)}
                                        defaultValue={password}
                                    />
                            
                        </CardContent>
                        <CardActions style={{ justifyContent: 'center' }}>
                        <Grid container justify="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        {register ? 
                        <Grid item xs={6} align="center">  
                            <Button
                                onClick={(e) => onRegister(e)}
                                variant="outlined">Register</Button>
                        </Grid>
                        :
                        <Grid item xs={6} align="center">  
                            <Button
                                onClick={(e) => login(e)}
                                variant="outlined">Login</Button>
                        </Grid>
                        }
                        <Grid item xs={6} align="center">  
                            <Button
                                onClick={(e) => onSwitchButtons(e)}
                                variant="outlined">Switch to {register ? "Login" : "Register"}</Button>
                        </Grid>
                        </Grid>

                            
                           
                    
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </ThemeProvider>

    )

}