import './App.css';
import UserForm from './Components/UserForm';
import Split from "react-split"
import React from 'react';
import Sidebar from './Components/Sidebar';
import Editor from './Components/Editor'
import {useNavigate} from 'react-router-dom'

function App() {
  let navigate = useNavigate()
  const [resumes, setResumes] = React.useState([])

  

  React.useEffect(()=>{
    console.log("loading")
    fetch('http://localhost:8010/resume', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        })
          .then((res) => res.json())
          .then((result) => {
            setResumes(result.data.rec)
            setCurrentResumeId(result.data.rec[0].resumeID)
          })
          .catch((err) => console.log('error'))
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
                />
                {
                    currentResumeId && 
                    resumes.length > 0 &&
                    <Editor 
                        resume = {resumes.filter(res => res.resumeID === currentResumeId)}
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
