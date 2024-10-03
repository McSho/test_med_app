# StayHealthy Inc. - Go Digital Initiative

## Project Overview

StayHealthy Inc. is a non-profit organization focused on improving healthcare access in remote areas. As part of their **Go Digital Initiative**, the organization aims to provide a user-friendly platform for patients to connect with doctors online. This project involves designing and developing a responsive website for the initiative.

### Problem Statement

The **StayHealthy** survey revealed a severe lack of accessible healthcare in remote areas, with patients unable to find the right doctor at the right time. Through this project, StayHealthy aims to bridge this gap by leveraging increased internet availability in these areas. The website will allow patients to access general physicians and specialists for medical appointments and consultations in real-time.

### Project Goals

The primary goal is to create a platform that connects patients with doctors seamlessly. The first phase focuses on the following features:
- **Medical Appointments Online**: Patients can schedule appointments, view available time slots, and modify bookings.
- **Doctor Listings**: Display a list of doctors, along with their ratings and availability.
- **Consultation Feedback**: Allow patients to provide feedback on consultations.
- **Profile Management**: Users can sign up, update personal details, and manage medical records.
- **Navigation**: The website must be intuitive, ensuring ease of access with minimal clicks.

## Features (Phase 1)

- **Medical appointments online**: 
  - Patients can schedule appointments and view available time slots.
  - Option for patients to receive reminders about upcoming appointments.
  - Ability to cancel or modify appointments.
  
- **Doctor listing for patients**:
  - Display a list of doctors, including ratings and reviews.
  - Allow users to search for doctors by name.

- **Consultation feedback**:
  - Patients can rate consultations on factors like diagnosis and communication.

- **Profile management**:
  - Patients must sign up and provide personal details to make appointments.
  - Option to update profile information.
  
- **Navigation**:
  - Simple, intuitive navigation to ensure ease of use.

## Technical Overview

The project will be developed using **React** for the frontend with features implemented in different phases. The first phase involves building static and responsive pages, followed by their dynamic functionality.

### Tools and Libraries

- **Figma**: Used for UI/UX design and wireframing.
- **ReactJS**: The core technology used for front-end development.
- **HTML & CSS**: For structuring and styling the web pages.
- **React Router**: Used for implementing dynamic routing within the single-page application.
- **reactjs-popup**: A library for creating modals, menus, and tooltips.

### Core Concepts

#### 1. **React Router**:
   - Enables client-side routing and page transitions without refreshing.
   - Used to navigate between different components/pages.

#### 2. **Event Handlers**:
   - **onFocus** and **onBlur** event handlers will be used for user interaction on input fields and forms.
   - These event handlers are implemented in key components like the Appointment Booking and Reviews Components.

#### 3. **ES7+ React/Redux Snippets**:
   - Helps with code efficiency using the latest JavaScript (ES7+) syntax.

#### 4. **reactjs-popup Library**:
   - A versatile library used to create modals, menus, and tooltips for a rich user experience.

### Hands-On Labs Implemented:

- **Convert Static Pages to Dynamic React Components**: Uses React Router and ES7+ snippets for efficiency.
- **Build the Appointment Booking Component**: Includes event handlers like `onFocus` and `onBlur` for better user experience.
- **Build the Reviews Component**: Allows patients to provide feedback on consultations.

## Project Setup and Deployment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/StayHealthy-Project.git
   cd StayHealthy-Project
   npm install
   npm start

### Breakdown of Sections:
- **Project Overview**: Describes the goals of the project and the problem it solves.
- **Features**: Lists the core functionalities required for the first phase of the project.
- **Technical Overview**: Summarizes the key technologies, libraries, and tools used.
- **Hands-On Labs Implemented**: Mention which specific labs are connected to your development work.
- **Project Setup and Deployment**: Provides installation steps and deployment options.
- **Future Enhancements**: Highlights features to be implemented in the next phases.