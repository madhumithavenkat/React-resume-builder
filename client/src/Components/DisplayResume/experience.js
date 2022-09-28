import { format } from '../../utils';
import '../../style.css'

export default function WorkExperience({ data }) {
  

  return (
    <section className="work-experience">
      <h2>Work Experience</h2>
      <ul>
        {data.map(({ organisation, position, duration, description }) => (
          <li key={organisation}>
            <div className="header sm-border-bottom">
              <h4>
                {position} <br />
                {organisation} <br />
              </h4>

              <span className="date">
                {/* {format(date.start)} - {format(date.end)} */}
                {duration}
              </span>
            </div>

            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}