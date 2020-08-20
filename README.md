## 5cent Software Systems

### IT Project - Semester 1 - 2020: ePortfolio

#### Marcus Litterick, Nathan Doolan, Fraser Langton, Fabrice Wong Kwok, Calvin Sagar

The project for COMP30022 is to develop a personal ePortfolio system. The ePortfolio system must be capable of allowing you to submit individual guest lecture reports and end-of-subject individual reflections that are requirements in COMP30022, as well as a team report. You will be assigned a client in addition, specifically a Masters student (or group of Masters students) studying SWEN90016. The Masters students will be assigned in Week 3 of the semester.

___

### Development Worfklow/Feature Creation

##### Ticketing
On Trello ensure the ticket is correct and is not waiting on any other ticket/card.
A correct ticket has a "Done condition" that outlines the state of the task that deems it finished, a checklist that roughly outlines the timeline of the task and any relevant tags and members attached to it.
If the ticket is correct and your starting it move it to the "Doing" List in Trello.

##### Starting a feature
To begin adding a feature start by moving your current local branch to master and ensure it is up to date.\
` git checkout master `\
` git fetch && git pull `

Then create and checkout a new branch under the following convention. ` {university id}/{feature name} `\
` git checkout -b "{university id}/{feature name}" `

##### Development
Develop the feature on the feature branch.
Best practice is to only work on the feature specified by the ticket on that feature branch
Work through the timeline outlined in the checklist on the card, as you reach checkpoints make commits to your feature branch.\
` git add <file> ` for any new files required for the feature. \
` git commit -m "{Description of changes}" ` to "save" them to your feature branch.


##### Feature completion
Upon completion of the feature check that it is working locally.
If anyone else has made changes to the master, merge them from the master to your feature branch.
` git merge master ` \
Now push the feature branch to the remote.
` git push -u origin {university id}/{feature name} ` \
  ###### Pull Requests
  Now go to GitHub and open a new Pull Request.
  Set the "base" as master and the "compare" to your feature branch.
  Fill out the heading with the feature name and write a breif description of the changes the feature adds to the master.
  Assign Nathan to the Pull Request then click "Create Pull Request".
  Your Pull Request will be reviewed by Nathan and one other member of the team withiin 48 hours of making the request.
  If there is reason to deny the request from either reviewer you will be messaged to resolve the issues.
  
___

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
