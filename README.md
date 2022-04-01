# All Trails Team is Headed to Lunch

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## My thoughts
Probably the hardest part of this project was not overcomplicating it.
Initially I wanted to show off things like Providers/Consumers, or even Redux, but the deeper I got into it, the more I realized that it really didn't need as much as I had assumed. This was especially true as I familiarized myself with the Google Places and Map API, as I've never used it before.

Therefore, I aimed for "there's a beauty in simplicity".
You'll notice that I don't have very many components, and that the only significant 3rd party tools are:
- react
- TypeScript
- Tailwind
- Google Maps/Places api

#### Reasoning
In my early days as a JavaScript engineer, there seemed to be 1million tools that would make your life better.
As a more pragmatic engineer, my approach is more measured. Not all projects need redux, or even TypeScript (or even React!), and depending on the project at hand, it's worth evaluating what costs and benifits there will be from including things that increase a project's overhead.

### Things I think are worth noticing
- Im using `localstorage` to keep track of favorites.
- I don't have any code in place to resolve if someone tells the browser they can't use their location. Given the parameters of the project, I didn't see the need.
- You may notice I've added almost NO css. I'm relying a lot on Tailwind for styling and especially for responsiveness.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Testing
### `npm test`

I decided to skip unit tests this time around cause everyone can write them.
Instead, I included `Cypress`, a tool for end-to-end testing that I love.
I _think_ I heard it mentioned that this is also what AllTrails uses, but in the event that you havn't seen it, give it a run; it's fun to watch.

#### ** NOTE: **
Make sure that before you run `npm test`, the app is runnin at `http://localhost:3000`

### `npm run test:fast`
This also uses Cypress, but will kick of it's headless browser and will be faster than running the visualization.
