import AnswerButton from "./answerButton";
import DetailsButton from "./detailsButton";

export default function ButtonGroup({answerHandler, showDetails}) {
    return (
      <div className="buttonGroup flex content-center items-center">
          <AnswerButton answerHandler={answerHandler} text="<" answer={false}></AnswerButton>
          <DetailsButton showDetails={showDetails}></DetailsButton>
          <AnswerButton answerHandler={answerHandler} text=">" answer={true}></AnswerButton>
      </div>
    );
  }
  