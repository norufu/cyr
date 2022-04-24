export default function AnswerButton({text, answerHandler, answer}) {
    return (
        <button onClick={() => answerHandler(answer)} value={text} className="answerButton">{text}</button>        
    );
  }
  