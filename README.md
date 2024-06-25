# Learn Well

![FULL_LOGO_COLOR](https://github.com/pyc0422/learnwell/assets/86500068/b437e81e-c97b-49b5-a7cf-206bc0f35a5b)


Learn Well is a video-sharing learning platform that allows users to upload and view videos. Users can create video objects with a title, description, and URL, comment on videos, and view comments from other users. The platform also provides options for adjusting playback speed and volume, and supports full-screen video playback.

 ## Overview

 ### Features

- **Authentication**: User need to use first name and last name to log in, no need to register
- **List Videos**: Show a list of videos from the logged in user and allow users to select a video from the list.
- **Create Video**: Allow the user to upload a new video by filling a popup form with a title, description, and a video URL.
- **Edit Video**: Hover over each video card, can click edit button and edit the title and description of the current video
- **Video Page**: Click Each video card will redirect to the video detail page 
- **Comment on Videos**: User can use any user id to comment on a video and view comments from other users.
- **Full-Screen Playback**: Open the videos in full screen with full playback functionality.
- **Playback Controls**: Include options for adjusting playback speed and volume.

### API Integration

Integrated with the provided FastAPI

[FastAPI Documentation](https://take-home-assessment-423502.uc.r.appspot.com/docs)


## Instructions

### Prerequisites

- Node.js (version 16 or above)
- npm (Node package manager)
- Git

### Build and Run the Application

1. **Clone the repository:**
   ```bash
   git clone https://gitbub.com/pyc0422/learnwell.git
2. **Install dependencies:**
   ```bash
   npm install
3. Run the application:
   ```bash
   npm run dev
   ```
   The application will be avaiable at `http://localhost:3000`.

### Usage

-**Theme switch:**

- Click the right top button on the navbar to switch dark/ light mode
  
-**Log In:**

- The home page will rediect to login endpoint if no user info in cookies
- Use any first name and last name to login

-**Home Page:**

- After loged in will redirect to the Home page
- The home page displays all videos that upload by the logged in user
- Hover on each video card can click the 'Edit button' to edit the video information
- Click on a video to view the details

-**Add a New Video:**

- Click on the 'Add Video' Button on the navbar
- Fill in the title, descripiton and video URL
- Submit the form to add the video to the list

-**Comment on a Video:**

- Click on a video card to vide its detail page
- Below the description of the view fill your user name and comment
- Click the 'comment' button below the input to add the comment of this video

-**Playback Controls:**

- Click on the 'watch fullscreen' button to play the video fullscreen
- Use the playback controls to adjust the playback speed and volume
- Click the 'Exit full screen' button to exit

-**LogOut:**

- Click the 'Logout' green button on the Navbar

## Demo Video


https://github.com/pyc0422/learnwell/assets/86500068/3f264af5-be68-44fc-96e7-a2832acac43b


## Testing

To test the application, ensure you have followed the build and run instructions. You can interact with the app through the web interface as described in the usage section. Make sure to use valid video URLs and appropriate user_id formats as specified in the API documentation.


