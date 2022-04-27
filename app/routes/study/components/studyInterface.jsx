import ButtonGroup from "./buttonGroup";
import Stats from "./stats";
import Sidebar from "./sidebar"
import Icon from "./icon"

export default function StudyInterface({quote, showTranslation, answerHandler, showDetails, sidebarHandler, correct, incorrect}) {
  return (
    <div className="interface flex flex-col content-center items-center">
        <Stats correct={correct} incorrect={incorrect}></Stats>
        <div className="quoteDiv">
            <p id="native">{quote.native}</p>
            {showTranslation? (<p id="translation">{quote.translation}</p>) : (null)}
        </div>
        <div id = "sidebar">
        <Sidebar >
          <Icon s="../../../icons/favourite.svg"  clickHandler={sidebarHandler} iconType="favourite"></Icon>
          <Icon s="../../../../../icons/report.svg"  clickHandler={sidebarHandler} iconType="report"></Icon>
        </Sidebar>
        </div>

        <ButtonGroup showDetails={showDetails} answerHandler={answerHandler}></ButtonGroup>
    </div>
  );
}
