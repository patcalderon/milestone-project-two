#Milestone Project Two: User-Centric Frontend Development - Code Institute

##Demo
A live demo can be found at https://patcalderon.github.io/milestone-project-two/

##What is it?
It's a website created using Interactive Frontend Development. I chose to build a website where you can plan your trips within some of my favourite countries that I've personally visited.

##UX
My goal was to make the design appealing to the eye and easy to navigate through. The colors I chose were colors that I feel would fit perfect for the kind of website I wanted to make. Matching different shades of blue through the whole page.

##Technologies
*HTML
*CSS
*Bootstrap (4.1.3)
*Google Maps API

##Features
I also used a JavaScript function added to create an "autoresponse" when submitting in my forms. The navigation style I chose to use was a fixed navigation, due to the one page layout design. The fixed navigation allows for a userfriendly experience on this site. There are 5 pages and very easy to maneuver through.

##Features Left to Implement
In the future, I would like to add better UX to the section between the map and the footer. Probably hide the white space and make it appear in a hover type of way.

##Testing
This site was tested mostly in DevTools in Google Chrome, but also across other browsers such as Chrome, Safari and Internet Explorer. The website was created on a design made by wireframe diagrams using Balsamiq. And also on mobile and tablet devices (iPhone 7 Plus, 8, iPad Pro with Safari) to ensure compatibility and responsiveness. When testing I realized that social media links at the bottom of the footer were placed too much to the left when viewed in a mobile. In that way I could see what the problem was and solved it with some help from DevTools.


##Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The link to the demo is at the top, or you can deploy it here: https://patcalderon.github.io/milestone-project-two/

##Credits
Content
The About section uses text from Dave's Wikipedia page: https://en.wikipedia.org/wiki/Dave_(rapper)

##Media
The website uses of the Google Maps API to search for all different places displayed on the map. Google Images, that includes the background images from every section and also the ones used above the song listed on the Music section. And it is also where found the logo I used in the navbar. The songs are linked to Spotify and the video is from YouTube.

##Acknowledgements
The website default look is inspired by: https://benhasselgren.github.io/ifd-milestone-project-pages/ I put my own twist to it using my own personal touch.


This is for educational use.

















Click here to view website 
Quick Tutorial
First enter select a country from the dropdown menu. Notice how the map zooms in over that country
Now type a country in the correct field. Notice how the cities generated are restricted within that country
Now toggle the radio buttons to change the places you are searching for within that city
To revert everything, press reset
Purpose
The purpose of this project is to create a website that allows users to search for holiday locations by being able to see what hotels, tourist attractions and resteraunt/bars there are to visit in different cities. The website makes use of the google maps api to search for all the differnt places on the map. The results of the users map quesries should be presented in a readable and user-friendly way/

Functionality/Technologies
This website has lots of functionality. One functioniality is that it's resposnive. It has responsive elements such as the map and filter sections that adapt to make the website more user-friendly on mobile and desktop devices. The map also has functionality as it allows the user to see clearly all the locations of what they have searched. They can also zoom in and out with the map, click on markers to view information about places. The filter section allows the user to manipulate the map to zoom in on cities, countries and change what markers they want to see.

There is some different technologies used in this project. Bootstrap was used for the structure of the web pages(html). Using Boostraps classes, tables and grids were made to give the website a nice layout with a responsive design. Google fonts were also applied in the header to give font a Roboto or Exo font-family. Google maps api was used to manipulate and design an attractive map that shows all the locations of places that the user has searched for. I used google maps api tutorials and used code from there originally. This code showed me hot to zoom in to places on events forced by the user. It also showed me to how to take information of discovered places and then add that to html elements to display to the user.I then added to this code to make it more suited tothe brief and allow searching so be more interactive and alow the user to query cities in more detail.Then after I was happy with the functionality of the map search I realised the code was made with only javascript. I linked a jquery file and started to neaten things up by changing lots of javascript to jquery. I did however find this hard as I realised a lot of the google maps api code relied on javacript so I was unable to fully change all my code.

Testing
This website was tested using Chrome development tools. The website was created on a design made by wireframe diagrams using Balsamiq. It was important to make sure the final version looked like the designs so Chrome development tools were used to test out all the features and see if they responded correctly and looked right. Once mistakes/changes were made with Chrome, the code was copied to the actual code to fix the issue permanently.

I also did some manual tests. Here are a couple examples

Test	Input	Expected output	Output	Pass?
Testing to see if the correct country comes up when selected country	Canada	Cities that are in Canada	Cities that are in Canada	Yes
Testing to see if a the city field is reset when clicked on reset button	Click on reset button	all cities should shown now	all cities shown	Yes
Deployment
This website was deployed to github pages. It was very easy to set up as the website has been put in a github repository from the start so all that had to be done was activate github pages and point the source to the master branch.