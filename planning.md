# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Project 1 Planning

This document gives you a little more guidance about the [Project 1 planning deliverables](./readme.md#planning-deliverables) and how to approach them.

## Getting Ideas

Think about problems you know of - things that suck or are broken in the world. Could you build something that could grow into a solution? Try to create a focused app that does one thing well.

Examples of applications that do one thing well:

* <a href="https://maps-with-friends.herokuapp.com">Maps with Friends</a> - track friends by putting markers on a map
* Facebook Messenger - communication between individuals or groups
* <a href="http://www.questioncookie.com" >Question Cookie</a> - fast voting moderation

#### Potential Ideas

Here is a list of potential ideas for an appropriately sized app. Feel free to change these ideas around as needed to fit what you want to do:

* Movie Review App - An app that allows users to add movies, add reviews for those movies, rate movies on a 1-5 star rating system, and even save their favorite movies.
* Yelp for X Type of Business - Allow users to rank, rate, review, or otherwise vote on a certain type of business.
* Food Truck Tracker/Locator - Users can find their favorite food trucks, locate them on a map, see their menu, read their Tweets, and even add new food trucks.
* Personal Job App Tracker - An organizational app for users to keep track of jobs they've applied to. Users can sort jobs into categories/stages ("Pending", "Applied", "Offered", etc.), tag them, and share job listings with friends.
* Concert Finder - Let a user find and save their favorite artists, then find nearby concerts by that artist coming soon.
* Social Network for Enthusiasts of...? - Build a social network that allows users to "friend" or "follow" other users, create a "profile", and send messages to each other. The app could be about a certain topic, like soccer or bird watching... anything really.

## Project Planning Deliverables

### Scope

Software development is about managing complexity. It's easy for code to become a tangled web of tightly coupled functions or data structures (<a href="http://callbackhell.com" >callback hell</a>, anyone?) if you aren't diligent and vigilant in your decision-making.

The same applies to the scope of your project. If you're always looking at the top of the mountain, you'll trip on the rocks in front of you.

![iterative-design](https://cloud.githubusercontent.com/assets/7833470/11330092/f76e7c50-9159-11e5-875f-748817e41afc.png)

Figure out the absolutely smallest thing you can do, and do that thing. Not the next immediate thing, but the simplest possible implementation of your app. If that means that the entire functionality of your app consists of displaying all of a user's photos from their Flickr account and saving a favorite photo url to the database that is totally great.

Don't think so? Check out the [requirements](./readme.md#technical-requirements). It's all there - your own Node/Express API, `user` and `photo` models associated with each other, AJAX, and even an external API call!

See? You did it!


### User Stories

Outline your core user stories, and divide them into clear, smaller steps (sometimes called development "stories"). For example, this user story:

*As a user, I want to create a profile for my dog.*

Might consist of these steps:

* Wireframe what a profile page will look like.
* Create an `ejs` template for a profile page
* Write a server route to serve the profile page
* Create a schema for a dog, defining attributes (e.g. name, age, favorite chew toy, etc.).
* Create a page / form / route to create a new user in the database.
* Serve the profile page and populate it with information from the database.

Use your own <a href="https://trello.com">Trello</a> board to track your progress and keep you focused. Make each card a user story, and mark it with a time estimate. You can make the steps for that user story into a checklist on the card (or individual cards, if you prefer). For a more accurate estimate, double the time you think it will take.

Add comments to your cards as you progress and complete features. By the end of your project you'll have a living log of "gotchas" you debugged and things you learned about the process of iteratively developing an app.

### Wireframes

Sketch out the pages of your app. What will they look like? How they will work, both on page-load and when affected by jQuery?

Iterate on your wireframes. Start simple: draw some boxes. Add some text to the boxes to indicate what they represent, like the header, sidebar, images, titles, articles, and so on.

![wireframe](https://cloud.githubusercontent.com/assets/7833470/11330149/d84f3e94-915a-11e5-9b7d-31c41492dd6b.jpg)

Next, incorporate some notes on what the actual content will be. Remember, it's okay if it's still a sketch.  Either of the wireframes below would work well to solidify your plan.

![wireframe-progress](https://cloud.githubusercontent.com/assets/7833470/11330157/fbfaf388-915a-11e5-927c-1fa228b70f12.jpeg)

It's easier to do these steps on paper than in code, so iterate frequently at this stage to save yourself time down the road.

Once you have wireframes for the different pages of your site, you can wireframe how the pages will connect to each other by drawing the user flow.

![user-flow](https://cloud.githubusercontent.com/assets/7833470/11330163/1df572f6-915b-11e5-9458-a37dcc670360.png)

The more time you spend on this step, the easier it will be to structure your HTML. Well-structured HTML will make it easier to implement your CSS, to manipulate the DOM, and to figure out what routes you need to get data for the page.

### Data Models and ERD

Use an entity relationship diagram (ERD) to plan out your data models and any relationship(s) among them. In your diagram, write out the properties for your schemas. Make sure to answer these questions:

* Will your application have many models or only a few?
* How will the models interact with each other?
* What attributes (properties) will the schemas have, and what kind of data types (string, integer, collection, etc.) will they use?

### Feasibility Check

Before you get started, you'll want to do some research to see if what you're looking to do is possible in the amount of time you have. Some areas that you might want to investigate, depending on your app's desired functionality are:

* reading the documentation for an external api to determine what data you can request. Is it JSON? XML? Is all the information you want included in the response? Will you need to make several different requests to the API?  Do you need to sign up and wait for approval to use the API?

* verifying that you can successfully request data from your API with Postman.

* researching something you want to use that hasn't been taught in class yet, like an external library or module, data store, etc.

#### Example Feasibility Checks

* [ ] Read Yelp API documentation.
* [ ] Use Postman to test Twilio API.
* [ ] Write a script to scrape news data.

## Outside-In Development

Outside-in development says you should start with the "outside" of your app - the views that the user sees - and move backwards to the server, then the database. Don't try to develop the whole front end of your app before moving on, but for each user story, page, or feature, you can follow the outside-in pattern.

Start with the basics of your view:

* [ ] An `index.html` file with static data directly in the file.
* [ ] Create an `ejs` client-side template based on the HTML structure.
* [ ] Use the template to display dynamic data from a temporary array on the client-side.
* [ ] Run `npm init` to set up your Node/Express app.
* [ ] Install necessary node modules, and set up boilerplate Express app.
* [ ] Move the dynamic data from the client-side to a temporary array on the server, and set up a `GET` request to respond with the data.
* [ ] Set up MongoDB/Mongoose, and move the data to your database.

Once you have an index page populated with data from the database, you can move on to other views or features. Your data is already in the database, but try to follow the outside-in process to:

* [ ] Make a button that allows you to edit a specific data item.
* [ ] Make an AJAX call to a `PUT` route on your server that updates individual data items.
* [ ] Create the `PUT` route on your server that updates individual items in the database.

## Submission

You must submit all of your planning deliverables in-person to your assigned instructor, *and* get approved, on **Friday, October 13th by 3:00pm**. Please create physical (or electronic) documents for each deliverable, and upload them to the <a href="https://trello.com">Trello</a> board you create for your project. For any items done on paper, please take a photo to upload to Trello.
