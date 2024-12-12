# CloudPad

CloudPad is a modern cloud-based note-taking application that enables users to create, organize, and manage their notes with ease. With real-time synchronization across devices, CloudPad ensures that your notes are always up-to-date and accessible from anywhere. Whether you're working on personal tasks, collaborating with colleagues, or jotting down ideas, CloudPad provides a seamless experience for storing and managing your notes.

## Project Overview

CloudPad is a full-stack web and mobile application built with cutting-edge technologies to provide a robust and user-friendly note-taking platform. The application supports multiple devices, ensuring your notes are always available across web, Android, and iOS platforms.

### Key Technologies

- **Frontend**: React (Web)
- **Backend**: Node.js, Express
- **Database**: MongoDB (for storing notes)
- **Authentication**: JWT (JSON Web Tokens)

## Features

- **Note Creation & Editing**: Create and edit notes with rich text formatting including headings, bullet points, and more.
- **Cloud Synchronization**: Real-time syncing of notes across devices.
- **Organize Notes**: Categorize notes using folders, tags, and categories.
- **Search Functionality**: Easily find notes by title, tag, or content.
- **Real-time Collaboration**: Share notes with others and collaborate simultaneously.
- **Cross-Platform**: Available on web, Android, and iOS.
- **Responsive Design**: Optimized for all screen sizes, including mobile, tablet, and desktop.

## Installation

### Prerequisites

Before setting up CloudPad locally, ensure that the following are installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (for local development)

### Setting Up the Project

1. **Clone the repository**:

    ```bash
    git clone https://github.com/JAYANTMAHIWAL/cloudpad.git
    cd cloudpad
    ```

2. **Backend Setup**:

    - Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

    - Install backend dependencies:

    ```bash
    npm install
    ```

    - Create a `.env` file and add your environment variables:

    ```env
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

    - Start the backend server:

    ```bash
    npm start
    ```

    The backend server will be running at [http://localhost:5000](http://localhost:5000).

3. **Frontend Setup**:

    - Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

    - Install frontend dependencies:

    ```bash
    npm install
    ```

    - Start the frontend server:

    ```bash
    npm start
    ```

    Open your browser and visit [http://localhost:3000](http://localhost:3000).

4. **Mobile Setup (React Native)**:

    - Navigate to the `mobile` directory:

    ```bash
    cd mobile
    ```

    - Install mobile dependencies:

    ```bash
    npm install
    ```

    - Run the mobile app:

    ```bash
    expo start
    ```

    You can now run the app on an Android or iOS emulator or a physical device using the Expo app.

## Usage

Once the application is set up and running, you can:

1. **Sign up or log in** to start using the app.
2. **Create, edit, and organize** notes with categories and tags.
3. Use the **search bar** to quickly find specific notes.
4. **Share notes** with others for collaboration.
5. **Sync notes** in real-time across all devices.

## Contributing

We welcome contributions to CloudPad! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a Pull Request.

## License

CloudPad is open-source and released under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgments

- Thanks to [Node.js](https://nodejs.org/) for providing the backend runtime.
- Thanks to [React](https://reactjs.org/) for the front-end framework.
- Thanks to [MongoDB](https://www.mongodb.com/) for the cloud database service.
- Thanks to [Expo](https://expo.dev/) for simplifying React Native development.

## Contact

For any questions or issues, feel free to reach out at [mahiwaljay5@gmail.com].

