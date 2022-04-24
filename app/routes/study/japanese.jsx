import { Link, useLoaderData, useFetcher  } from "@remix-run/react";
import React, { useEffect, useState } from 'react';
import { json } from "@remix-run/node";
// import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { getRandomQuote } from "~/models/quote.server";
import StudyInterface from "./components/studyInterface";

export default function JapaneseStudyPage() {
  const fetcher = useFetcher();
  const [qNum, setQNum] = useState(0);
  const [data, setData] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [state, setState] = useState('');

  const onKeyDown = (event) => {
    if (event.ctrlKey) {
      if (event.location == 1) answerHandler();
      if (event.location == 2) answerHandler();
    }
    else if(event.key == " " || event.key == 'Spacebar') showDetails();
    else if(event.key =="ArrowRight") answerHandler();
    else if(event.key =="ArrowLeft") answerHandler();
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

  const answerHandler = async (e) => {
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
        {data ? (<StudyInterface quote={data.quotes[qNum]} showTranslation={showTranslation} showDetails={showDetails} answerHandler={answerHandler}></StudyInterface>) : (null)}
    </div>
  );
}