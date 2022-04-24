// npx prisma db seed
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as fs from 'fs';
import Parser from "srt-parser-2";
var { default: srtParser2 } = require("srt-parser-2")

interface Srt {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
  text2?: string;
}
interface Quote {
  sid?: string;
  native?: string;
  translation?: string;
  startTime: string;
  endTime: string;
  show?: string;
  episode?: number;
  subId: number;
}
  //     native: "日本語を話せる？",
  //     translation: "can you speak japanese?",
  //     timeStart:"11",
  //     timeEnd:"13",
  //     show:"3gatsu no rion",
  //     episode: 1
  //     subId: ?
const prisma = new PrismaClient();

async function seed() {
  // const email = "rachel@remix.run";

  // // cleanup the existing database
  // await prisma.user.delete({ where: { email } }).catch(() => {
  //   // no worries if it doesn't exist yet
  // });

  // const hashedPassword = await bcrypt.hash("racheliscool", 10);

  // const user = await prisma.user.create({
  //   data: {
  //     email,
  //     password: {
  //       create: {
  //         hash: hashedPassword,
  //       },
  //     },
  //   },
  // });



  // await prisma.quote.create({
  //   data: {
  //     native: "うんこが出来た？",
  //     translation: "did you poop?",
  //     timeStart:"11",
  //     timeEnd:"13",
  //     show:"3gatsu no rion",
  //     episode: 1
  //   }
  // })
  // await prisma.quote.create({
  //   data: {
  //     native: "日本語を話せる？",
  //     translation: "can you speak japanese?",
  //     timeStart:"11",
  //     timeEnd:"13",
  //     show:"3gatsu no rion",
  //     episode: 1
  //   }
  // })

  // await prisma.quote.create({
  //   data: {
  //     native: "わかんない",
  //     translation: "I don't understand",
  //     timeStart:"11",
  //     timeEnd:"13",
  //     show:"3gatsu no rion",
  //     episode: 1
  //   }
  // })

  await seedSubs("./ep1_en.srt");
  console.log(`Database has been seeded. 🌱`);
}

async function seedSubs(file: string) {
  let quotes: Quote[] = [];

  //what language subs are you looking for @@@if the sub ending is not 6 characters, it may throw an error
  let native = "_ja.srt"
  let translation = "_en.srt"

  let shows = fs.readdirSync('./subs/'); //get all the shows with subtitles
  
  for(let i = 0; i < shows.length; i++) {
    console.log(shows[i]);
    let show = fs.readdirSync('./subs/' + shows[i]);
    let eps = show.filter(function(arrayElement){
      return arrayElement.endsWith(native) || arrayElement.endsWith(translation);
    });
    if(eps.length>=2) {
      let nativeC = 0;
      let translationC = 0;
      //check you have once of each
      if(eps[0].endsWith(native) || eps[1].endsWith(native)) {
        nativeC++;;
      }
      if(eps[0].endsWith(translation) || eps[1].endsWith(translation)) {
        translationC++;
      }
      //if have both, continue 
      if(nativeC > 0 && translationC > 0) {
        for(let e = 0; e < eps.length; e+=2) { //increment by 2 subs per episode
          if(e+1 > eps.length) {
            break;
          }
          if(eps[e].substring(0, eps[e].length - 6) == eps[e+1].substring(0, eps[e+1].length - 6)) { //ensure there are 2 subs for the episode
            console.log(eps[e]);
            let tempQuotes: Quote[] = [];
            let subFile1 = './subs/' + shows[i] + "/" + eps[e];
            let subFile2 = './subs/' + shows[i] + "/" + eps[e + 1];
            let lines1: Array<String> = [];
            let lines2: Array<String> = [];
            console.log(subFile1);

            //get subs and merge
            lines1 = fs.readFileSync(subFile1, 'utf8').split("\n\n");
            lines2 = fs.readFileSync(subFile2, 'utf8').split("\n\n");
            mergeSubs(lines1, lines2, (e+2)/2, shows[i]);
          }
          else { //if subs don't match, it's likely that there was 1 missing
            e--;
          }
        }
      }
    }
    break;
  }
  //     native: "日本語を話せる？",
  //     translation: "can you speak japanese?",
  //     timeStart:"11",
  //     timeEnd:"13",
  //     show:"3gatsu no rion",
  //     episode: 1
  //     subId: ?

  // let matches = 0;
  // for(let i = 0; i < eps.length; i+=2) {
  //   if(eps[i].substring(0, eps[i].length - 6) == eps[i+1].substring(0, eps[i+1].length - 6)) { //ensure there are 2 subs for the episode
  //     console.log("MATCH");
  //     matches++;
  //   }
  //   else {
  //     console.log("NO MATCH")
  //   }
  // }
  // console.log(matches);
  // fs.readFile(file, 'utf8', function(err, data){
      
  //   // Display the file content
  //   let lines = data.split("\n\n");
  //   for(let i = 0; i < lines.length; i ++) {
  //     var result = parser.fromSrt(lines[i]);
  //     console.log(result);
  //   }
  //   // console.log(lines);
  // });
}

async function createQuotes(quotesFinal: Quote[]) {
  for(let q = 0; q < quotesFinal.length; q++){
    if(quotesFinal[q].native == undefined || quotesFinal[q].translation==undefined){

    } 
    else {
      console.log(q);
      await prisma.quote.create(
        {data: {
          native: quotesFinal[q].native!,
          translation: quotesFinal[q].translation!,
          startTime: quotesFinal[q].startTime,
          endTime: quotesFinal[q].endTime,
          show: quotesFinal[q].show!,
          episode: quotesFinal[q].episode!
        }})
    }
  }

}
  // await prisma.quote.create({
  //   data: {
  //     native: "うんこが出来た？",
  //     translation: "did you poop?",
  //     timeStart:"11",
  //     timeEnd:"13",
  //     show:"3gatsu no rion",
  //     episode: 1
  //   }
  // })
function timeToMs(timeStamp: String) {
  // 00:24:00,981 // hr:min:sec,ms
  timeStamp = timeStamp.replace(",", "");
  let hms = timeStamp.split(":");
  let timeMs = parseInt(hms[0])*3600000 + parseInt(hms[1])*60000 + parseInt(hms[2]);
  return(timeMs);
}

function mergeSubs(lines1: Array<String>, lines2: Array<String>, epNum: number, showTitle: string) {
  let parser = new srtParser2()
  let threshold = 1000; //1s difference between subs

  let srtT: Srt[] = []; //translation
  let srtN: Srt[] = []; //native
  let quotesFinal: Quote[] = [];

  console.log("merging subs")
  //format SRT data
  for(let i = 0; i < lines1.length; i ++) {
    let t: Srt = parser.fromSrt(lines1[i])[0];
    if(t != undefined) {
      t.text = t.text.replace("<i>", "").replace("</i>", "").replace("\n", "");
    }
    srtT.push(t);
  }
  for(let i = 0; i < lines2.length; i ++) { 
    let t: Srt = parser.fromSrt(lines2[i])[0];
    if(t != undefined) {
      t.text = t.text.replace("<i>", "").replace("</i>", "").replace("\n", "");
    }    
    srtN.push(t);  
  }

  let n = 0;
  let t = 0;
  let done = false;
  while(!done) {
    let tempQuote: Quote = {} as Quote;
    let start1 = timeToMs(srtN[n].startTime);
    let start2 = timeToMs(srtT[t].startTime);
    let end1 = timeToMs(srtN[n].endTime);
    let end2 = timeToMs(srtT[t].endTime);

    //if subs match
    if(Math.abs(start1 - start2) <= threshold) {
      tempQuote.startTime = srtN[n].startTime;
      tempQuote.endTime = srtN[n].endTime;
      tempQuote.native = srtN[n].text;
      tempQuote.translation = srtT[t].text;
      tempQuote.show=showTitle;
      tempQuote.episode=epNum;
      //if ending of next sub matches
      if(Math.abs(end1 - end2) > threshold && t+1 <= srtT.length && Math.abs(end1 - timeToMs(srtT[t+1].endTime)) < threshold){
        tempQuote.translation = tempQuote.translation + " " + srtT[t+1].text;
        tempQuote.endTime = srtT[t+1].endTime;
        n++;
        t+=2;
      }
      else if(Math.abs(end1 - end2) > threshold && t+1 <= srtT.length && Math.abs(end2 - timeToMs(srtN[n+1].endTime)) < threshold){
        tempQuote.native = tempQuote.native + " " + srtN[n+1].text;
        tempQuote.endTime = srtN[n+1].endTime;
        n+=2;
        t++;
      }
      else {
        n++;
        t++;
      }
    }
    //subs didn't match, create partly empty quote
    else {
      if(start1 < start2) {
        tempQuote.startTime = srtT[t].startTime;
        tempQuote.endTime = srtN[n].endTime;
        tempQuote.native = srtN[n].text;
        tempQuote.show=showTitle;
        tempQuote.episode=epNum;
        n++;
      }
      else if (start2 < start1) {
        tempQuote.startTime = srtT[t].startTime;
        tempQuote.endTime = srtN[n].endTime;
        tempQuote.translation = srtT[t].text;
        tempQuote.show=showTitle;
        tempQuote.episode=epNum;
        t++
      }
    }

    //if out of subs
    if(n>=srtN.length-1 || t>=srtT.length-1) {
      done = true;
    }
    quotesFinal.push(tempQuote);
  }
  
  //put the quotes in the db
  createQuotes(quotesFinal);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
