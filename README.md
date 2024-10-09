# Fitness Log Mobile Application

## Introduction
The Fitness Log Application is a mobile app designed to help users track their daily nutritional intake and workout routines. It is built using JavaScript for both front-end and back-end development with React Native, Redux Toolkit, Firebase, and other libraries. Users can set dietary goals, log food and exercise data, and monitor progress through visual charts and a calendar.

## Installation & Setup

### Installing the App
1. **Google Play Store**: The app can be installed directly from the Google Play Store (if available).
2. **Manual Setup**: If the app is not on the store, follow these steps:
   - Download JavaScript, React Native, and Android Studio.
   - Set up the environment as per the official [React Native documentation](https://reactnative.dev/docs/set-up-your-environment?platform=android&os=windows).
   - Clone the project from [GitHub](https://github.com/sikndrR).
   - Install the required packages:
     ```bash
     npm install --force
     ```
   - Run the app:
     ```bash
     npx react-native run-android
     ```
   - Set up Firebase and FoodData Central API keys as needed.

### System Requirements
- **PC Requirements**: 2.10 GHz CPU, 6 cores, 8 GB RAM, 3 GB storage.
- **Mobile Device**: Supports devices newer than iPhone 5.

## User Manual

### Sign-Up and Login
1. **Sign-Up**: Create a new account by entering your first and last name, a valid email, and a password (minimum 9 characters).
2. **Login**: Use your email and password to log in. Password recovery options are available.

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/user-attachments/assets/c5c1db48-5700-401f-a54e-caa0b3ebccc3" alt="Sign-Up" style="width: 20%;"/>
    <img src="https://github.com/user-attachments/assets/cfc8df8e-2803-4c80-acc9-3ff124007184" alt="Login" style="width: 20%;"/>
</div>

### Food Log
- View daily goals with visual pie charts for calories, protein, fats, and carbs.
- Add food entries manually or search using the USDA FoodData Central API.
- Update or delete food log entries as needed.

<div style="display: flex; justify-content: space-between;">
   <img src="https://github.com/user-attachments/assets/109c66d2-a412-4d80-a7cf-0e46893a388f" alt="Screenshot 1" style="width: 30%;"/>
   <img src="https://github.com/user-attachments/assets/b4b7d61a-905f-4b48-a06b-34a54ff52bae" alt="Screenshot 2" style="width: 30%;"/>
   <img src="https://github.com/user-attachments/assets/924b4373-3ed4-4058-832a-7d75c6781b1f" alt="Screenshot 3" style="width: 30%;"/>
</div>

### Workout Logging
- Log exercises with details on sets, reps, and weights.
- Review past workouts via the calendar.

### Profile and Settings
- Update personal goals from the Profile screen.
- Changes require all input fields to be filled.

## Design

### Technology Stack
- **Backend**:
  - **Application Logic**: Node.js, USDA FoodData API.
  - **Database**: Firebase Authentication and Realtime Database.
- **Frontend**:
  - **Framework**: React Native.
  - **Libraries**: Redux Toolkit, Font Awesome, React Navigation, SVG, Device Info.

### Architecture
1. **Backend**:
   - Firebase Authentication for user management.
   - Realtime Database for logging food and exercise data.
2. **Frontend**:
   - Responsive UI using React Native and custom components.
   - State management with Redux.

### File Structure
- **Screens**: Main app pages (Food Log, Weights, Profile, etc.).
- **Components**: Reusable UI elements.
- **Navigation**: Manages app routing and screen transitions.
- **API**: Interactions with Firebase and USDA FoodData.

## Testing & Results
- Manual testing was performed; no automated test cases were created.
- Functionalities like logging dietary goals and exercises were verified through user testing.

## Summary
The project was a valuable learning experience, providing insight into front-end and back-end development using modern tools. The app incorporates key features such as Firebase integration, API usage, and responsive design.

## Bibliography
- [FoodData Central API Guide](https://fdc.nal.usda.gov/api-guide.html#bkmk-1)
- [React Native Setup Guide](https://reactnative.dev/docs/set-up-your-environment?platform=android&os=windows)
- [Firebase Realtime Database Documentation](https://rnfirebase.io/database/usage)
- [Font Awesome in React Native](https://docs.fontawesome.com/web/use-with/react-native)
- [React Navigation Setup](https://reactnavigation.org/docs/getting-started/)
