import React from "react"
import "../style.css"

export default function Sidebar(props) {
   
    const resumeElements = props.resumes.map((resume, index) => (
        <div key={resume.resumeID}>
            <div
                
                className={`title ${
                    resume.resumeID === props.currentResume.resumeID ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentResumeId(resume.resumeID)}
            >
                <h4 className="text-snippet">{resume.firstName}</h4>
                <button 
                    className="delete-btn"
                    // Your onClick event handler here
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
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
        </section>
    )
}