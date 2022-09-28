import '../../style.css'

export default function FullName({ data }) {
    const {firstName, lastName} = data
    return (
      <header className="full-name">
        <h1>{firstName} {lastName}</h1>
      </header>
    );
  }