export default function AnswerButton({text, answerHandler}) {
    return (
        <button onClick={answerHandler} value={text} className="answerButton">{text}</button>        
    );
  }
  