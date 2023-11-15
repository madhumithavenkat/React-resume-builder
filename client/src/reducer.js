import { nanoid } from "nanoid"
export const reducer = (state, action) => {
    
    switch (action.type) {
        case 'handleChange': {
            if (action.payload === 'resumeName') {
                return { ...state, [action.eventArg.target.name]: action.eventArg.target.value }
            }else if (action.payload === 'personalDetails'){
               
                let values = state
                
                let details = values[action.payload].map(info => (

                   { ...info, [action.eventArg.target.name]: action.eventArg.target.value } 

                ))
                return { ...state, [action.payload]: details }
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
            case 'resumeName' :{
                return { ...state, [action.eventArg.target.name]: action.eventArg.target.value }
            }
        default:
            throw new Error()
    }
}