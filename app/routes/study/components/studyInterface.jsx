import ButtonGroup from "./buttonGroup";

export default function StudyInterface({quote, showTranslation, answerHandler, showDetails}) {
  return (
      
    <div className="interface flex flex-col content-center items-center">
        <div className="quoteDiv">
            <p id="native">{quote.native}</p>
            {showTranslation? (<p id="translation">{quote.translation}</p>) : (null)}
        </div>
        <ButtonGroup showDetails={showDetails} answerHandler={answerHandler}></ButtonGroup>
    </div>
  );
}
