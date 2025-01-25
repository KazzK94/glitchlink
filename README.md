# GlitchLink
GlitchLink is a (mock) social network created to help people find fellow gamers to share their thoughts with, or even play together.

# Structure of the project and technologies used

## Framework
We use NextJS 14 as a framework to put this application together.

## UI
We use TailwindCSS to make styling faster and more easily scalable.
As for components we use shadcn, as well as our own custom built components.

## Authentication
We handle authentication with next-auth, keeping the user's information in a postgresql database.

## Data (Database)
Our database is a postgresql database. Connections to the database are made using Prisma.
We use Neon as a database provider.

## Deployment
The production version of the site is deployed in Vercel.



# Sections
These are the sections we have implemented so far.

## Landing Page
The landing page (/) shows an introduction to what GlitchLink offers.
In the future, this will change to show a different content (something more useful/interactive) when user is logged in.

## Authentication
Both Login (/login) and Register (/register) should be functioning correctly.
Some sections will show differently based on the user's session (like the top-right icon's behavior, being a link to /login when there is no session, or a link to /profile when session is stored).

## Profile
The profile route (/profile) is a protected route via middleware. If user is not logged in, this will redirect to /login.
It contains the user's Video Games, Posts and Friends.

## Games
The games section (/games) shows a list of games (obtained from an external API), and a search bar to find the games you want.
If the user is logged in, hovering over a GameCard shows a button to "Add to my collection". 

## Admin Panel
This panel was created for testing purposes only, but it's open for anyone to see at /admin. Yes, anyone can play admin in GlitchLink right now.
However, this is not being maintained for now.

# Implementing soon

## Control Owned Games
When browsing games, the owned games still show the button "Add to my collection".
We will replace this button with something that indicates that you already own that game, and an option to remove it from your collection.

## Other users' profiles
We want to use the same template we have for the logged user to show the information of other users too.
Of course the options will be different than the ones showed for the logged user.
