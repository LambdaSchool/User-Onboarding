# Module Project: Advanced Form Management - User Onboarding

## Project Description

We've seen many different styles of form management by now -- simple to complex. Today we are going to unleash your inner form-wizard! 🧙

## Instructions

### Task 1: Set Up The Project

- [x] Start off by installing a blank React app by running `npx create-react-app <app-name> --use-npm`.
- [x] Using `npm`, add the following as dependencies inside your React app:
  - `yup`
  - `axios`
- [x] Create a component file called `Form.js`, import it into your `App.js` file, and place the component in your JSX there.

### Task 2a: MVP

#### Create Your Advanced Form

We want to create a form to onboard a new user to our system. We need _at least_ the following pieces of information about our new user:

- [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server.

#### Implement Form Validation and Error Messaging

Form validation is one of the facets of an application that makes it feel polished and controlled from a user perspective. With that in mind, implement the following:

- [ ] Using Yup, set up _at least_ two different validations along with custom error messages that will display on screen when validation fails.

#### Make a POST Request

Being able to `POST` data is a key skill of any developer, no matter your skill level.

- [ ] Craft a `POST` request using `axios` that sends your form data to the following endpoint: _`https://reqres.in/api/users`_
- [ ] Verify using a `console.log()` that you are receiving a successful response back

(Note: For those that are curious, we're using [reqres.in](https://reqres.in/) for this assignment's API. It's a free API that allows us to simulate a `POST` request for any data that we send it. Pretty awesome!)

#### Display Returned Data to Screen

When you get your data back, you will want to do something with it, right? Let's display a list of users in our app.

- [ ] Set up a state property called `users` that is initialized with an empty array
- [ ] Every time you make a `POST` request, and get that new user data back, update your `users` state with the new user added to the array
- [ ] Render `users` in your app. You can use the html pre tag and JSON.stringify() method to display your post request.

### Task 2b: Exit Ticket

Once you begin, you will have 15 minutes to answer the questions [here](https://app.codesignal.com/public-test/QmsQp5mvdbus5ruJr/cdTTkLGQ7XaZGH).

The completion of these questions is mandatory for MVP. However, passing the quiz doesn't affect your standing as a Lambda School student whatsoever. This is Lambda School testing itself! Please answer honestly and to the best of your ability without using external references.

### Task 3: Stretch Goals

The following are stretch goals that you should attempt _after_ you meet MVP for your project:

- [ ] Add basic styling to your form in your app. Make it look pretty with any styling method you choose.
- [ ] Implement a dropdown menu in your form. Add a `role` value to your state and add a dropdown with different roles for your users.
- [ ] Create 3 new inputs inside your form of your choice along with corresponding validation and error messaging
- [ ] Add to your existing handling so that, if a user inputs their email as `waffle@syrup.com`, they receive an error message in their form that says _"That email is already taken."_

## Submission Format

* [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's  Repo). **Please don't merge your own pull request**
* [ ] Fill out your module retrospective form [here](https://forms.lambdaschool.com/module-retrospective) with a link to your PR
