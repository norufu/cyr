import ButtonGroup from "./buttonGroup";
import Stats from "./stats";

export default function StudyInterface({quote, showTranslation, answerHandler, showDetails, correct, incorrect}) {
  return (
      
    <div className="interface flex flex-col content-center items-center">
        <Stats correct={correct} incorrect={incorrect}></Stats>
        <div className="quoteDiv">
            <p id="native">{quote.native}</p>
            {showTranslation? (<p id="translation">{quote.translation}</p>) : (null)}
        </div>
        <ButtonGroup showDetails={showDetails} answerHandler={answerHandler}></ButtonGroup>
    </div>
  );
}
