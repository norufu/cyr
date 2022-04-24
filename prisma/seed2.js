import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as fs from 'fs';
import Parser from "srt-parser-2";
var { default: srtParser2 } = require("srt-parser-2")


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

async function seedSubs(file) {
  let quotes = [];

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
            let tempQuotes = [];
            let subFile1 = './subs/' + shows[i] + "/" + eps[e];
            let subFile2 = './subs/' + shows[i] + "/" + eps[e + 1];
            let lines1 = [];
            let lines2 = [];
            console.log(subFile1);

            //get subs and merge
            lines1 = fs.readFileSync(subFile1, 'utf8').split("\n\n");
            lines2 = fs.readFileSync(subFile2, 'utf8').split("\n\n");

            // , function(err, data){
            //   lines1 = data.split("\n\n");
            //   console.log(lines1);
            // });
            // fs.readFile(subFile2, 'utf8', function(err, data){
            //   lines2 = data.split("\n\n");
            // });

            mergeSubs(lines1, lines2);
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


function mergeSubs(lines1, lines2) {
  let parser = new srtParser2()

  console.log("merging subs")
  for(let i = 0; i < lines1.length; i ++) {
    lines1[i] = parser.fromSrt(lines1[i]);
  }
  for(let i = 0; i < lines2.length; i ++) {
    lines2[i] = parser.fromSrt(lines2[i])[0];
  }

  console.log(lines1)
  console.log(lines2)
  console.log("done")
  console.log(lines1[1].endTime)
  // var result = parser.fromSrt(lines[i]);
  //if start-start < 1s, & end - end < 1s 
    //same entry
  
//     00:00:37,662 --> 00:00:40,915
// メジャーのスカウトも
// 彼を見に来ているようですね
// 8
// 00:00:37,454 --> 00:00:39,372
// <i>It looks like some scouts
// from the major leagues</i>

// 9
// 00:00:39,456 --> 00:00:40,623
// <i>are here to watch him today.</i>

  //check OG sub, if start - start <1s 
    //merge
    //if end - end > 1s
      //check next end - end <1s
        //merge next too
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
