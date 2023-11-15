import React from "react"
import FormPersonalDetails from "./FormPersonalDetails"
import FormOccupationalDetails from "./FormOccupationalDetails"
import { nanoid } from "nanoid"
import FormEducationalDetails from "./FormEducationalDetails"
import FormCertificationDetails from "./FormCertificationDetails"
import {useNavigate} from "react-router-dom"
import FormConfirmation from "./FormConfirm"
import {reducer} from "../../reducer"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const GET_RESUME_URL = "/resume"



export default function UserForm() {
    let navigate = useNavigate()
    let {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate()
   
    const [state, dispatch] = React.useReducer(reducer, {
        step: 1,
        personalDetails :[ {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            linkedIn: "",
            professionalSummary: "",
        }],
        resumeName : "",
        skills : [],
        occupationalDetails: [{ id: nanoid(), organisation: "", position: "", duration: "", description: "" }],
        educationDetails: [{ id: nanoid(), organisation: "", year: "", qualification: "", description: "" }],
        certificationDetails: [{ id: nanoid(), certificate: "", provider: "" }]
    })

    async function handleSubmit(){
        console.log(state)
        const response = await axiosPrivate.post(GET_RESUME_URL,
            JSON.stringify({id:auth.id,
                resume: state,}),
            {
                headers : {'Content-Type' : 'application/json'},
                withCredentials : true
            })
            console.log(response)
            navigate("/")
       

        // fetch('http://localhost:8010/resume', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     id:auth.id,
        //     resume: state, // Use your own property name / key
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((result) => navigate("/"))
        //   .catch((err) => console.log('error'))
    }
   

    // eslint-disable-next-line default-case
    switch (state.step) {
        case 1:
            return (
                <FormPersonalDetails
                    handleAllChange={dispatch}
                    values={state}
                />
            )

        case 2:
            return (
                <FormOccupationalDetails
                    handleAllChange={dispatch}
                    values={state}
                />
            )
        case 3:
            return (
                <FormEducationalDetails
                    handleAllChange={dispatch}
                    values={state}
                />
            )
        case 4:
            return (
                <FormCertificationDetails
                    handleAllChange={dispatch}
                    values={state}
                    
                />
            )
        case 5:
            return (
                <FormConfirmation
                    handleAllChange={dispatch}
                    values={state}
                    handleSubmit = {handleSubmit}
                />
            )
    }
}