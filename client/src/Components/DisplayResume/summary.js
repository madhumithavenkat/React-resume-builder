import '../../style.css'


export default function Summary({ data }) {
   
  
    return (
      <section className="summary">
        <h2>Professional Summary</h2>
        <p>{data}</p>
      </section>
    );
  }