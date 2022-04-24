export default function Stats({correct, incorrect}) {
    return (
        <div id="stats">
            <p>Correct: {correct}</p>
            <p>Incorrect: {incorrect}</p>
        </div>        
    );
  }
  