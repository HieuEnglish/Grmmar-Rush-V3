// Grammar question generator for different age groups and difficulty levels

// Helper functions
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Question Banks
const questionBanks = {
  kids: {
    easy: [
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct form of "to be"?',
        options: [
          'They is going to the park.',
          'She are playing with her friends.',
          'He is eating lunch.',
          'I are watching TV.'
        ],
        correctAnswer: 'He is eating lunch.',
        checkAnswer: (answer) => answer === 'He is eating lunch.'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which word is a noun?',
        options: ['Run', 'Happy', 'Book', 'Quickly'],
        correctAnswer: 'Book',
        checkAnswer: (answer) => answer === 'Book'
      },
      {
        type: 'fillInBlank',
        prompt: 'The cat sat ___ the mat.',
        options: ['on', 'in', 'at', 'by'],
        correctAnswer: 'on',
        checkAnswer: (answer) => answer === 'on'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct punctuation?',
        options: [
          'Where are you going.',
          'Where are you going?',
          'Where are you going!',
          'Where are you going,'
        ],
        correctAnswer: 'Where are you going?',
        checkAnswer: (answer) => answer === 'Where are you going?'
      },
      {
        type: 'fillInBlank',
        prompt: 'The sun ___ in the east.',
        options: ['rise', 'rises', 'rising', 'rised'],
        correctAnswer: 'rises',
        checkAnswer: (answer) => answer === 'rises'
      }
    ],
    medium: [
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "The dog runned after the ball."',
        options: ['The', 'dog', 'runned', 'after', 'the', 'ball'],
        correctAnswer: 'runned',
        checkAnswer: (answer) => answer === 'runned'
      },
      {
        type: 'fillInBlank',
        prompt: 'She ___ her homework before dinner.',
        options: ['did', 'done', 'doing', 'does'],
        correctAnswer: 'did',
        checkAnswer: (answer) => answer === 'did'
      },
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a correct sentence:',
        options: ['went', 'to', 'the', 'store', 'She'],
        correctOrder: [4, 0, 1, 2, 3],
        checkAnswer: (index) => index === 4 // Index of first word "She"
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses pronouns correctly?',
        options: [
          'Me and him went to the movies.',
          'Her likes to play soccer.',
          'They gave the presents to she.',
          'She and I are best friends.'
        ],
        correctAnswer: 'She and I are best friends.',
        checkAnswer: (answer) => answer === 'She and I are best friends.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "The children is playing in the yard."',
        options: ['The', 'children', 'is', 'playing', 'in', 'the', 'yard'],
        correctAnswer: 'is',
        checkAnswer: (answer) => answer === 'is'
      }
    ],
    hard: [
      {
        type: 'fillInBlank',
        prompt: 'The students ___ excited about the field trip next week.',
        options: ['is', 'are', 'be', 'am'],
        correctAnswer: 'are',
        checkAnswer: (answer) => answer === 'are'
      },
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a correct sentence:',
        options: ['the', 'yesterday', 'completed', 'assignment', 'They'],
        correctOrder: [4, 2, 0, 3, 1],
        checkAnswer: (index) => index === 4 // Index of first word "They"
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct comparative form?',
        options: [
          'This book is gooder than that one.',
          'My house is more bigger than yours.',
          'She is more tall than her sister.',
          'This cake is better than the last one.'
        ],
        correctAnswer: 'This cake is better than the last one.',
        checkAnswer: (answer) => answer === 'This cake is better than the last one.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "Neither of the boys have finished their homework."',
        options: ['Neither', 'of', 'the', 'boys', 'have', 'finished', 'their', 'homework'],
        correctAnswer: 'have',
        checkAnswer: (answer) => answer === 'have'
      },
      {
        type: 'fillInBlank',
        prompt: 'If I ___ rich, I would travel around the world.',
        options: ['am', 'is', 'were', 'be'],
        correctAnswer: 'were',
        checkAnswer: (answer) => answer === 'were'
      }
    ]
  },
  teens: {
    easy: [
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct form of "there/their/they\'re"?',
        options: [
          'The students left there books at home.',
          'They\'re going to be late for the party.',
          'The concert is over their.',
          'There going to love this movie.'
        ],
        correctAnswer: 'They\'re going to be late for the party.',
        checkAnswer: (answer) => answer === 'They\'re going to be late for the party.'
      },
      {
        type: 'fillInBlank',
        prompt: 'I can\'t believe he just ghosted me! He didn\'t even ___ to my text.',
        options: ['replied', 'reply', 'replying', 'replies'],
        correctAnswer: 'reply',
        checkAnswer: (answer) => answer === 'reply'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which is the correct use of apostrophe?',
        options: [
          'The girl\'s are playing volleyball.',
          'The childrens\' toys are all over the floor.',
          'The dog\'s bowl is empty.',
          'The teacher\'s gave us homework.'
        ],
        correctAnswer: 'The dog\'s bowl is empty.',
        checkAnswer: (answer) => answer === 'The dog\'s bowl is empty.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "That YouTuber is literally to funny."',
        options: ['That', 'YouTuber', 'is', 'literally', 'to', 'funny'],
        correctAnswer: 'to',
        checkAnswer: (answer) => answer === 'to'
      },
      {
        type: 'fillInBlank',
        prompt: 'OMG! Did you see ___ post about the party?',
        options: ['they\'re', 'there', 'their', 'thier'],
        correctAnswer: 'their',
        checkAnswer: (answer) => answer === 'their'
      }
    ],
    medium: [
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a correct sentence:',
        options: ['low-key', 'was', 'awesome', 'the', 'concert'],
        correctOrder: [3, 4, 1, 0, 2],
        checkAnswer: (index) => index === 3 // Index of first word "the"
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct verb tense?',
        options: [
          'I been waiting for this game to drop for months.',
          'She have already seen that TikTok.',
          'We\'ve wanted to go to that restaurant forever.',
          'They already ate dinner when we arrived.'
        ],
        correctAnswer: 'We\'ve wanted to go to that restaurant forever.',
        checkAnswer: (answer) => answer === 'We\'ve wanted to go to that restaurant forever.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence from a social media post: "Your not going to believe what happened at school today!"',
        options: ['Your', 'not', 'going', 'to', 'believe', 'what', 'happened', 'at', 'school', 'today'],
        correctAnswer: 'Your',
        checkAnswer: (answer) => answer === 'Your'
      },
      {
        type: 'fillInBlank',
        prompt: 'The coach told us that we ___ run five laps before practice.',
        options: ['has to', 'have to', 'had to', 'having to'],
        correctAnswer: 'have to',
        checkAnswer: (answer) => answer === 'have to'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the word "cap" correctly in modern slang?',
        options: [
          'I bought a new cap from the store.',
          'That\'s cap, I know you were at the party.',
          'He capped the water bottle tightly.',
          'She put a cap on how much she would spend.'
        ],
        correctAnswer: 'That\'s cap, I know you were at the party.',
        checkAnswer: (answer) => answer === 'That\'s cap, I know you were at the party.'
      }
    ],
    hard: [
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a grammatically correct sentence:',
        options: ['the', 'game', 'despite', 'we', 'loss', 'enjoyed', 'our'],
        correctOrder: [3, 5, 0, 1, 2, 6, 4],
        checkAnswer: (index) => index === 3 // Index of first word "we"
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses parallel structure correctly?',
        options: [
          'She likes swimming, to run, and biking.',
          'He enjoys playing games, watching movies, and to read books.',
          'The teacher asked us to read quietly, to write neatly, and to participate actively.',
          'The app is known for its speed, reliability, and it is user-friendly.'
        ],
        correctAnswer: 'The teacher asked us to read quietly, to write neatly, and to participate actively.',
        checkAnswer: (answer) => answer === 'The teacher asked us to read quietly, to write neatly, and to participate actively.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "Neither the students nor the teacher were able to solve the problem."',
        options: ['Neither', 'the', 'students', 'nor', 'the', 'teacher', 'were', 'able', 'to', 'solve', 'the', 'problem'],
        correctAnswer: 'were',
        checkAnswer: (answer) => answer === 'were'
      },
      {
        type: 'fillInBlank',
        prompt: 'If she ___ studied harder, she would have passed the exam.',
        options: ['has', 'would have', 'had', 'would'],
        correctAnswer: 'had',
        checkAnswer: (answer) => answer === 'had'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence contains a dangling modifier?',
        options: [
          'Walking through the park, the birds sang beautifully.',
          'After studying all night, the test was still difficult.',
          'Tired from the long day, she went straight to bed.',
          'While playing the game, his phone rang continuously.'
        ],
        correctAnswer: 'After studying all night, the test was still difficult.',
        checkAnswer: (answer) => answer === 'After studying all night, the test was still difficult.'
      }
    ]
  },
  adults: {
    easy: [
      {
        type: 'multipleChoice',
        prompt: 'Which sentence is grammatically correct?',
        options: [
          'Between you and I, the presentation was a success.',
          'Between you and me, the presentation was a success.',
          'Between I and you, the presentation was a success.',
          'Between me and you, the presentation was a success.'
        ],
        correctAnswer: 'Between you and me, the presentation was a success.',
        checkAnswer: (answer) => answer === 'Between you and me, the presentation was a success.'
      },
      {
        type: 'fillInBlank',
        prompt: 'Please send the report to Mr. Smith and ___.',
        options: ['I', 'me', 'myself', 'mine'],
        correctAnswer: 'me',
        checkAnswer: (answer) => answer === 'me'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this professional email: "I look forward to discus the proposal with your team."',
        options: ['I', 'look', 'forward', 'to', 'discus', 'the', 'proposal', 'with', 'your', 'team'],
        correctAnswer: 'discus',
        checkAnswer: (answer) => answer === 'discus'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct verb form?',
        options: [
          'The data shows a significant increase in productivity.',
          'The data show a significant increase in productivity.',
          'The data is showing a significant increase in productivity.',
          'The data has showed a significant increase in productivity.'
        ],
        correctAnswer: 'The data show a significant increase in productivity.',
        checkAnswer: (answer) => answer === 'The data show a significant increase in productivity.'
      },
      {
        type: 'fillInBlank',
        prompt: 'The manager, along with her team members, ___ working on the project.',
        options: ['are', 'is', 'were', 'have been'],
        correctAnswer: 'is',
        checkAnswer: (answer) => answer === 'is'
      }
    ],
    medium: [
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a grammatically correct sentence:',
        options: ['we', 'results', 'the', 'carefully', 'analyze', 'must'],
        correctOrder: [0, 5, 4, 3, 2, 1],
        checkAnswer: (index) => index === 0 // Index of first word "we"
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence contains a split infinitive?',
        options: [
          'She promised to never reveal the secret.',
          'He wants to work diligently on the project.',
          'They need to complete the task quickly.',
          'We plan to finish this by tomorrow.'
        ],
        correctAnswer: 'She promised to never reveal the secret.',
        checkAnswer: (answer) => answer === 'She promised to never reveal the secret.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "The committee have reached their decision."',
        options: ['The', 'committee', 'have', 'reached', 'their', 'decision'],
        correctAnswer: 'have',
        checkAnswer: (answer) => answer === 'have'
      },
      {
        type: 'fillInBlank',
        prompt: 'Had I known about the changes, I ___ accordingly.',
        options: ['would prepare', 'would have prepared', 'will prepare', 'had prepared'],
        correctAnswer: 'would have prepared',
        checkAnswer: (answer) => answer === 'would have prepared'
      },
      {
        type: 'multipleChoice',
        prompt: 'In which sentence is the semicolon used correctly?',
        options: [
          'The project was successful; despite the initial challenges.',
          'The project was successful; however, it exceeded the budget.',
          'The project was successful; and everyone was pleased.',
          'The project was successful; it, exceeded the budget.'
        ],
        correctAnswer: 'The project was successful; however, it exceeded the budget.',
        checkAnswer: (answer) => answer === 'The project was successful; however, it exceeded the budget.'
      }
    ],
    hard: [
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a grammatically correct sentence:',
        options: ['we', 'the', 'until', 'had', 'proposal', 'received', 'proceed', 'cannot'],
        correctOrder: [0, 7, 6, 2, 0, 3, 4, 5],
        checkAnswer: (index) => index === 0 // Index of first word "we"
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence demonstrates correct subject-verb agreement with collective nouns?',
        options: [
          'The jury is deliberating their verdict.',
          'The jury are deliberating its verdict.',
          'The jury is deliberating its verdict.',
          'The jury are deliberating their verdict.'
        ],
        correctAnswer: 'The jury is deliberating its verdict.',
        checkAnswer: (answer) => answer === 'The jury is deliberating its verdict.'
      },
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "The CEO, together with the board members, are reviewing the annual report."',
        options: ['The', 'CEO', 'together', 'with', 'the', 'board', 'members', 'are', 'reviewing', 'the', 'annual', 'report'],
        correctAnswer: 'are',
        checkAnswer: (answer) => answer === 'are'
      },
      {
        type: 'fillInBlank',
        prompt: 'The report, ___ was submitted last week, contains several inconsistencies.',
        options: ['that', 'which', 'whom', 'who'],
        correctAnswer: 'which',
        checkAnswer: (answer) => answer === 'which'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence demonstrates correct parallel structure in a business context?',
        options: [
          'The new strategy aims to increase revenue, reducing costs, and the improvement of customer satisfaction.',
          'The new strategy aims to increase revenue, to reduce costs, and improving customer satisfaction.',
          'The new strategy aims to increase revenue, reduce costs, and improve customer satisfaction.',
          'The new strategy aims to increase revenue, cost reduction, and improving customer satisfaction.'
        ],
        correctAnswer: 'The new strategy aims to increase revenue, reduce costs, and improve customer satisfaction.',
        checkAnswer: (answer) => answer === 'The new strategy aims to increase revenue, reduce costs, and improve customer satisfaction.'
      }
    ]
  }
};

// Add more questions for each age group and difficulty level
const moreQuestions = {
  kids: {
    easy: [
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct plural form?',
        options: [
          'The childs are playing in the park.',
          'The children are playing in the park.',
          'The childrens are playing in the park.',
          'The childs\' are playing in the park.'
        ],
        correctAnswer: 'The children are playing in the park.',
        checkAnswer: (answer) => answer === 'The children are playing in the park.'
      },
      {
        type: 'fillInBlank',
        prompt: 'My favorite ___ is pizza.',
        options: ['food', 'foods', 'fooding', 'fooded'],
        correctAnswer: 'food',
        checkAnswer: (answer) => answer === 'food'
      }
    ],
    medium: [
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "She writed a letter to her grandmother."',
        options: ['She', 'writed', 'a', 'letter', 'to', 'her', 'grandmother'],
        correctAnswer: 'writed',
        checkAnswer: (answer) => answer === 'writed'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence has the correct subject-verb agreement?',
        options: [
          'My brother and sister is coming to the party.',
          'My brother and sister are coming to the party.',
          'My brother and sister am coming to the party.',
          'My brother and sister comes to the party.'
        ],
        correctAnswer: 'My brother and sister are coming to the party.',
        checkAnswer: (answer) => answer === 'My brother and sister are coming to the party.'
      }
    ],
    hard: [
      {
        type: 'fillInBlank',
        prompt: 'If I ___ a bird, I would fly to the mountains.',
        options: ['am', 'are', 'were', 'is'],
        correctAnswer: 'were',
        checkAnswer: (answer) => answer === 'were'
      },
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a correct sentence:',
        options: ['carefully', 'opened', 'the', 'present', 'She'],
        correctOrder: [4, 1, 0, 2, 3],
        checkAnswer: (index) => index === 4 // Index of first word "She"
      }
    ]
  },
  teens: {
    easy: [
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct homophone?',
        options: [
          'Your my best friend.',
          'You\'re my best friend.',
          'Your\'e my best friend.',
          'Youre my best friend.'
        ],
        correctAnswer: 'You\'re my best friend.',
        checkAnswer: (answer) => answer === 'You\'re my best friend.'
      },
      {
        type: 'fillInBlank',
        prompt: 'That movie was so ___ that I fell asleep.',
        options: ['bored', 'boring', 'bore', 'boringly'],
        correctAnswer: 'boring',
        checkAnswer: (answer) => answer === 'boring'
      }
    ],
    medium: [
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "The influencer\'s product was definately worth buying."',
        options: ['The', 'influencer\'s', 'product', 'was', 'definately', 'worth', 'buying'],
        correctAnswer: 'definately',
        checkAnswer: (answer) => answer === 'definately'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct preposition?',
        options: [
          'I\'m obsessed on this new game.',
          'I\'m obsessed by this new game.',
          'I\'m obsessed with this new game.',
          'I\'m obsessed from this new game.'
        ],
        correctAnswer: 'I\'m obsessed with this new game.',
        checkAnswer: (answer) => answer === 'I\'m obsessed with this new game.'
      }
    ],
    hard: [
      {
        type: 'fillInBlank',
        prompt: 'Had she told me about the party, I ___ gone.',
        options: ['would', 'would have', 'will have', 'had'],
        correctAnswer: 'would have',
        checkAnswer: (answer) => answer === 'would have'
      },
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a correct sentence:',
        options: ['very', 'found', 'the', 'documentary', 'we', 'informative'],
        correctOrder: [4, 1, 2, 3, 0, 5],
        checkAnswer: (index) => index === 4 // Index of first word "we"
      }
    ]
  },
  adults: {
    easy: [
      {
        type: 'multipleChoice',
        prompt: 'Which sentence uses the correct capitalization for a title?',
        options: [
          'The Impact of Digital Marketing on Small businesses',
          'The impact of digital marketing on small businesses',
          'The Impact Of Digital Marketing On Small Businesses',
          'The Impact of Digital Marketing on Small Businesses'
        ],
        correctAnswer: 'The Impact of Digital Marketing on Small Businesses',
        checkAnswer: (answer) => answer === 'The Impact of Digital Marketing on Small Businesses'
      },
      {
        type: 'fillInBlank',
        prompt: 'According to the report, the ___ has been steadily increasing.',
        options: ['statistic', 'statistics', 'statistician', 'statistical'],
        correctAnswer: 'statistics',
        checkAnswer: (answer) => answer === 'statistics'
      }
    ],
    medium: [
      {
        type: 'errorIdentification',
        prompt: 'Find the error in this sentence: "The CEO ensured that all stakeholders would benefit from this arrangement."',
        options: ['The', 'CEO', 'ensured', 'that', 'all', 'stakeholders', 'would', 'benefit', 'from', 'this', 'arrangement'],
        correctAnswer: 'ensured',
        checkAnswer: (answer) => answer === 'ensured'
      },
      {
        type: 'multipleChoice',
        prompt: 'Which sentence demonstrates correct use of a comma?',
        options: [
          'After reviewing the proposal we decided to proceed with the project.',
          'The team leader who is responsible for the project called a meeting.',
          'On May 15, 2023, the company announced its new initiative.',
          'The report was comprehensive but it lacked specific recommendations.'
        ],
        correctAnswer: 'On May 15, 2023, the company announced its new initiative.',
        checkAnswer: (answer) => answer === 'On May 15, 2023, the company announced its new initiative.'
      }
    ],
    hard: [
      {
        type: 'fillInBlank',
        prompt: 'The ___ of the committee were unable to reach a consensus.',
        options: ['member', 'members', 'membership', 'membering'],
        correctAnswer: 'members',
        checkAnswer: (answer) => answer === 'members'
      },
      {
        type: 'sentenceRearrangement',
        prompt: 'Arrange the words to form a grammatically correct sentence:',
        options: ['although', 'proposal', 'was', 'the', 'innovative', 'it', 'financial', 'lacked', 'viability'],
        correctOrder: [0, 3, 1, 2, 4, 5, 7, 6, 8],
        checkAnswer: (index) => index === 0 // Index of first word "although"
      }
    ]
  }
};

// Merge the additional questions with the original question banks
for (const ageGroup in moreQuestions) {
  for (const difficulty in moreQuestions[ageGroup]) {
    questionBanks[ageGroup][difficulty] = [
      ...questionBanks[ageGroup][difficulty],
      ...moreQuestions[ageGroup][difficulty]
    ];
  }
}

// Main generator function
export const generateQuestion = (ageGroup, difficulty) => {
  // Get the appropriate question bank
  const questionBank = questionBanks[ageGroup][difficulty];
  
  // Select a random question
  const questionIndex = Math.floor(Math.random() * questionBank.length);
  let question = { ...questionBank[questionIndex] };
  
  // For multiple choice and fill in the blank, shuffle the options
  if (question.type === 'multipleChoice' || question.type === 'fillInBlank') {
    question.options = shuffleArray(question.options);
  }
  
  // For sentence rearrangement, shuffle the options but keep track of the correct order
  if (question.type === 'sentenceRearrangement') {
    const originalOptions = [...question.options];
    const shuffledOptions = shuffleArray(question.options);
    question.options = shuffledOptions;
    
    // Update the correctAnswer to be the first word in the correct sentence
    const correctWord = originalOptions[0];
    question.correctAnswer = shuffledOptions.indexOf(correctWord);
  }
  
  return question;
};