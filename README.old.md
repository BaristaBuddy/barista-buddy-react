# BaristaBuddyReact
The end-user interface where customers can make selections and check out from their favorite coffee shops and cafes

## Overview
The intended purpose of this project is to connect cafe's, local coffee shops, and/or small businesses with their local patrons. It is a way to have their menus and prices in a centralized database so that they can more effectively get the word out to their local communities to generate revenue and strengthen their business to better compete with bigger, established, national chains.

## The MVC
This MVC in addition to being integrated with the API within this project is to facilitate the structure and server-side database portion of this application to store menu items, prices, create routes, and build the bones to a functional website/app to create and organize individual pages of businesses that use these services through us.

The MVC pulls data from the API to populate the information in an organized way to a webpage using C# and .Net in a way that can be read through HTML5 based programs, ie: web browsers.

## Features
Within the BaristaBuddyMVC we have: Controllers, Models, Services, and View folders which house the various code which builds our app.

The most notable features are that, when used, users can add, delete, update their items as well as do broad and specific searches in pulling information from the data stored within the API.

### Item Modifier
Users can set
   - ID
   - names 
   - ingredients
   - images
   - prices
On their menus.

Those with permissions will be able to add to these, update items currently stored in the database, delete items, add additional images, and edit prices, which all will be reflected on the webpage/app once refreshed. 

### Store Modifier
The store modifier essentially functions the same as the item modifier, the only difference being the information input and output.
  - ID
  - names
  - street address
  - city
  - state
  - zip code
  - phone number
  - business website URL
  - images of the business itself
Users with permissions will be able to update, add, delete, business information stored on the database and shown on the webapp.

## Use
In order to use this MVC you will also need to run the API at the same time so that the program can communicate with the database.

## Future Developments
As this project develops throughout the alloted timeline more features and functionality will be implemented.
Features worked on and applied are:
  - map location functionality
  - electronic payment methods
  - delivery integration
  - administrative options
  - login credentials and password encryption
  - mobile device application
  - etc...

#### Credits

Sihem Azibi, Matthew Barnhart, Brennan Roorda, James Zobian

DeltaV 2020 401d5/1