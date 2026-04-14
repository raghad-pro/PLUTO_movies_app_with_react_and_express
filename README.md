#  Movie App

A movie browsing web app built with React and the OMDb API.

##  How to Run

1. Clone the repository
   git clone https:https://github.com/raghad-pro/PLUTO_movies_app_with_react_and_express

2. Install dependencies
   npm install

3. Start the app
   npm run start

4. Open your browser at
   http://localhost:3000

##  Assumptions

- Used OMDb API instead of imdbapi.dev because imdbapi.dev had CORS issues and was unreliable
- The app loads "action" movies by default on first open
- Movies with missing posters show a placeholder image


##  Known Limitations

- Carousel does not loop (stops at start and end)
- OMDb free plan is limited to 1000 requests per day
- Hover behavior is not available on touch devices — click/tap is used instead


##  Progress

### Completed
- Movie list with 20 movies
- Default selected movie on load
- Hover preview and click to select
- Background changes based on current movie
- Search by pressing Enter
- Loading, error, and empty states
- Carousel with prev/next buttons and disabled state
- Responsive design (mobile, tablet, desktop)
- Missing data handled with fallbacks
- Clean and organized code with reusable components

### Not Completed
- Nothing major — all main requirements are done


##  Challenges

- imdbapi.dev had CORS issues so I switched to OMDb API
- Separating hover and selected movie state took some thinking
- Making the background update smoothly without flickering


##  Built With

- React
- OMDb API
- Font Awesome
- CSS (no frameworks)
