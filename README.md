## 5cent Software Systems

### IT Project - Semester 1 - 2020: ePortfolio

#### Marcus Litterick, Nathan Doolan, Fraser Langton, Fabrice Wong Kwok, Calvin Sagar

The project for COMP30022 is to develop a personal ePortfolio system. The ePortfolio system must be capable of allowing you to submit individual guest lecture reports and end-of-subject individual reflections that are requirements in COMP30022, as well as a team report. You will be assigned a client in addition, specifically a Masters student (or group of Masters students) studying SWEN90016. The Masters students will be assigned in Week 3 of the semester.

### Git

##### Pulling

@Nathan todo

##### Branching

@Nathan todo

##### Merging

@Nathan todo

##### Pushing

@Nathan todo

### Installation
Check you have Node by typing `node` in CMD, if not, get [Node](https://www.npmjs.com/get-npm) \
`cd app
`\
`npm install
` 

Check you have Python by typing `python` in CMD, if not, get [Python](https://www.python.org/downloads) \
`cd ..` _(return to parent dir)_\
`python -m venv venv
`\
`venv\Scripts\pip install -r requirements.txt
`

### Running

##### Development

API (back-end) \
`venv\Scripts\python api\main.py
`

APP (front-end) \
`cd app
`\
`npm run start
`
##### Build

`npm --prefix app run build
`\
`venv\Scripts\python api\main.py
`

### Deploying

@Nathan todo
