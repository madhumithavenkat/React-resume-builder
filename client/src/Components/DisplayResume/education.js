import { format } from '../../utils';
import '../../style.css'

export default function Education({ data }) {
  

  return (
    <section className="education">
      <h2>Education Details</h2>
      <ul>
        {data.map(({ organisation, description, year }) => (
          <li key={description}>
            <div className="header">
              <h4>{organisation}</h4>

              <span className="date">
                {/* {format(date.start)} - {format(date.end)} */}
                {year}
              </span>
            </div>

            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}