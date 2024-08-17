# Product Management App

## Description

This React application provides a comprehensive interface for managing products, including search, sorting, filtering by category and price, and pagination. It also integrates Firebase for user authentication with Google login.

[Live Link](https://scic-task-84ec8.web.app)

## Features

- **Search**: Search products by title.
- **Filter**: Filter products by category and price range.
- **Sort**: Sort products by price in ascending or descending order.
- **Pagination**: Navigate through pages of products.
- **Firebase Authentication**: User authentication with Google login.
- **Responsive Design**: Fully responsive layout for various screen sizes.

## Installation

### Prerequisites

- Node.js
- Firebase account (for authentication)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/protap1100/Scic-Task.git
   cd your-repo
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a new web app to your Firebase project and copy the Firebase config object.

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Firebase configuration:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

5. **Start the Development Server**

   ```bash
   npm start
   ```

   The app will be running on `http://localhost:3000`.

## Usage

### Search and Filter

- Use the search bar to find products by title.
- Apply filters for category and price range.
- Use the sort dropdown to sort products by price.

### Pagination

- Navigate through product pages using the pagination controls.

### Authentication

- Sign in with Google using Firebase authentication.

## Code Structure

- **`src/`**: Contains all source code.
  - **`components/`**: Reusable components like `SectionTitle`, `Loading`, etc.
  - **`pages/`**: Contains page components such as `Product`.
  - **`firebase.js`**: Firebase configuration and initialization.
  - **`App.js`**: Main application component with routing and authentication.

## Troubleshooting

- **Firebase Authentication Issues**: Ensure that the Firebase config in your `.env` file is correct and that you have enabled Google sign-in in the Firebase console.
- **API Issues**: Verify that the API endpoint is correct and that your server is running.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

[Your Name](https://github.com/protap1100)
