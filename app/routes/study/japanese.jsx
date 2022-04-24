import { Link, useLoaderData, useFetcher  } from "@remix-run/react";
import React, { useEffect, useState } from 'react';

import StudyInterface from "./components/studyInterface";

export default function JapaneseStudyPage() {
  const fetcher = useFetcher();
  const [qNum, setQNum] = useState(0);
  const [data, setData] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const onKeyDown = (event) => {
    if (event.ctrlKey) {
      if (event.location == 1) answerHandler(false);
      if (event.location == 2) answerHandler(true);
    }
    else if(event.key == " " || event.key == 'Spacebar') showDetails();
    else if(event.key =="ArrowLeft") answerHandler(false);
    else if(event.key =="ArrowRight") answerHandler(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    fetcher.submit({ language: "japanese" }, { method: "post", action: "./api/questions" })
  }, []);

  useEffect(() => { //when questions updated
    if(fetcher.data !=undefined ) {
      setData(fetcher.data);
      setQNum(0);
    }
  }, [fetcher.data]);

  const answerHandler = async (answer) => {
    console.log(answer);
    answer ? setCorrect(correct + 1) : setIncorrect(incorrect + 1);
    setShowTranslation(false);
    if(qNum < data.quotes.length-1) { //increment question
      setQNum(qNum + 1);
      console.log("incrementing")
    }
    else { //out of questions
      fetcher.submit({ language: "japanese" }, { method: "post", action: "./api/questions" })
    }
  }

  const showDetails = (e) => {
    setShowTranslation(!showTranslation);
  }

  return (
    <div id="studyDiv" className="flex flex-col content-center items-center">
        {data ? (<StudyInterface quote={data.quotes[qNum]} showTranslation={showTranslation} showDetails={showDetails} answerHandler={answerHandler} correct={correct} incorrect={incorrect}></StudyInterface>) : (null)}
    </div>
  );
}
