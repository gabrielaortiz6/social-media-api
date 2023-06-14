# Social Media API

## Description

This is the backend for a social media site. It was created using Express, MongoDB, and Mongoose. It allows for user CRUD operations, allows users to create "thoughts" i.e. comments or posts, as well as have a friendlist network that can be updated. It also allows users to have reactions to other's thoughts.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Mock Up

The following video shows examples of the application's API routes being tested in Postman.

![Demo Walkthrough]()

## Usage

In order to use this, clone the repository from GitHub. `npm i` to install the necessary dependencies. You will need to use Postman or Insomnia in order to view and test routes, as well as seed data. 

### GitHub

[Repository on GitHub](https://github.com/gabrielaortiz6/social-media-api)


