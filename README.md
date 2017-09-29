# CalenderTTP
Calendar for TTP question: uses postgres, javascript, ejs templating, bootstrap, and css (I think that's it)

### How to use
Before install:
- Need postgres database
- env var  DATABASE_URL
- env var PORT

...
1. In terminal
```bash
npm install
node start
```
2. go to http://localhost:8080
3. thats it........
4. or just go to https://calendarttp.herokuapp.com

##### UI and stuff
- to switch month or year click on month or year
- to view events click on day
- to add event click on day then click new
- to edit event click edit
- ...etc for others that have buttons

<!-- Must Have Specs
- ~~The UI should have one month hard coded view (Pick any month)~~
- ~~Ignore users/login, just have one hardcoded user~~
- ~~HTML rendered client side~~
- ~~Click on a day box, and be able to create a new event on that day which gets sent to the backend on clicking submit.~~
  - ~~The form should have start time, end time, description and submit.~~
  - ~~Once submit is clicked the form should disappear.~~
  - ~~Event should now appear in that day’s box.~~
  - ~~Events cannot span multiple days. Must start and end the same day.~~
- ~~Show all events the user has on their calendar.~~
- ~~The UI should have 4 rows of 7 boxes (simple case of a 28 day month).~~
- ~~The front end should communicate with an API backend using JSON. Don’t spend a lot of time on the CSS making it look beautiful; just make it functional.~~

Optional Specs (Not required; bonus points available for inclusion of one or more features)
- ~~Switch between months~~
- Week or ~~day view~~(sort of)
- Handle events spanning multiple days
- ~~Handle too many events to fit in your box UI on a given day.~~ (kinda done?)
- ~~You should be able to update/delete events. How you implement this UX is up to you.~~
- ~~The UI should have 5 rows of 7 boxes with the correct date on the correct days.~~


BACK END
Build the backend of the calendar application. The API for the calendar should be the following:

Events (Minimum Required API)
- ~~POST /events~~
  - ~~Should create an event~~
-  ~~GET /events~~
  - ~~Should return all events~~

Events (Optional API. Not required; bonus points available)
- ~~DELETE /events/:id~~
  - ~~Should delete an event~~
- ~~PUT /events/:id~~
  - ~~Should update an existing event~~ -->
