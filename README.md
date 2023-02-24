![Repo: madseventwo Atom Discord Bot - Skill Assessments for Education](https://github.com/madseventwo/madseventwo/blob/main/assets/github-preview_atom-bot.svg)

## Built with Assistance From...
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
![Google](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## About

This is an <span style="color:red">in-development Discord bot</span>. The bot includes simple commands designed to help high school students receive continual and repeated exposure to concepts.

- Questions based on technical skills like Agile Methodology, HTML, Python, etc. (many of which helping prepare for LinkedIn Skill Assessments)
- Questions presented in familiar "multiple choice" format, 
- Spaced repetition algorithm based on SuperMemo's [SM-2 Algorithm](https://en.wikipedia.org/wiki/SuperMemo) reintroduces questions to students more frequently when they get them wrong and less frequently the more they get them right.
- Student data stored in a private [Mongo](https://www.mongodb.com/) database for privacy.

### v0.3.0-alpha

The first functional version includes two commands:

#### /Slash-Commands
- **/practice** initializes a practice session. Questions are delivered 1-by-1 to each individual student, pulled from a large question bank at random. Each attempt takes into account the correctness of the response and the speed with which the student answers to calculate an estimated "easiness" for each question. That calculation helps determine how soon the student should see this same question again. This command provides repeated exposure to information *customized to the individual's level*.
- **/skill-assessment** initializes a 15-question quiz with 90sec time limit per question. These questions are pulled at random from only those questions already attempted by the student calling the command. This assessment is meant to be graded and infinitely repeatable (each repeat attempt will pull a different set of 15 random questions, causing practice sessions in between attempts essential to improving a grade and eliminates the ability to memorize letter responses instead of learning actual concepts).

The bot delivers quizzes and practice questions on a variety of subjects, helping students to test their knowledge and prepare for exams.

## Teaching a "Figure it Out" Mentality

An important aspect of my personal teaching style guides the development of this tool: Instead of giving traditional lectures where students take notes, study, then regurgitate, I give my students challenging questions that I know they won't be able to answer. When running the /practice command, students are expected to go search for answers, talk amongst themselves, or ask for help *before* answering questions vs. guessing when unsure; this allows them to simultaneously 
- learn new information (or remind themselves of previously known information) based on the same exact questions that will eventually appear on graded assessments; and
- learn how to find unknown information. After every successful attempt, it reinforces their confidence in solving new problems never before encountered.

## Usage

While in Pre-Release, A.T.O.M. is currently unavailable for use in other servers.

## Contribution

At the moment, I am building this bot by myself as I have time between classes and other responsibilities. I actively add ideas and bugs to [Issues](https://github.com/midipaolo/atom-discord-bot/issues), and encourage my students (and others) to do the same.

## License

A.T.O.M. [is licensed](https://github.com/midipaolo/atom-discord-bot/blob/main/LICENSE) under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) License

## Major Contributors
<table><tbody><tr><td align="center" valign="top" width="11%">
<a href="https://github.com/midipaolo">
<img src="https://avatars.githubusercontent.com/u/51255499?v=4" width="75" height="75"><br />
Michael A. DiPaolo
