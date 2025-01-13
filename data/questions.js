const questions = [
  {
    section: "The Mini-Mental State Exam",
    questions: [
      {
        id: 1,
        maxScore: 5,
        question:
          "Tell me the date today. What is the year? What is the month? What is the day of the week? What is the season?",
        guide: {
          title: "Orientation",
          instructions: [
            "What is the date today? What year is it? What month is it? What day of the week is it? What season is it?",
          ],
          scoring: [
            "5 points: Correctly answers all questions.",
            "4 points: Correctly answers 3 or 4 questions.",
            "3 points: Correctly answers 2 questions.",
            "2 points: Correctly answers 1 question.",
            "1 point: Correctly answers 0 questions.",
          ],
        },
      },
      {
        id: 2,
        maxScore: 5,
        question:
          "Where are we now? What brgy are we in? What city are we in? What floor are we on?",
        guide: {
          title: "Orientation",
          instructions: [
            "Where are we now? What brgy are we in? What city are we in? What floor are we on?",
          ],
          scoring: [
            "5 points: Correctly answers all questions.",
            "4 points: Correctly answers 3 or 4 questions.",
            "3 points: Correctly answers 2 questions.",
            "2 points: Correctly answers 1 question.",
            "1 point: Correctly answers 0 questions.",
          ],
        },
      },
      {
        id: 3,
        maxScore: 3,
        question:
          "I am going to say three words. Please repeat them after me: 'Apple', 'Table', 'Pencil'. Now repeat them back to me.",
        guide: {
          title: "Registration",
          instructions: [
            "I am going to say three words. Please repeat them after me: 'Apple', 'Table', 'Pencil'. Now repeat them back to me.",
          ],
          scoring: [
            "3 points: Repeats all three words correctly on the first attempt.",
            "2 points: Repeats all three words correctly, but not on the first attempt (e.g., needs prompting).",
            "1 point: Repeats one or two words correctly.",
            "0 points: Repeats none of the words correctly.",
          ],
        },
      },
      {
        id: 4,
        maxScore: 5,
        question: "Can you spell the word 'world' backward?",
        guide: {
          title: "Attention and Calculation",
          instructions: ["Spell the word 'world' backward."],
          scoring: [
            "5 points: Correctly spells all letters backward without error.",
            "4 points: Makes 1 error.",
            "3 points: Makes 2 errors.",
            "2 points: Makes 3 errors.",
            "1 point: Makes 4 or more errors.",
          ],
        },
        picture: "/sample_pictures/Backwards.png",
      },
      {
        id: 5,
        maxScore: 3,
        question:
          "I am going to say three words. Please repeat them after me: 'Apple', 'Table', 'Pencil'. Now repeat them back to me",
        guide: {
          title: "Recall",
          instructions: [
            "Can you tell me the three words I asked you to remember earlier?",
          ],
          scoring: [
            "3 points: Correctly recalls all three words.",
            "2 points: Correctly recalls two words.",
            "1 point: Correctly recalls one word.",
            "0 points: Correctly recalls none of the words.",
          ],
        },
      },
      {
        id: 6,
        maxScore: 2,
        question: "Name these objects: (Show patient a pen and a watch).",
        guide: {
          title: "Language",
          instructions: [
            "Name these objects: (Show patient a pen and a watch).",
          ],
          scoring: [
            "2 points: Correctly names both objects without any errors.",
            "1 point: Correctly names one object.",
            "0 points: Didn't name any of the objects or names them incorrectly.",
          ],
        },
      },
      {
        id: 7,
        maxScore: 1,
        question: "Repeat this sentence after me: 'No ifs, ands, or buts.'  ",
        guide: {
          title: "Language",
          instructions: [
            "Repeat this sentence after me: 'No ifs, ands, or buts.'",
          ],
          scoring: [
            "1 point: Correctly repeats the sentence.",
            "0 points: Doesn't repeat the sentence correctly or doesn't attempt it.",
          ],
        },
      },
      {
        id: 8,
        maxScore: 3,
        question:
          "Follow these instructions: Take this paper in your right hand, fold it in half, and put it on the floor.",
        guide: {
          title: "Language",
          instructions: [
            "Follow these instructions: Take this paper in your right hand, fold it in half, and put it on the floor.",
          ],
          scoring: [
            "3 points: Correctly follows all three instructions.",
            "2 points: Correctly performs two out of three tasks.",
            "1 point: Correctly performs one out of three tasks.",
            "0 points: Correctly performs none of the tasks.",
          ],
        },
      },
      {
        id: 9,
        maxScore: 1,
        question: "Read and obey the following: CLOSE YOUR EYES",
        guide: {
          title: "Language",
          instructions: ["Read and obey the following: CLOSE YOUR EYES"],
          scoring: [
            "1 point: Correctly performs the task.",
            "0 points: Didn't perform the task.",
          ],
        },
      },
      {
        id: 10,
        maxScore: 1,
        question: "Write a complete sentence for me",
        guide: {
          title: "Language",
          instructions: ["Write a complete sentence for me"],
          scoring: [
            "1 point: Correctly performs the tasks.",
            "0 points: Didn't perform the task.",
          ],
        },
      },
      {
        id: 11,
        maxScore: 1,
        question:
          "Copy this drawing. (Show the patient a simple geometric figure, such as a cube or a pentagon).",
        guide: {
          title: "Visual Construction",
          instructions: [
            "Copy this drawing. (Show the patient a simple geometric figure, such as a cube or a pentagon).",
          ],
          scoring: [
            "1 point: Correctly copies the drawing, including all angles and lines.",
            "0 points: Unable to copy the drawing accurately or fails to attempt it.",
          ],
        },
        picture: "/sample_pictures/Pentagon.jpg",
        picture: "/sample_pictures/Pentagon_2.png",
      },
    ],
    totalScore: {
      maximum: 30,
      minimum: 0,
    },
  },
];

module.exports = questions;
