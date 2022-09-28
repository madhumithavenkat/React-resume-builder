import * as React from 'react';
import '../style.css'
// import {
//   FaCheckSquare as FullCheckIcon,
//   FaRegCheckSquare as CheckIcon,
//   FaRegComment as CommentIcon,
// } from 'react-icons/fa';

import Details from './DisplayResume/details';
import FullName from './DisplayResume/fullName';
import Summary from './DisplayResume/summary';

import WorkExperience from './DisplayResume/experience';
import Certificates from './DisplayResume/certificates';
import Education from './DisplayResume/education';



export default function App(props) {
  console.log("Editor", props.resume[0])


  return (
    <>

      <div className="page">
        <div className="column left">
          <Details data={props.resume[0]} />
          {/* <Details data={data.keySkills} defaultIcon={<FullCheckIcon />} />
          <Details data={data.additionalSkills} defaultIcon={<CheckIcon />} />
          <Details data={data.languages} defaultIcon={<CommentIcon />} />
          <Details data={data.interests} /> */}
        </div>

        <div className="column right">
          <FullName data={props.resume[0]} />
          <Summary data={props.resume[0].professionalSummary} />
          <WorkExperience data={props.resume[0].occupationalDetails} />
          <Certificates data={props.resume[0].certificationDetails} />
          <Education data={props.resume[0].educationDetails} />
        </div>
      </div>
    </>
  );
}
