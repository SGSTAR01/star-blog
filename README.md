# Star Blog - A Simple Blogging Platform(WIP)

Welcome to Star Blog! This is a simple blogging platform built with Node.js and Express. Users can create an account, write blog posts, and interact with other users by commenting on their posts. The application is fully responsive and works on all devices. 

## Features

- User registration and authentication
- Create, edit, and delete blog posts
- Comment on blog posts
- Search functionality
- Responsive design

## Installation

1. Clone the repository: `git clone https://github.com/SGSTAR01/star-blog.git`
2. Install dependencies: `npm install` or `yarn install` or `pnpm install`
3. Set up the database: Set up a MongoDB database and add the connection string to the `.env` file
4. Configure environment variables: Create a `.env` file in the root directory and add the following variables:
   - `PORT` - The port number for the server
   - `MONGODB_URI` - The connection string for the MongoDB database
   - `JWT_SECRET` - A secret key for generating JSON Web Tokens
   - `JWT_EXPIRES_IN` - The expiration time for the JWT
5. Start the server: `npm start`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Sign up for a new account or log in with your existing credentials
3. Explore the blog, create new posts, and interact with other users

## Contributing

Contributions are welcome! If you'd like to contribute to Star Blog, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request


