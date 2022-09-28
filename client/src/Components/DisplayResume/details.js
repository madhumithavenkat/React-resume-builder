import { FaQuestion,FaLinkedin, FaPhone } from 'react-icons/fa';
import Link from './links';
import { MdEmail } from "react-icons/md";

export default function Details({ data, defaultIcon = <FaQuestion /> }) {
  //let { phoneNo, email, linkedIn } = data;

  return (
    <section className="details">
      <h3>Contact</h3>
      <ul>
        <li key = {data.email}> <MdEmail/> {data.email}</li>
        <li key = {data.linkedIn}> <FaLinkedin/> {data.linkedIn}</li>
        <li key = {data.phoneNo}> <FaPhone/>{data.phoneNo}</li>
        
        {/* {list.map(({ icon, text, url }) => (
          <li key={text}>
            {icon || defaultIcon}
            {url ? <Link to={url}>{text}</Link> : text}
          </li>
        ))} */}
      </ul>
    </section>
  );
}