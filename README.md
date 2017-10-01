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
npm start
```
2. go to http://localhost:8080
3. thats it........
4. or just go to https://calendarttp.herokuapp.com

### endpoints
#### GET
__/events__
  ```bash
  # example
  # returns all events from all months and years
   curl -X 'GET' https://calendarttp.herokuapp.com/events
  ```
__/events/:id__
  ```bash
  # example
  # returns single event with that id
  curl -X 'GET' https://calendarttp.herokuapp.com/events/30
  ```
  __/events/q?year=(year)&month=(name of month)&monthN=(month num-1)&day=(day)&hours=(hour start)&mins=(min start)&houre=(hour end)&mine=(min end)&priority=(priority)&description=(description)__
  ```bash
  # example
  # this is more specific query which you can leave some blank
  # returns all events in 2017
  curl -X 'GET' https://calendarttp.herokuapp.com/events/q?year=2017
  # returns all events with month 8 (September)
  curl -X 'GET' https://calendarttp.herokuapp.com/events/q?monthN=8
  # returns all events on September 1, 2017
  curl -X 'GET' https://calendarttp.herokuapp.com/events/q?month=September&year=2017&day=1
  # returns all events with high priority
  # (low -> 0, medium -> 1, high -> 2)
  curl -X 'GET' https://calendarttp.herokuapp.com/events/q?priority=2
  ```

#### POST
__/events__
  ```bash
  # note: this doesnt check if month num or name is right or if the time is right (basically you can post anything as long as it fits the datatype)...
  # example   
   curl -H "Content-Type: application/json" -X 'POST' https://calendarttp.herokuapp.com/events -d '{"year": 2017, "monthNum": 8, "month": "September", "day": 1, "hourStart": 0, "minStart": 0, "hourEnd": 1, "minEnd": 0, "priority": 2, "description":"send another event"}'
  ```
__/events/:id__
  ```bash
  # note: this doesnt check if month num or name is right or if the time is right (basically you can post anything as long as it fits the datatype)...
  # example   
   curl -H "Content-Type: application/json" -X 'POST' https://calendarttp.herokuapp.com/events/35 -d '{"year": 2017, "monthNum": 8, "month": "September", "day": 1, "hourStart": 0, "minStart": 0, "hourEnd": 1, "minEnd": 0, "priority": 2, "description":"edit this event"}'
 ```
#### DELETE
__/events/:id__
  ```bash
  #example
  curl -X 'DELETE' https://calendarttp.herokuapp.com/events/35
  ```

### UI and stuff
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
