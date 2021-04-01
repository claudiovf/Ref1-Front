
# Ref1 App

The new easy to use Formula 1 stats reference web app. Visit [Ref1.App](https://ref1.app) to see it live! :relaxed:

What has: 
  * two thumbs 
  * started as a personal project to practice MERNG + Typescript skills
  * and has now over 7.5k page views in over 50 countries? 
  
  :+1: THIS PROJECT :+1:

## Overview

### About The Project

The objective of the [Ref1.App](https://ref1.app) was to create an **engaging, visually appealing and easy to use mobile-first** web app for all Formula 1 fans through the use of a modern stack. I was inspired to create a tool that could benefit new and lifelong fans of the sport. The app aims to address some of the pain points within the online experience that fans have had up until this point in terms of finding the Formula 1 info they want.

 
### Parts + Stack

This project has 3 parts:

 1. The Frontend ( This repo )
    * React 
    * Typescript
    * Redux
    * GraphQL
    * Styled-Components
     
 2. The API  ( [Backend repo](https://github.com/claudiovf/ref1-Backend) )
    * NodeJS
    * Typescript
    * GraphQL
    * Mongoose
    * JWT
    * MongoDB 
    
 3. The Admin Dashboard ( [Admin repo](https://github.com/claudiovf/ref1-admin) )
    * React
    * Typescript
    * GraphQL 
    * Semantic-ui-css
    

## The Problem

Formula 1 fans needed an easy way to find the statistics they are after. So far, all that was available to fans were poorly formatted websites with lots of links and tables and lists. Add to that the obscene amount of ads and you have something almost unusable, specially during a race when you dont want to spend too long reading an entire Wikipedia article, or decrypting your way through bad websites just to find who had the most podiums in 2013 (it was Vettel by the way). 


## The Challenges

 * Formula 1 has over 70 years of rich history. That makes it difficult to have all countless stats of over 1000 races, 850 drivers and 210 teams within a few clicks away.
 *  Removing all the unnecessary links, lists, tables, dropdown boxes, filters, etc.
 *  Making it intuitive, modern and beautiful.


## The Solution

### Simple

The app has 3 main page views (Home, Profile, Search).

From the start, as a Formula 1 fan, I knew a few things necessary for achieving the desired result. One of them is that it needed **as few steps as possible to get anywhere**.


### Beautiful & Intuitive 

It should be obvious. You see it, you tap it, something happens. The use of a standardized set of cards and buttons makes the app **intuitive, integrated** and it **feels familiar** to most smart-phone users.

It also needed to be fun to look at and navigate. **It had to POP! I made it POP**. :sunglasses:  


### Relevant Search Results

Enter GraphQL. With the use of GraphQL I was able to deliver only the information requested by the user in the same search result format used for all searches. That allows users to **quickly view the information that they are after in a very clear way**.


### Integrated Search & NextSearch

Essentially, if the Search has all the necessary query variables, it will **open from anywhere in the app**. It works by storing search query variables on a Redux store, which are then used by the Search component to fulfill the query and present the results. 

It worked great! It allowed me to create what I called **NextSearch** (nothing special though, I should warn). NextSearch is simply a suggested search based on the state of the profile and stat the user is most interested in. In short, the user sees a particular stat of a particular driver in a particular period, and fires up a search from there to view the driver rankings for that stat and period, instead of starting a whole new search.

Technically, you can **cycle through all 850+ driver profiles, 210+ team profiles and 4000 search results by using the NextSearch only**. 

The use of NextSearch also removed the need to create a menu on the home page. The most frequently searched information (such as driver standings, team standings, most wins, etc) are now cards with pre-defined search variables on the Home page. Up until now that kind of info required its own page view in almost any website and any sport. 


## What's Next for Ref1 App?

The app is currently up and running and has almost all the mechanics done. But Formula 1 has plenty more to be discovered. For next versions, I will be focusing on adding tracks, season calendar, race results, icons and loads more stats. **Stay tuned!**:v: 



