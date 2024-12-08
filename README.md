# Intelligent Diagnosis and Treatment Recommendation System for Tea Leaf Diseases Using Image Classification and Knowledge-Based Approaches

![Tea Leaves Disease Detector](https://github.com/user-attachments/assets/e42e8928-1caf-4010-854f-ed06756023ff)

The Research is designed to help tea farmers, agricultural researchers, and plant enthusiasts detect common leaf diseases in tea plants. This is achieved by leveraging image processing and machine learning algorithms hosted on a backend server.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Step-by-Step Installation](#step-by-step-installation)
- [Usage](#usage)
   - [How to Upload an Image](#how-to-upload-an-image)
   - [Viewing Disease Detection Results](#viewing-disease-detection-results)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Intelligent Diagnosis and Treatment Recommendation System for Tea Leaf Diseases Using Image Classification and Knowledge-Based Approaches** project provides a user-friendly web application for detecting diseases on tea leaves using image uploads. This tool is designed to help tea farmers, agricultural researchers, and anyone interested in the health of tea plants by providing instant disease detection results from images of tea leaves.

### Workflow:
1. **Upload an Image**: The user uploads an image of a tea leaf showing visible symptoms.
2. **Backend Processing**: The image is sent to a backend server where a machine learning model analyzes the image to identify potential diseases.
3. **Disease Detection and Treatment Recommendations**: The system outputs the identified disease, along with suggestions for treatment if applicable.

The system is capable of detecting common diseases affecting tea plants and providing treatment recommendations based on a knowledge-based approach. This can greatly assist farmers and researchers in maintaining the health of their crops.

## Features
- **Image Upload**: Upload images of tea leaves for disease detection.
- **Disease Detection**: Identifies common diseases affecting tea plants.
- **Treatment Recommendations**: Provides treatment suggestions for identified diseases.
- **Knowledge Base Integration**: Uses a knowledge-based approach for accurate diagnosis and recommendations.
- **User-Friendly Interface**: Easy-to-navigate design for users of all skill levels.
- **Instant Results**: Fast and accurate disease diagnosis from uploaded images.

## Technologies Used
- **Frontend**:
  - **React**: JavaScript library for building the user interface.
  - **HTML5/CSS3**: Markup and styling for the frontend interface.
  - **Bootstrap/Material-UI**: Frontend component libraries for responsive and modern design.
  
- **Backend**:
  - **Node.js**: Backend server environment for handling API requests.
  - **Express.js**: Web application framework for Node.js to manage routes and middleware.
  - **Python**: For machine learning model processing (via a Python API).
  
- **Machine Learning**:
  - **TensorFlow/Keras**: Frameworks for building and deploying the image classification model.
  - **OpenCV**: Used for image processing and enhancement techniques before feeding them into the model.
  
- **API & Communication**:
  - **Flask/Django**: Python web frameworks used to deploy the machine learning model as a RESTful API.
  - **Axios**: Library for making HTTP requests to communicate between the frontend and backend.

- **Cloud & Hosting**:
  - **Heroku**: For hosting the backend server and deploying the model.
  - **AWS S3**: Used for storing and retrieving uploaded images securely.


## Installation

### Prerequisites
- Node.js and npm installed on your machine.
- Python 3.x installed for running the machine learning model.
- An IDE or code editor like Visual Studio Code.

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tea-leaves-disease-detector.git
