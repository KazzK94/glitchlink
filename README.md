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
We use Supabase as a database provider.

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
As for the profile page's content... well, yeah, that's not implemented properly yet. We're using /profile to store links to functionalities that don't have their place yet.

## Games
The games section (/games) shows a list of games, and a search bar to find the games you want.
If the user is logged in, hovering over a GameCard will show a button to "Add to my games". However, this behavior is not implemented yet (see "Implementing Soon" for more info).


# Implementing soon

## Add Games to User's Collection
As for now, Games are retrieved from an external API. However, we want to also have our own table in our database with the game's reference, so we can have a db relation between User and Game.
We will implement this relation first, and then we will make it so when a user clicks on the button, the system checks if the game is stored in our database. If it isn't, it stores it. After that, the User and the Game will be linked using Prisma (relation many-to-many).

## Profile (a little more decent)
The profile will now show the user's Name (with the profile's stored color), as well as the games they added to their profile.
It will also have an option to edit the User's information, such as the username, name and color.

## Users Privileges and Status
We will add a privilege level to users in the database (user, mod, admin...).
We will also add a status to user accounts (pending, active, banned, disabled...).