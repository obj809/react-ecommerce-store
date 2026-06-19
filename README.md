# Summit Shop - React E-commerce Store


## Project Overview
An e-commerce store for alpine clothing and equipment with dynamic functionality. Built with React, Google Firestore, React Router, and SCSS, with Stripe checkout (test mode) handled by Netlify serverless functions. Product imagery is generated with Midjourney AI.

## Deployment Link
This e-shop is live! Check it out [here](https://summit-shop.netlify.app/).

## Screenshot
![E-shop Homepage](public/summit-shop-screenshot.png)


## Table of Contents
- [Goals & MVP](#goals--mvp)
- [Tech Stack](#tech-stack)
- [Build Steps](#build-steps)
- [How to use](#how-to-use)
- [Design Goals](#design-goals)
- [Project Features](#project-features)
- [Additions & Improvements](#additions--improvements)
- [Learning Highlights](#learning-highlights)
- [Challenges](#challenges)


## Goals & MVP
The primary goal is to build a reactive e-shop website to demonstrate the ability to fetch and manage data using Firebase, navigate between different components with React Router, and implement dynamic user interactions.


## Tech Stack
- React
- React Router DOM
- Google Firestore
- Stripe (test mode)
- Netlify Functions (serverless)
- SCSS

## Build Steps
```bash
npm install            # install dependencies
npm run dev            # Vite dev server (front-end only)
netlify dev            # Vite + Netlify Functions together (required for checkout)
npm run build          # production build to dist/
```
Environment variables are read from a gitignored `.env` (see `.env.example` for the full list): the `VITE_FIREBASE_*` keys for the Firebase Web SDK, plus `STRIPE_SECRET_KEY` (a test key), `STRIPE_WEBHOOK_SECRET`, and `FIREBASE_SERVICE_ACCOUNT` for the Stripe functions.

## How to use
To start exploring the e-shop, visit the homepage where you can browse products, view details, and add items to your cart. Use the navigation links to switch between different views and manage your cart. At checkout, pay with the Stripe test card `4242 4242 4242 4242` (any future expiry and CVC). No real payment is taken.


## Design Goals
- Emphasized the use of functional components in React and hooks for state management. 
- Decision to use Firestore was driven by the need for real-time data updates and easy scalability.
- Centralized all Firestore access in a single service module so components stay presentational and data logic lives in one place.

## Project Features
- [x] Stripe hosted checkout in test mode, powered by Netlify serverless functions
- [x] Stock-aware cart that reserves inventory and auto-releases abandoned reservations
- [x] Interactive star ratings that persist a running average per product
- [x] Search functionality built into the NavBar
- [x] Ability to favorite products and add them to cart
- [x] A dynamic carousel that swaps images on a timer

## Additions & Improvements
- [ ] User authentication with per-user accounts and carts
- [ ] Sell real products with live Stripe payments (beyond test mode)


## Learning Highlights
- Building reusable, data-driven React components with hooks
- Integrating Firestore behind a single centralized data-service module
- Integrating Stripe hosted checkout via Netlify serverless functions, with prices re-read server-side so client amounts are never trusted
- Verifying Stripe webhooks for fulfillment and keeping stock in sync via Firestore transactions
- Releasing abandoned-cart stock reservations with a scheduled Netlify function


## Challenges
- Keeping the products and cart collections in sync via the stock/reservation invariant
- Releasing reserved stock from abandoned carts without restocking items mid-checkout
- Wiring Stripe checkout to a serverless backend without a traditional server
- Verifying Stripe webhook signatures against the raw request body


## Contact Me
- Visit my [LinkedIn](https://www.linkedin.com/in/obj809/) for more details.
- Check out my [GitHub](https://github.com/cyberforge1) for more projects.
- Or send me an email at obj809@gmail.com
<br />
Thanks for your interest in this project. Feel free to reach out with any thoughts or questions.
<br />
<br />
Oliver Jenkins © 2024


