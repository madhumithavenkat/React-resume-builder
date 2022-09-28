import '../../style.css'

export default function Certificates({ data }) {
    console.log("certificate" , data)
  
    return (
      <section className="certificates">
        <h2>Certificates</h2>
        <ul>
          {data.map(({ certificate, provider }) => (
            <li key={certificate}>
              <h4>
                {certificate}
                <span className="provider"> &mdash; {provider}</span>
              </h4>
            </li>
          ))}
        </ul>
      </section>
    );
  }