# All Trails Team is Headed to Lunch

![alt text](https://github.com/itcropper/at-homework/blob/main/public/AT-logo.svg?raw=true)
![image](https://user-images.githubusercontent.com/1205876/161344684-5339beda-95c7-4c09-88f5-0d7e0813c6cb.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Built with:
`npm version 8.5.5 `

`node version v17.8.0`


### **** Note: if you try running this and something isn't working, verify your node version ****


## My thoughts
Probably the hardest part of this project was not overcomplicating it.
Initially I wanted to show off things like Providers/Consumers, Context, or even Redux, but the deeper I got into it, the more I realized that it really didn't need as much as I had assumed, and I wanted the code to be understandable.

This was especially true as I familiarized myself with the Google Places and Map API, as I've never used it before.

Therefore, I aimed for "there's a beauty in simplicity".
You'll notice that I don't have very many components, and that the only significant 3rd party tools are:
- basic react
- TypeScript
- Tailwind
- Google Maps/Places api

Besides that, my dependencies list is pretty minimal.

### Reasoning
In my early days as a JavaScript engineer, there seemed to be 1million tools that would make your life better.
As a more pragmatic engineer, my approach is more measured. Not all projects need redux, or even TypeScript (or even React!), and depending on the project at hand, it's worth evaluating what costs and benifits there will be from including things that increase a project's overhead.

### Things I think worth noticing
- Im using `localstorage` to keep track of favorites.
- I don't have any code in place to resolve if someone tells the browser they can't use their location. Given the parameters of the project, I didn't see the need.
- You may notice I've added almost NO css. I'm relying a lot on Tailwind for styling and especially for responsiveness.



## Available Scripts

<b style="color:red">BEFORE RUNNING ANYTHING</b>
Please make sure the project has the environment file
`.env` with the google api key called `REACT_APP_PLACES_KEY`



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
