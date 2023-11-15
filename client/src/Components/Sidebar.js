import React from "react"
import "../style.css"
import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'


export default function Sidebar(props) {

    
    const resumeElements = props.resumes.map((resume, index) => (
        <div key={resume.resumeID}>
            <div

                className={`title ${resume.resumeID === props.currentResume.resumeID ? "selected-note" : ""
                    }`}
                onClick={() => props.setCurrentResumeId(resume.resumeID)}
            >
                <h4 className="text-snippet">{resume.resumeName}</h4>

    
                <IconButton aria-label="delete" 
                onClick = { (e) => props.deleteResume(e,resume.resumeID)}
                >
                    <DeleteIcon  />
                </IconButton>




            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Resume</h3>
                <button className="new-resume" onClick={props.newResume}>+</button>
            </div>
            {resumeElements}
            <div className = "pdf"></div>
        </section>
    )
}