# **LE RESTAURANTEUR**

## https://le-restauranteur.herokuapp.com/

## Built by Spencer Dant, February 2019

---

#### Overview

Le Restauranteur is an app built with React that fetches data from a server-side API, which itself retrieves its data from Google Places. The purpose of building this app was to make a problem that often gets more complicated than it should be much, much simpler: where to go to eat. With Le Restauranteur, users can register an account and search their city or town, no matter how big or small. When they do so, the app will communicate with its server-side API and return a large selection of the best establishments in town. The app then randomizes the returned selection and presents the user with the random restaurant. If the user likes the restaurant, they can save it to their profile, where they can access it again in the future if they want to go back there. If the user does not like the choice offered, they can simply run the search again by clicking "pick another restaurant" and they will be presented with another random choice.

For the best results, some users might find it useful to input their city and state in the search bar instead of just their city. For example, a user searching "Bloomington" for options in Bloomington, IL will find that the search returns restaurants from Bloomington, IN. However, searching "Bloomington Illinois" will present them with the options they are looking for.

In addition to this search feature, users can also use Le Restauranteur to save their favorite restaurants in one place on their profile. To do so, a user can simply log in, visit their profile, and press "add a new restaurant." When the form is filled out and submitted, the restaurant of their choosing will be displayed on their profile regardless of whether they are still logged in. In order to remove a saved restaurant, a user can click "remove this restaurant" for that restaurant within their saved restaurants collection and it will be removed from their profile. They can also edit the details of any restaurants they add to their collection if necessary.

#### Possible Features to be Added:

* An embedded Google map display within the search window that places a pin at the location of the restaurant and allows the user to visualize where in their town that restaurant is located without searching it independently.
* The ability to search restaurants by name instead of place.
* Return websites and/or menus with searches.
* Geolocation to offer a random selection of restaurants in the town the user is currently in.

---

#### Software and Modules Utilized:

React as a baseline front-end library and Express as a framework with Bcryptjs implemented for security. MongoDB and Mongoose for database construction. Express-session, Body-parser, and Cors are also used for ease of use and security. The site is styled with CSS in a React file structure and user interaction is handled predominantly with Javascript.

---
---

#### User Stories:

1. When they visit the site, they must first log into an account.
	* If they do not have an account, they register, and are redirected to the search page.
	* If they do have an account, they are redirected to the search page upon logging in.
2. On the search page, the user can search for restaurants by city or by name.
3. Regardless of how they search, the user will see a list of restaurants by name, address, city, and state. The user will have an option to save this restaurant to their profile and add new properties, such as what they like or dislike about the restaurant.
4. On their profile, they can see the name, address, etc. of their saved restaurants, as well as the information they added about the restaurant. They can edit and update the information that they added as well as erase the update from their saved restaurant list.
	* May have: ability to rearrange restaurants on their list.
	* May have: randomly pick a single restaurant from their saved list.
5. To begin with the site's users cannot connect with one another or see their preferences, but that may be something I can add later on down the line.

#### Wireframes:

https://puu.sh/CJjep/7e07cfb79f.png ||
https://puu.sh/CJjeJ/71efadb8c9.png ||
https://puu.sh/CJjeS/d43ad4fd0b.png ||