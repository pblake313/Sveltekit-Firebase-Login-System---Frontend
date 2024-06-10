
# Sveltekit & Firebase Login System - Frontend

This repository contains the frontend component of a login system, developed using the SvelteKit framework. It is designed to interface with a backend built using Node.js and Express, which is essential for the application's functionality.

For optimal setup, it is recommended to configure the backend first, although the order of setup is flexible. You can find the backend repository here: [Node-Express-Login-System---Backend](https://github.com/pblake313/Node-Express-Login-System---Backend).

It is recommended to ensure the backend is active and operational before running this frontend application.

![Example Image](https://firebasestorage.googleapis.com/v0/b/hoops24-5f4e0.appspot.com/o/loginscreener.png?alt=media&token=369e1732-91e7-42ba-af96-48b7c20e8bea)



## Setup Instructions
1. **Clone the Project**
Clone the repository to your local machine:
```bash
  git clone https://link-to-project
```

2. **Install Dependencies**

```bash
  npm install
```

3. **Set Up Firebase DB**
If you haven't set up Firebase yet, follow these steps:
   * **Set up the Firestore Database:** Initialize and configure Firestore in your Firebase project.
   * **Set up Authentication:** Go to the 'Authentication' section in your Firebase console, select the 'Sign-in method' tab, and enable Google as a sign-in provider.
   * **Create a Service Account:** Generate a service account in Firebase to obtain the necessary credentials for environment variables.

4. **Configure Your Environment Variables**
    * Create a `.env` file in the root of your project directory.
    * Locate the `production.env.sample.txt` file. Copy its contents into your new `.env` file.
    * Replace the placeholders in your `.env` file with your actual Firebase keys and other environment-specific details.


5. **Start the server**
Launch the development server with the following command:
```bash
  npm run dev
```

