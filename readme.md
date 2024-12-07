
---

# Campus-Connect-Resource-Finder-Website

## Project Overview
"Campus-Connect-Resource-Finder-Website" is a platform designed to help students who are new to college find essential resources such as PGs (Paying Guest accommodations), mess facilities, stationery shops, and nearby hospitals. It allows students to view, sort, and book these services based on their preferences like cost, distance, and popularity. The platform also offers features for PG owners and admins to manage the information, such as adding PGs and updating mess menus. The website utilizes Razorpay for secure pre-registration for PGs and bed bookings in hospitals.

## Features
- **PG Listings**: 
  - Students can view nearby PGs based on their selected college.
  - PGs can be sorted by cost, distance, or user preference.
  - PG owners can add their PGs to the platform.
  - PGs liked more by students will appear first in the list.
  
- **Mess Management**: 
  - Admin users can log in to modify the mess menu.
  - Students will see updated meal menus within 24 hours of changes.
  - Mess items that are liked more will appear first in the list.
  
- **Pre-registration via Razorpay**: 
  - Razorpay payment gateway is integrated for secure pre-registration for PGs and hospital bed bookings.

- **Resource Booking**: 
  - Students can book PGs and beds in hospitals.
  
- **Sorting**: 
  - Users can sort PGs, mess options, and other resources based on cost, distance, and preferences.

## Technologies Used
- **MERN Stack** (MySQL, Express.js, Node.js)
- **Razorpay Payment Gateway** for secure payment processing

## Installation and Setup
1. Clone the repository.
   ```bash
   git clone <repository-link>
   ```

2. Install dependencies for both client and server:
   - For server-side (Node.js/Express):
     ```bash
     cd server
     npm install
     ```


3. Start the server and client:
   - Run the server:
     ```bash
     cd server
     nodemon index.js
     ```

   

4. Open the website in your browser (default is `http://localhost:5050/login`).

## How to Contribute
- Fork the repository.
- Create a new branch for each feature or fix.
- Submit a pull request with a detailed description of the changes.

