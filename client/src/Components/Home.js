import '../App.css';
import Split from "react-split"
import React from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor'
import {useNavigate} from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import axios from '../api/axios'
import useAxiosPrivate from "../hooks/useAxiosPrivate"; 

const GET_RESUME_URL = "/resume"


function App() {
  let navigate = useNavigate()
  const [resumes, setResumes] = React.useState([])
  const {auth} = useAuth()
  const axiosPrivate = useAxiosPrivate() 
 

  React.useEffect(()=>{
   
    async function fetch(){
        const response = await axiosPrivate.get(GET_RESUME_URL,
            {params : {id : auth.id}},
            {
                headers : {'Content-Type' : 'application/json'},
                withCredentials : true
            })
       
        setResumes(response?.data?.data?.rec)
        setCurrentResumeId(response?.data?.data?.rec[0]?.resumeID)
        console.log(resumes)
        
    }
    fetch()
    // let query = {id:auth.id}
    // let url = 'http://localhost:8010/resume?' + query
    // fetch(url, {
    //       method: 'GET',
         
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
          
          
    //     }).then((res) => res.json())
    //       .then((result) => {
    //         console.log(result)
    //         setResumes(result.data.rec)
    //         setCurrentResumeId(result.data.rec[0].resumeID)
            
    //       })
    //       .catch((err) => console.log('error'))
   },[])

  
  const [currentResumeId, setCurrentResumeId] = React.useState(
    (resumes[0] && resumes[0].resumeID) || ""
)


  function createNewResume() {
    navigate("/newResume")
  }

  function findCurrentResume() {
    return resumes.find(resume => {
        return resume.resumeID === currentResumeId
    }) || resumes[0]
  }

  async function deleteResume(event,id){
    event.stopPropagation()
    setResumes(oldResumes => oldResumes.filter(oldResume => oldResume.resumeID !== id))
    resumes[0] && setCurrentResumeId(resumes[0].resumeID )

    const response = await axiosPrivate.delete(GET_RESUME_URL,
      {data:{id:id}},
      {
          headers : {'Content-Type' : 'application/json'},
          withCredentials : true
      })
      console.log(response)
 
    // fetch('http://localhost:8010/resume', {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body : JSON.stringify({
    //         id: id, 
    //       }),
          
    //     })
    //       .then((res) => res.json())
    //       .then((result) => {
    //         console.log(result)
    //       })
    //       .catch((err) => console.log('error'))
  }

  
  return (
   
    <main>
        {
            resumes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    resumes={resumes}
                    currentResume={findCurrentResume()}
                    setCurrentResumeId={setCurrentResumeId}
                    newResume={createNewResume}
                    deleteResume = {deleteResume}
                   
                    
                />
               
                {
                    currentResumeId && 
                    resumes.length > 0 &&
                    <Editor 
                        resume = {findCurrentResume()}
                        
                        
                    />
                   
                }
            </Split>
            :
            <div className="no-resumes">
                <h1>You have no resume</h1>
                <button 
                    className="first-resume" 
                    onClick={createNewResume}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
   )
  
  // return (
  //   <div className="App">
  //     <UserForm/>
  //   </div>
  // );
}

export default App;
