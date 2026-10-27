# AutoShine

A demo car marketplace built with plain HTML, CSS and JavaScript. No build step, backend or accounts.
All listings, prices and enquiries are fictional. Photos are representative stock images loaded from Unsplash, with a branded fallback if one fails to load.

## Features
Search by name or brand, filters (price, fuel, transmission, year), sorting, detail pages with a photo gallery, compare up to 3 cars, favourites saved in localStorage, and a demo enquiry form that sends nothing.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy
1. Create a new GitHub repository and upload this folder's contents (`git init`, `git add .`, `git commit -m "Initial commit"`, then push).
2. In Netlify, choose Add new site > Import an existing project, pick the repository, leave the build command empty and set the publish directory to `/`. Deploy.
3. Vercel works the same way: import the repository, framework preset "Other", no build command.

## Customise
Edit `js/data.js` to change listings, `css/styles.css` for colours (see `:root`), and the `IMGS` list for photos.
