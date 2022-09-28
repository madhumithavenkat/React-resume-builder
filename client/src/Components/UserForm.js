import React from "react"
import FormPersonalDetails from "./FormPersonalDetails"
import FormOccupationalDetails from "./FormOccupationalDetails"
import { nanoid } from "nanoid"
import FormEducationalDetails from "./FormEducationalDetails"
import FormCertificationDetails from "./FormCertificationDetails"
import {useNavigate} from "react-router-dom"


const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'handleChange': {
            if (action.payload === 'personalDetails') {
                return { ...state, [action.eventArg.target.name]: action.eventArg.target.value }
            }
            else {
                let values = state
                
                let details = values[action.payload].map(info => (

                    info.id === action.id ? { ...info, [action.eventArg.target.name]: action.eventArg.target.value } : info

                ))
                return { ...state, [action.payload]: details }
            }



        }

        case 'nextStep':
            {
                return { ...state, ['step']: action.payload + 1 }
            }
        case 'previousStep':
            {
                return { ...state, ['step']: action.payload - 1 }
            }
        case 'addFields':
            {
                let values = state;

                let details = values[action.payload]

                switch (action.payload) {
                    case 'occupationalDetails':
                        details.push({ id: nanoid(), organisation: "", position: "", duration: "", description: "" })
                        break
                    case 'educationDetails':
                        details.push({ id: nanoid(), organisation: "", year: "", qualification: "", description: "" })
                        break
                    case 'certificationDetails' :
                        details.push({ id: nanoid(), certification: "", provider: "" })
                        break
                    default:
                        throw new Error()
                }

                return { ...state, [action.payload]: details }
            }

        case 'removeFields':
            {
                let values = state
                let details = values[action.payload]

                details.splice(details.findIndex(value => details.id === action.id), 1);



                return {
                    ...state,
                    [action.payload]: details
                }
            }

        case 'skills':
            {
                switch(action.payload){
                    case 'add':
                        {
                            let values = state
                            let tags = values[action.type]

                            tags.push(
                               action.eventArg
                            )

                            return{
                                ...state,
                                [action.type] : tags
                                
                            }
                        }
                    case 'delete':
                        {
                            let values = state
                            let tags = values[action.type]

                            let newTags = tags.filter((tag, index) => index !== action.eventArg)

                            return {
                                ...state,
                                [action.type] : newTags
                            }
                        }

                    default:
                        throw new Error()
                }
            }
        default:
            throw new Error()
    }
}


export default function UserForm() {
    let navigate = useNavigate()
    const [state, dispatch] = React.useReducer(reducer, {
        step: 1,
        contact : {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            linkedIn: "",
            professionalSummary: "",
        },
        skills : [],
        occupationalDetails: [{ id: nanoid(), organisation: "", position: "", duration: "", description: "" }],
        educationDetails: [{ id: nanoid(), organisation: "", year: "", qualification: "", description: "" }],
        certificationDetails: [{ id: nanoid(), certificate: "", provider: "" }]
    })

    function handleSubmit(){
        console.log(state)


        fetch('http://localhost:8010/resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resume: state, // Use your own property name / key
          }),
        })
          .then((res) => res.json())
          .then((result) => navigate("/"))
          .catch((err) => console.log('error'))
    }

    //Proceed to next step
    // function nextStep() {
    //     const { step } = userData
    //     setUserData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             ['step']: step + 1
    //         }

    //     })
    // }

    // //proceed to next step
    // function prevStep() {
    //     const { step } = userData
    //     setUserData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             ['step']: step - 1
    //         }

    //     })
    // }

    //handle state change 
    // function handleStateChange(event) {
    //     console.log(event)
    //     setUserData(prevFormData => {
    //         return {
    //             ...prevFormData,

    //         }
    //     })
    // }


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
                    handleSubmit = {handleSubmit}
                />
            )
        case 5:
            return <h1>third case</h1>
    }
}