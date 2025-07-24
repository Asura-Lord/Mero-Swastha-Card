
A unified digital health ecosystem designed to modernize healthcare in Nepal. It connects patients and healthcare providers through a portable, 
QR-code-based Digital Health ID and a powerful, web-based Clinic Portal.
Table of Contents
About The Project
Key Features
Built With
Getting Started
Prerequisites
Firebase Setup
Local Installation
Usage
Firestore Data Structure
Future Roadmap
Contributing
License
Contact
About The Project
Mero Swastha Card addresses the challenge of fragmented, paper-based medical records in Nepal. By providing every citizen with a secure and portable digital health ID, we empower them to own their health history.
For healthcare providers, the platform offers a streamlined Clinic Portal to instantly access patient records, log visits, and manage follow-ups, ultimately leading to more efficient and informed patient care. This project aims to serve as a foundational piece of digital health infrastructure.
Key Features
✨ For Patients & General Public:
Secure Digital Health ID: Create a unique health profile with essential medical information.
QR Code System: A scannable QR code holds critical data for offline emergency access and serves as an ID for online record retrieval.
Family Support: Manage health records for multiple family members (e.g., children, elderly parents) under one account.
Data Privacy: All data is encrypted and accessible only by authorized providers.
🧑‍⚕️ For Healthcare Providers (Clinic Portal):
Secure Role-Based Access: Log in to a secure dashboard tied to a registered health facility.
Instant Patient Record Access: Scan a patient's QR card or use the manual search to instantly pull up their complete medical history.
Comprehensive Visit Logging: Easily document patient visits, diagnoses, prescriptions, and notes.
In-App Reminders: Schedule and view upcoming follow-up appointments to ensure continuity of care.
📊 Health Intelligence Dashboard:
Real-time Analytics: View key statistics like total patients, total visits, and more.
Demographic Insights: Visualize patient data with interactive charts (e.g., patient distribution by gender).
Trend Analysis: Identify the most common illnesses to better understand community health needs.
Built With
This project is built with modern, accessible web technologies.
!(https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
!(https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
!(https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
!(https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
(Firestore, Authentication, Cloud Functions)
![alt text](https://img.shields.io/badge/Chart.js-FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white)
Getting Started
To get a local copy up and running, follow these simple steps.
Prerequisites
You must have the following software installed on your machine:
Node.js (which includes npm)
Firebase CLI:
Generated sh
npm install -g firebase-tools
Use code with caution.
Sh
Firebase Setup
Create a Firebase Project: Go to the Firebase Console and create a new project.
Add a Web App: In your project's overview page, click the </> icon to add a web app. Register the app and copy the firebaseConfig object.
Enable Services:
In the console, go to Firestore Database and create a database in test mode for now.
Go to Authentication and enable at least one sign-in method (e.g., Email/Password).
Initialize Cloud Functions:
In your local project directory, log in to Firebase: firebase login.
Initialize Cloud Functions: firebase init functions. Choose your project, select JavaScript, and say yes to installing dependencies.
