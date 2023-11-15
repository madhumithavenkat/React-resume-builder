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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"

//import PdfDownloader from '../utils/pdfDownloader';

import Pdf from "react-to-pdf"
import { Button } from '@mui/material';

// function convertHTMLtoPDF(selector) {
//   console.log(selector)
//   canvas(document.querySelector(selector)).then(img =>{
//     const imgData = img.toDataURL('image/png');
//     const pdf = new jsPDF();

//     pdf.addImage(imgData, 'PNG', 0, 0);
//     pdf.save("newPdf.pdf");
  
  
  
//   })
//   // const doc = new jsPDF();
//   // let pdfjs = document.querySelector(selector);

//   // doc.html(pdfjs, {
//   //     callback: function(doc) {
//   //         doc.save("newpdf.pdf");
//   //     },
//   //     x: 10,
//   //     y: 10
//   // });               
// }     



export default function App(props) {
  const printRef = React.createRef()
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = (pdf.internal.pageSize.getWidth());
    const pdfHeight =
      ((imgProperties.height * pdfWidth) / imgProperties.width);

    console.log(imgProperties.width,imgProperties.height,pdfWidth,pdfHeight)
  
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth-10, pdfHeight-20);
    pdf.save('print.pdf');
  };
  return (
    <>
    <div className='enclosing-pdf'>
      <div className="page" id = "resumeToPdf" ref ={printRef} >
        <div className="column left">
          <Details data={props.resume.personalDetails[0]} />
         
        </div>

        <div className="column right">
          <FullName data={props.resume.personalDetails[0]} />
          <Summary data={props.resume.professionalSummary} />
          <WorkExperience data={props.resume.occupationalDetails} />
          <Certificates data={props.resume.certificationDetails} />
          <Education data={props.resume.educationDetails} />
        </div>
      </div>
      <div className = "pdf">
      {/* <Pdf targetRef = {ref} filename = "Resume.pdf">
        {({toPdf}) => <Button variant='outlined' onClick = {toPdf}> To PDF</Button>}
      </Pdf> */}
      <button onClick = {handleDownloadPdf}>To PDF</button>
      
      </div>
      </div>
      
    </>
  );
}
