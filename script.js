// =================================================================
//               ==== YOUR FIREBASE CONFIG IS LIVE ====
// =================================================================
const firebaseConfig = {
  apiKey: "AIzaSyDDeGXLfA2BAovDQMA5LpnFyoni3vtWy4o",
  authDomain: "qr-swastha-card.firebaseapp.com",
  projectId: "qr-swastha-card",
  storageBucket: "qr-swastha-card.appspot.com",
  messagingSenderId: "76686687972",
  appId: "1:76686687972:web:005772016d94b49c2ff6f1"
};
// =================================================================


// Initialize Firebase
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} catch (e) {
    console.error("Firebase initialization error:", e);
    alert("There was an issue initializing the connection to the database. Please check the console for more details.");
}

const db = firebase.firestore();
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', () => {
    
    let currentLang = 'ne';
    let currentPatientContext = { id: null, data: null };
    let loggedInPatient = null;
    let loggedInMedicalOfficial = null;
    let videoStream = null;
    let searchOriginPage = 'scanner-page';

    // Placeholder for digital signature
    const placeholderSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACgCAMAAACow/05AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNQTFRFAAAA////////////////////////////////////////////////////////////////////////pCbN3AAAABF0Uk5T+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+EBCeGIAAAGESURBVHja7dzBqoAgEEDRGXBw//9v0zNEtKgqgdc99z58S4r5eVUwJUmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJF/Jrv1J01erE1gK1QpqwLdy+BHYB23bPD2U5I2myfL2TsoYMi8Psj1L3iYpEmC+9QWYL8aK2C9RCA9zFdq2K2WkQ+AysAZUuL2S/+UeFvD4i1sUPsYbdCHoPFEk3sVGXBpM0sNeEVL2A69gCznC7IYL9SLvKH/w+4eYTeNpe+xg8oN0Fm173PnsG8x4eIu8z3M5G4y75CAn+K5+i1nvsF+d7qhtzF/4E+gT6BPwI+hT8BvoY/H946+Nzx887H33sefdz8O7n34+Bfz78PBDyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8gPIPyA8agGGuB5hL4k2Z4pEmS9P9l/uC6n04W6D4yze4T/yDgvAPe/4hFkAAAAASUVORK5CYII=';

    const langStrings = {
        en: { app_title: "Mero Swastha Card", my_details: "My Details", new_password_title: "Password Information", new_password_notification_modal: "You will get your new password on your number through SMS. Thank you for using Mero Swastha Card.", emergency_access: "Emergency Access", hero_title: "Digital Health ID for Every Nepali", hero_subtitle: "Your complete medical history in a secure, scannable QR card that works online and offline.", get_health_id: "Get Your Health ID", scan_qr_card: "Scan QR Card", clinic_portal: "Clinic Portal", feature1_title: "Works Offline", feature1_desc: "Access critical health information without internet connection", feature2_title: "Privacy First", feature2_desc: "Your data is encrypted and only accessible to authorized healthcare providers", feature3_title: "Universal Access", feature3_desc: "No smartphone needed - printed QR cards work everywhere", feature4_title: "Family Support", feature4_desc: "Manage health records for elderly and children", back: "Back", form_title: "Create Your Health ID", form_subtitle: "Fill in your basic information to generate your QR Swastha Card", personal_info: "Personal Information", full_name: "Full Name", dob: "Date of Birth", gender: "Gender", blood_group: "Blood Group", phone_number: "Phone Number", address: "Address", emergency_contact: "Emergency Contact", emergency_name: "Contact Name", emergency_phone: "Contact Phone", medical_info: "Medical Information (Optional)", known_allergies: "Known Allergies", current_meds: "Current Medications", medical_history: "Medical History", cancel: "Cancel", create_health_id_button: "Create Health ID", qr_title: "Your Health ID is Ready!", qr_subtitle: "Scan the QR code below to access your health information. <br/>Save it to your phone or print it out.", done: "Done", download_qr: "Download QR", scanner_title: "QR Code Scanner", scanner_subtitle: "Scan patient QR cards to access medical records", qr_scanner_box_title: "QR Scanner", scanner_position_or_click: "Click to start camera", scanning: "Scanning QR Code...", manual_entry_title: "Or enter Patient ID or Name", search_patient: "Search Patient", example_ids: "Example IDs: QR12345678, John Doe", patient_found_title: "Patient Record", patient_info: "Patient Information", name: "Name", patient_id: "Patient ID", medical_alerts: "Medical Alerts", allergies: "Allergies:", emergency_info: "Emergency Information", clinic_portal_subtitle: "Healthcare Provider Access", login: "Login", logout: "Logout", all_patients: "All Patients", search: "Search", visit_date: "Date of Visit", visit_reason: "Reason for Visit / Notes", save_visit: "Save Visit Record", select_file: "Select File", or_drop: "or drop an image", visit_history: "Visit History", download_report: "Download Report", offline_mode_notice: "Viewing Offline Data. Information may not be current.", view_last_patient: "View Last Patient (Offline)", patient_dashboard_title: "My Health Dashboard", add_visit_record: "Add New Visit Record", back_to_dashboard: "Back to Dashboard", login_to_add_visit: "Please login as a Medical Official to add a visit record.", new_password_notification: "Login successful! A new password will be sent to your phone number.", modal_sending: "Sending Emergency Alert...", modal_sent_title: "SMS Sent!", modal_sent_desc: "An alert has been sent to the nearest health post and your emergency contact.", ok: "OK", placeholder_enter_name: "Enter your full name", placeholder_dob: "mm/dd/yyyy", placeholder_gender: "Select gender", placeholder_blood_group: "Select blood group", placeholder_phone: "+977-9XXXXXXXXX", placeholder_address: "Enter your full address (e.g., Street, City, District)", placeholder_contact_name: "Contact person name", placeholder_allergies: "List any allergies (comma separated)", placeholder_meds: "List current medications", placeholder_history: "Brief medical history", placeholder_patient_id_or_name: "Enter Patient ID or Name", placeholder_select_hospital: "Select a hospital", placeholder_visit_reason: "e.g., Follow-up, Diagnosis, Lab Results", gender_male: "Male", gender_female: "Female", gender_other: "Other" },
        ne: { app_title: "मेरो स्वास्थ्य कार्ड", my_details: "मेरो विवरण", new_password_title: "पासवर्ड जानकारी", new_password_notification_modal: "तपाईंले आफ्नो फोन नम्बरमा SMS मार्फत नयाँ पासवर्ड पाउनुहुनेछ। मेरो स्वास्थ्य कार्ड प्रयोग गर्नुभएकोमा धन्यवाद।", emergency_access: "आपतकालीन पहुँच", hero_title: "हरेक नेपालीका लागि डिजिटल स्वास्थ्य आईडी", hero_subtitle: "तपाईंको पूर्ण मेडिकल इतिहास एक सुरक्षित, स्क्यान गर्न मिल्ने क्यूआर कार्डमा जुन अनलाइन र अफलाइन काम गर्दछ।", get_health_id: "आफ्नो स्वास्थ्य आईडी पाउनुहोस्", scan_qr_card: "क्यूआर कार्ड स्क्यान गर्नुहोस्", clinic_portal: "क्लिनिक पोर्टल", feature1_title: "अफलाइन काम गर्दछ", feature1_desc: "इन्टरनेट जडान बिना महत्त्वपूर्ण स्वास्थ्य जानकारी पहुँच गर्नुहोस्", feature2_title: "गोपनीयता पहिलो", feature2_desc: "तपाईंको डाटा गुप्तिकरण गरिएको छ र केवल अधिकृत स्वास्थ्य सेवा प्रदायकहरूलाई मात्र पहुँच योग्य छ", feature3_title: "विश्वव्यापी पहुँच", feature3_desc: "स्मार्टफोन आवश्यक छैन - छापिएका क्यूआर कार्डहरू जताततै काम गर्छन्", feature4_title: "पारिवारिक समर्थन", feature4_desc: "वृद्ध र बालबालिकाको स्वास्थ्य रेकर्ड व्यवस्थापन गर्नुहोस्", back: "पछाडि", form_title: "आफ्नो स्वास्थ्य आईडी बनाउनुहोस्", form_subtitle: "आफ्नो क्यूआर स्वास्थ्य कार्ड बनाउनको लागि आफ्नो आधारभूत जानकारी भर्नुहोस्", personal_info: "व्यक्तिगत जानकारी", full_name: "पूरा नाम", dob: "जन्म मिति", gender: "लिङ्ग", blood_group: "रक्त समूह", phone_number: "फोन नम्बर", address: "ठेगाना", emergency_contact: "आपतकालीन सम्पर्क", emergency_name: "सम्पर्क नाम", emergency_phone: "सम्पर्क फोन", medical_info: "चिकित्सा जानकारी (वैकल्पिक)", known_allergies: "ज्ञात एलर्जीहरू", current_meds: "वर्तमान औषधिहरू", medical_history: "चिकित्सा इतिहास", cancel: "रद्द गर्नुहोस्", create_health_id_button: "स्वास्थ्य आईडी बनाउनुहोस्", qr_title: "तपाईंको स्वास्थ्य आईडी तयार छ!", qr_subtitle: "आफ्नो स्वास्थ्य जानकारी पहुँच गर्न तलको क्यूआर कोड स्क्यान गर्नुहोस्। <br/>यसलाई आफ्नो फोनमा बचत गर्नुहोस् वा प्रिन्ट गर्नुहोस्।", done: "भयो", download_qr: "QR डाउनलोड गर्नुहोस्", scanner_title: "क्यूआर कोड स्क्यानर", scanner_subtitle: "बिरामीको मेडिकल रेकर्ड पहुँच गर्न क्यूआर कार्ड स्क्यान गर्नुहोस्", qr_scanner_box_title: "क्यूआर स्क्यानर", scanner_position_or_click: "क्यामेरा सुरु गर्न क्लिक गर्नुहोस्", scanning: "क्यूआर कोड स्क्यान गर्दै...", manual_entry_title: "वा बिरामी आईडी वा नाम प्रविष्ट गर्नुहोस्", search_patient: "बिरामी खोज्नुहोस्", example_ids: "उदाहरण: QR12345678, राम शर्मा", patient_found_title: "बिरामीको रेकर्ड", patient_info: "बिरामीको जानकारी", name: "नाम", patient_id: "बिरामी आईडी", medical_alerts: "चिकित्सा चेतावनी", allergies: "एलर्जी:", emergency_info: "आपतकालीन जानकारी", clinic_portal_subtitle: "स्वास्थ्य सेवा प्रदायक पहुँच", login: "लग - इन", logout: "लगआउट", all_patients: "सबै बिरामीहरू", search: "खोज्नुहोस्", visit_date: "भ्रमणको मिति", visit_reason: "भ्रमणको कारण / नोटहरू", save_visit: "भ्रमण रेकर्ड बचत गर्नुहोस्", select_file: "फाइल चयन गर्नुहोस्", or_drop: "वा छवि छोड्नुहोस्", visit_history: "भ्रमण इतिहास", download_report: "रिपोर्ट डाउनलोड गर्नुहोस्", offline_mode_notice: "अफलाइन डाटा हेर्दै। जानकारी हालको नहुन सक्छ।", view_last_patient: "अन्तिम बिरामी हेर्नुहोस् (अफलाइन)", patient_dashboard_title: "मेरो स्वास्थ्य ड्यासबोर्ड", add_visit_record: "नयाँ भ्रमण रेकर्ड थप्नुहोस्", back_to_dashboard: "ड्यासबोर्डमा फर्कनुहोस्", login_to_add_visit: "भ्रमण रेकर्ड थप्न कृपया एक चिकित्सा अधिकारीको रूपमा लगइन गर्नुहोस्।", new_password_notification: "सफलतापूर्वक लगइन भयो! नयाँ पासवर्ड तपाईको फोन नम्बरमा पठाइनेछ।", modal_sending: "आपतकालीन चेतावनी पठाउँदै...", modal_sent_title: "एसएमएस पठाइयो!", modal_sent_desc: "नजिकैको स्वास्थ्य चौकी र तपाईंको आपतकालीन सम्पर्कमा एक चेतावनी पठाइएको छ।", ok: "ठिक छ", placeholder_enter_name: "आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्", placeholder_dob: "मि/दि/yyyy", placeholder_gender: "लिङ्ग चयन गर्नुहोस्", placeholder_blood_group: "रक्त समूह चयन गर्नुहोस्", placeholder_phone: "+९७७-९XXXXXXXXX", placeholder_address: "आफ्नो पूरा ठेगाना प्रविष्ट गर्नुहोस् (जस्तै, टोल, शहर, जिल्ला)", placeholder_contact_name: "सम्पर्क व्यक्तिको नाम", placeholder_allergies: "कुनै पनि एलर्जीहरू सूची गर्नुहोस्", placeholder_meds: "वर्तमान औषधिहरू सूची गर्नुहोस्", placeholder_history: "संक्षिप्त चिकित्सा इतिहास", placeholder_patient_id_or_name: "बिरामीको आईडी वा नाम प्रविष्ट गर्नुहोस्", placeholder_select_hospital: "एक अस्पताल चयन गर्नुहोस्", placeholder_visit_reason: "जस्तै, फलो-अप, निदान, प्रयोगशाला परिणामहरू", gender_male: "पुरुष", gender_female: "महिला", gender_other: "अन्य" }
    };
    
    const hospitals = [ "Tribhuvan University Teaching Hospital (TUTH), Kathmandu", "Patan Hospital, Lalitpur", "Bir Hospital, Kathmandu", "B.P. Koirala Institute of Health Sciences (BPKIHS), Dharan", "Manipal Teaching Hospital, Pokhara", "Grande International Hospital, Kathmandu", "Norvic International Hospital, Kathmandu", "Chitwan Medical College Teaching Hospital, Bharatpur", "Nepal Medical College Teaching Hospital, Jorpati, Kathmandu", "Kathmandu Medical College (KMC), Sinamangal", "Dhulikhel Hospital, Kavre", "Scheer Memorial Adventist Hospital, Banepa", "Western Regional Hospital, Pokhara", "Lumbini Zonal Hospital, Butwal", "Seti Zonal Hospital, Dhangadhi", "Karnali Academy of Health Sciences, Jumla", "Narayani Sub-Regional Hospital, Birgunj", "Koshi Zonal Hospital, Biratnagar", "Mechi Zonal Hospital, Bhadrapur", "Bheri Zonal Hospital, Nepalgunj" ];
    
    const emergencyModal = document.getElementById('emergency-modal');
    const newPasswordModal = document.getElementById('new-password-modal');
    const loginModal = document.getElementById('login-modal');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const langToggleBtn = document.getElementById('lang-toggle');
    const scannerVideo = document.getElementById('scanner-video');
    const dropZone = document.getElementById('drop-zone');
    const qrFileInput = document.getElementById('qr-file-input');
    const cameraIdleView = document.getElementById('camera-idle-view');
    const cameraScanningView = document.getElementById('camera-scanning-view');
    const scannerCanvas = document.createElement('canvas');
    const scannerCtx = scannerCanvas.getContext('2d', { willReadFrequently: true });

    const loginChoiceView = document.getElementById('login-choice-view');
    const patientLoginView = document.getElementById('patient-login-view');
    const medicalLoginView = document.getElementById('medical-login-view');

    const setLanguage = (lang) => {
        currentLang = lang; document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang-key]').forEach(el => { const key = el.dataset.langKey; if(langStrings[lang] && langStrings[lang][key]) el.innerHTML = langStrings[lang][key]; });
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => { const key = el.dataset.langKeyPlaceholder; if(langStrings[lang] && langStrings[lang][key]) el.placeholder = langStrings[lang][key]; });
        langToggleBtn.textContent = lang === 'en' ? 'नेपाली' : 'English';
    };

    const navigateTo = (targetId) => {
        if(document.getElementById('scanner-page').classList.contains('active') && targetId !== 'scanner-page'){ stopScanner(); }
        document.querySelectorAll('main').forEach(p => p.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        window.scrollTo(0, 0);
    };
    
    // NEW: Helper function to generate the text for the QR code
    const generateQrCodeText = (patientData, patientId) => {
        return `Mero Swastha Card - Emergency Info\n` +
               `------------------------------------\n` +
               `ID: ${patientId}\n` +
               `Name: ${patientData.fullName}\n` +
               `DOB: ${patientData.dob}\n` +
               `Blood Group: ${patientData.bloodGroup}\n` +
               `Emergency Contact: ${patientData.emergencyPhone}`;
    };

    const getPatientRiskLevel = (patientData) => {
        const history = (patientData.history || '').toLowerCase();
        const highRiskKeywords = ['hypertension', 'diabetes', 'pregnant', 'cancer', 'heart'];
        const mediumRiskKeywords = ['chronic', 'asthma', 'kidney'];
        if (highRiskKeywords.some(kw => history.includes(kw))) return 'high';
        if (mediumRiskKeywords.some(kw => history.includes(kw))) return 'medium';
        return 'low';
    };
    
    const getHealthRecommendations = (patientData) => {
        const age = new Date().getFullYear() - new Date(patientData.dob).getFullYear();
        const gender = (patientData.gender || '').toLowerCase();
        let recommendations = [];

        if (gender === 'female' && age >= 18 && age <= 45) {
            recommendations.push("Consider regular check-ups with a gynecologist.");
        }
        if (age < 5) {
            recommendations.push("Ensure all childhood vaccinations (BCG, DPT, Polio, MR) are up to date.");
        }
        if (age > 50) {
            recommendations.push("Recommended to have annual blood pressure and cholesterol checks.");
        }
        if (recommendations.length === 0) {
            recommendations.push("Maintain a healthy diet and exercise regularly.");
        }
        return recommendations;
    };

    async function displayPatientData(patientId, patientData, isOffline = false) {
        currentPatientContext = { id: patientId, data: patientData };
        const page = document.getElementById('patient-found-page');
        const backLink = page.querySelector('.back-link');
        backLink.setAttribute('data-target', searchOriginPage);
        backLink.querySelector('span').textContent = langStrings[currentLang][searchOriginPage === 'clinic-dashboard-page' ? 'back_to_dashboard' : 'back'];
        
        page.querySelector('[data-value="name"]').textContent = patientData.fullName;
        page.querySelector('[data-value="patient-id"]').textContent = patientId;
        page.querySelector('[data-value="dob"]').textContent = patientData.dob;
        page.querySelector('[data-value="gender"]').textContent = patientData.gender || 'N/A';
        page.querySelector('[data-value="phone"]').textContent = patientData.phone;
        page.querySelector('[data-value="blood-group"]').innerHTML = `<ion-icon name="water-outline"></ion-icon> ${patientData.bloodGroup}`;
        page.querySelector('[data-value="address"]').textContent = patientData.address || 'N/A';
        page.querySelector('[data-value="medications"]').textContent = patientData.medications || 'None';
        page.querySelector('[data-value="history"]').textContent = patientData.history || 'None';
        page.querySelector('[data-value="emergencyName"]').textContent = patientData.emergencyName;
        page.querySelector('[data-value="emergencyPhone"]').textContent = patientData.emergencyPhone;

        const allergiesContainer = page.querySelector('[data-value="allergies"]');
        allergiesContainer.innerHTML = '';
        if (patientData.allergies && patientData.allergies.trim()) {
            patientData.allergies.split(',').forEach(allergy => {
                if(allergy.trim()){
                    const tag = document.createElement('span'); tag.className = 'allergy-tag';
                    tag.innerHTML = `<ion-icon name="alert-outline"></ion-icon> ${allergy.trim().toUpperCase()}`;
                    allergiesContainer.appendChild(tag);
                }
            });
        } else { allergiesContainer.innerHTML = `<span>None</span>`; }
        
        const riskLevel = getPatientRiskLevel(patientData);
        const infoBox = document.getElementById('patient-info-box');
        infoBox.className = 'content-box';
        infoBox.classList.add(`risk-${riskLevel}`);

        const recommendations = getHealthRecommendations(patientData);
        const recommendationsContainer = document.getElementById('patient-recommendations-container');
        recommendationsContainer.innerHTML = `<div class="recommendations-box"><h3><ion-icon name="heart-outline"></ion-icon> Health Recommendations</h3><ul>${recommendations.map(r => `<li>${r}</li>`).join('')}</ul></div>`;

        if (isOffline) {
            document.getElementById('patient-visit-history').innerHTML = `<li>Visit history is unavailable in offline mode.</li>`;
            document.getElementById('offline-indicator').style.display = 'flex';
        } else {
            await loadPatientVisitHistory(patientId);
            document.getElementById('offline-indicator').style.display = 'none';
        }
        navigateTo('patient-found-page');
        setLanguage(currentLang);
    }
    
    // MODIFIED: This function now parses both old and new QR code formats
    async function searchPatient(scannedData) {
        if (!scannedData || scannedData.trim() === "") {
            alert("Please enter a Patient ID or Name.");
            return;
        }
        scannedData = scannedData.trim();
        let patientIdToSearch = scannedData;

        // Check if this is the new rich text format
        if (scannedData.includes("Mero Swastha Card - Emergency Info")) {
            const match = scannedData.match(/ID: ([a-zA-Z0-9]{20})/);
            if (match && match[1]) {
                patientIdToSearch = match[1];
            } else {
                alert("Could not extract Patient ID from the QR code.");
                return;
            }
        }
        
        try {
            let snapshot;
            // First, try searching by the extracted/provided ID (which is the most reliable)
            if (/^[a-zA-Z0-9]{20}$/.test(patientIdToSearch)) {
                const doc = await db.collection("patients").doc(patientIdToSearch).get();
                if (doc.exists) {
                    snapshot = { docs: [doc] };
                }
            } 
            
            // If no document was found by ID, try a name search (for manual entry)
            if (!snapshot) {
                const nameQuery = patientIdToSearch.toLowerCase();
                snapshot = await db.collection("patients").where('fullName_lowercase', '>=', nameQuery).where('fullName_lowercase', '<=', nameQuery + '\uf8ff').get();
            }

            if (snapshot && !snapshot.empty) {
                if (snapshot.docs.length > 1) {
                    alert("Multiple patients found, showing the first result. Please use a more specific name or the Patient ID.");
                }
                const firstDoc = snapshot.docs[0];
                const patientData = firstDoc.data();
                savePatientLocally(firstDoc.id, patientData);
                displayPatientData(firstDoc.id, patientData, false);
            } else {
                alert("No patient found with the ID or Name: " + patientIdToSearch);
            }
        } catch (error) {
            console.error("Error searching for patient:", error);
            alert("An error occurred while searching. Please ensure your Firebase configuration is correct and you have a stable internet connection.");
        }
    }
    
    async function loadPatientVisitHistory(patientId) {
        const timeline = document.getElementById('patient-visit-history');
        timeline.innerHTML = '<p>Loading visit history...</p>';
        try {
            const querySnapshot = await db.collection("patients").doc(patientId).collection("visits").orderBy("visitDate", "desc").get();
            if(querySnapshot.empty) { timeline.innerHTML = '<p>No visit history found.</p>'; return; }
            
            timeline.innerHTML = '';
            querySnapshot.forEach(doc => {
                const visit = doc.data();
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                let reportLink = '';
                if (visit.reportUrl) {
                    reportLink = `<a href="${visit.reportUrl}" target="_blank" class="timeline-report-link"><ion-icon name="document-attach-outline"></ion-icon> View Attached Report</a>`;
                }
                
                item.innerHTML = `
                    <div class="timeline-icon"><ion-icon name="medkit-outline"></ion-icon></div>
                    <div class="timeline-content">
                        <div class="timeline-date">${visit.visitDate}</div>
                        <p class="timeline-reason">${visit.reason}</p>
                        ${reportLink}
                    </div>
                `;
                timeline.appendChild(item);
            });
        } catch(error) { console.error("Error loading visit history: ", error); timeline.innerHTML = '<p>Error loading history.</p>'; }
    }
    
    async function loadAllPatients() {
        const list = document.getElementById('all-patients-list'); list.innerHTML = '<li>Loading...</li>';
        try {
            const snapshot = await db.collection("patients").orderBy("createdAt", "desc").limit(20).get();
            list.innerHTML = '';
            if (snapshot.empty) { list.innerHTML = `<li>No patients found in the database.</li>`; return; }
            snapshot.forEach(doc => {
                const patient = doc.data(); const listItem = document.createElement('li');
                listItem.className = 'clickable';
                listItem.innerHTML = `<div class="visit-details"><strong>${patient.fullName}</strong><br><small>ID: ${doc.id}</small></div><div class="visit-date"><small>Gender: ${patient.gender || 'N/A'} | Blood: ${patient.bloodGroup || 'N/A'}</small><br><span>${patient.dob}</span></div>`;
                listItem.addEventListener('click', () => { searchOriginPage = 'clinic-dashboard-page'; displayPatientData(doc.id, patient); });
                list.appendChild(listItem);
            });
        } catch (error) { console.error("Error loading all patients:", error); list.innerHTML = `<li>Error loading patients.</li>`; }
    }

    function tick() {
        if (videoStream && scannerVideo.readyState === scannerVideo.HAVE_ENOUGH_DATA) {
            scannerCanvas.height = scannerVideo.videoHeight; scannerCanvas.width = scannerVideo.videoWidth;
            scannerCtx.drawImage(scannerVideo, 0, 0, scannerCanvas.width, scannerCanvas.height);
            const imageData = scannerCtx.getImageData(0, 0, scannerCanvas.width, scannerCanvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
            if (code) { stopScanner(); searchOriginPage = 'scanner-page'; searchPatient(code.data); } 
            else { requestAnimationFrame(tick); }
        } else if(videoStream) { requestAnimationFrame(tick); }
    }

    function startScanner() {
        if (videoStream) return;
        cameraIdleView.style.display = 'none'; cameraScanningView.style.display = 'flex';
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => {
                videoStream = stream; scannerVideo.srcObject = stream;
                scannerVideo.style.display = 'block'; scannerVideo.play();
                requestAnimationFrame(tick);
            }).catch(err => {
                console.error("Camera Error:", err);
                alert("Could not access camera. Please ensure you are on a secure (https://) connection and have granted camera permissions in your browser.");
                stopScanner();
            });
    }

    function stopScanner() {
        if (videoStream) { videoStream.getTracks().forEach(track => track.stop()); }
        videoStream = null; scannerVideo.style.display = 'none';
        cameraIdleView.style.display = 'flex'; cameraScanningView.style.display = 'none';
    }

    function handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                scannerCanvas.width = img.width; scannerCanvas.height = img.height;
                scannerCtx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = scannerCtx.getImageData(0, 0, img.width, img.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) { searchOriginPage = 'scanner-page'; searchPatient(code.data); } 
                else { alert("No QR code found in the selected image."); }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function closeModal(modal) { modal.classList.remove('visible'); }
    function showLoginModal() {
        loginChoiceView.style.display = 'block'; patientLoginView.style.display = 'none';
        medicalLoginView.style.display = 'none'; loginModal.classList.add('visible');
    }

    const generateAvatar = (name) => {
        const colors = ["#ffc107", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ff9800", "#ff5722", "#795548"];
        const nameParts = name.split(" ");
        const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[nameParts.length - 1][0] : name[0];
        const colorIndex = Math.floor(name.charCodeAt(0) % colors.length);
        return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${colors[colorIndex]}"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="16" font-family="Roboto, sans-serif" fill="#fff">${initials.toUpperCase()}</text></svg>`;
    };
    
    function renderLoggedInState(welcomeMessage) {
        document.getElementById('header-login-btn').style.display = 'none';
        const profileContainer = document.getElementById('user-profile-container');
        profileContainer.style.display = 'flex';
        document.getElementById('user-profile-name').textContent = welcomeMessage;
        document.getElementById('user-avatar').innerHTML = generateAvatar(welcomeMessage);

        document.getElementById('my-details-link').onclick = (e) => {
            e.preventDefault();
            populatePatientDashboard(); 
            navigateTo('patient-dashboard-page');
        };

        document.getElementById('logout-btn').onclick = () => { renderLoggedOutState(); navigateTo('main-page'); };
    }
    
    function renderLoggedOutState() {
        loggedInPatient = null; loggedInMedicalOfficial = null;
        document.getElementById('header-login-btn').style.display = 'flex';
        document.getElementById('user-profile-container').style.display = 'none';
    }

    function populatePatientDashboard() {
        if (!loggedInPatient) return;
        const page = document.getElementById('patient-dashboard-page');
        const patient = loggedInPatient.data; const patientId = loggedInPatient.id;
        page.querySelector('[data-value="dashboard-welcome-name"]').textContent = patient.fullName;
        page.querySelector('[data-value="patient-id-display"]').textContent = `Patient ID: ${patientId}`;
        page.querySelector('[data-value="dob"]').textContent = patient.dob;
        page.querySelector('[data-value="gender"]').textContent = patient.gender;
        page.querySelector('[data-value="phone"]').textContent = patient.phone;
        page.querySelector('[data-value="blood-group"]').innerHTML = `<ion-icon name="water-outline"></ion-icon> ${patient.bloodGroup}`;
        page.querySelector('[data-value="address"]').textContent = patient.address || 'N/A';
        const allergiesContainer = page.querySelector('[data-value="allergies"]');
        allergiesContainer.innerHTML = '';
        if (patient.allergies && patient.allergies.trim()) {
            patient.allergies.split(',').forEach(allergy => {
                if(allergy.trim()){
                    const tag = document.createElement('span'); tag.className = 'allergy-tag';
                    tag.innerHTML = `<ion-icon name="alert-outline"></ion-icon> ${allergy.trim().toUpperCase()}`;
                    allergiesContainer.appendChild(tag);
                }
            });
        } else { allergiesContainer.textContent = 'None'; }
        page.querySelector('[data-value="medications"]').textContent = patient.medications || 'None';
        const qrContainer = document.getElementById('patient-dashboard-qrcode-container');
        qrContainer.innerHTML = '';
        const qrText = generateQrCodeText(patient, patientId);
        new QRCode(qrContainer, { text: qrText, width: 150, height: 150, correctLevel: QRCode.CorrectLevel.H });
    }

    async function generatePatientReport() {
        if (!currentPatientContext.id) return;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const patient = currentPatientContext.data;
        const patientId = currentPatientContext.id;
        let y = 20;

        doc.setFontSize(22); doc.text("Patient Health Report", 105, y, { align: "center" }); y += 10;
        doc.setFontSize(12); doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, y, { align: "center" }); y += 15;

        const tempQrContainer = document.createElement('div');
        const qrText = generateQrCodeText(patient, patientId);
        new QRCode(tempQrContainer, { text: qrText, width: 256, height: 256, correctLevel: QRCode.CorrectLevel.H });
        doc.addImage(tempQrContainer.querySelector('canvas').toDataURL('image/png'), 'PNG', 15, y, 40, 40);
        
        doc.setFontSize(12);
        doc.text(`Name: ${patient.fullName}`, 65, y + 5);
        doc.text(`Patient ID: ${patientId}`, 65, y + 12);
        doc.text(`Date of Birth: ${patient.dob}`, 65, y + 19);
        doc.text(`Gender: ${patient.gender}`, 65, y + 26);
        doc.text(`Blood Group: ${patient.bloodGroup}`, 65, y + 33);
        y += 50;

        const drawSection = (title) => { doc.setLineWidth(0.5); doc.line(15, y, 195, y); y += 8; doc.setFontSize(16); doc.text(title, 15, y); y += 8; doc.setFontSize(12); };
        drawSection("Personal and Medical Details");
        doc.text(`Phone Number: ${patient.phone || 'N/A'}`, 20, y); doc.text(`Address: ${patient.address || 'N/A'}`, 105, y); y += 7;
        doc.text(`Known Allergies: ${patient.allergies || 'None'}`, 20, y); y += 7;
        doc.text(`Current Medications: ${patient.medications || 'None'}`, 20, y); y += 7;
        doc.text(`Medical History: ${patient.history || 'None'}`, 20, y); y += 15;
        drawSection("Emergency Contact");
        doc.text(`Contact Name: ${patient.emergencyName || 'N/A'}`, 20, y); doc.text(`Contact Phone: ${patient.emergencyPhone || 'N/A'}`, 105, y); y += 15;
        drawSection("Visit History");

        const visitsSnapshot = await db.collection("patients").doc(patientId).collection("visits").orderBy("visitDate", "desc").get();
        if (!visitsSnapshot.empty) {
            visitsSnapshot.forEach(visitDoc => {
                const visit = visitDoc.data(); const visitText = `${visit.visitDate}: ${visit.reason}`;
                const splitText = doc.splitTextToSize(visitText, 175);
                if (y + (splitText.length * 5) > 270) { doc.addPage(); y = 20; }
                doc.text(splitText, 20, y); y += (splitText.length * 5) + 5;
            });
        } else { doc.text("No visit history found.", 20, y); }

        if (loggedInMedicalOfficial) {
            if (y > 240) { doc.addPage(); y = 20; }
            drawSection("Physician's Signature");
            doc.text(`Signed by: Dr. ${loggedInMedicalOfficial.id}`, 20, y); y += 7;
            doc.text(`Healthpost: ${loggedInMedicalOfficial.healthpost}`, 20, y); y += 10;
            doc.addImage(placeholderSignature, 'PNG', 20, y, 60, 20);
            doc.line(20, y + 20, 80, y + 20);
        }
        
        doc.save(`Health_Report_${patient.fullName.replace(/ /g, '_')}.pdf`);
    }

    function printHealthCard() {
        if (!currentPatientContext.id) return;
        const { jsPDF } = window.jspdf;
        const patient = currentPatientContext.data;
        const patientId = currentPatientContext.id;
        
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 53.98] });

        doc.setFillColor(44, 62, 80);
        doc.rect(0, 0, 85.6, 12, 'F');
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text("Mero Swastha Card", 5, 8);

        const tempQrContainer = document.createElement('div');
        const qrText = generateQrCodeText(patient, patientId);
        new QRCode(tempQrContainer, { text: qrText, width: 128, height: 128 });
        const qrDataUrl = tempQrContainer.querySelector('canvas').toDataURL('image/png');
        doc.addImage(qrDataUrl, 'PNG', 5, 15, 25, 25);

        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text("Name:", 33, 20);
        doc.setFont(undefined, 'normal');
        doc.text(patient.fullName, 45, 20);
        
        doc.setFont(undefined, 'bold');
        doc.text("DOB:", 33, 25);
        doc.setFont(undefined, 'normal');
        doc.text(patient.dob, 45, 25);

        doc.setFont(undefined, 'bold');
        doc.text("Blood Grp:", 33, 30);
        doc.setFont(undefined, 'normal');
        doc.text(patient.bloodGroup, 45, 30);

        doc.setFont(undefined, 'bold');
        doc.text("ID:", 33, 35);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(6);
        doc.text(patientId, 45, 35, { maxWidth: 38 });

        doc.setLineWidth(0.2);
        doc.line(5, 43, 80.6, 43);
        doc.setFontSize(6);
        doc.setTextColor(128, 128, 128);
        doc.text("Scan for full medical history. Works offline.", 5, 47);
        doc.text("Emergency Contact: " + patient.emergencyPhone, 5, 51);

        doc.save(`Health_Card_${patient.fullName.replace(/ /g, '_')}.pdf`);
    }

    // *** EVENT LISTENERS ATTACHMENT ***
    langToggleBtn.addEventListener('click', (e) => { e.preventDefault(); setLanguage(currentLang === 'en' ? 'ne' : 'en'); });
    document.querySelectorAll('.nav-btn').forEach(button => { button.addEventListener('click', (e) => { e.preventDefault(); navigateTo(button.dataset.target); }); });
    document.getElementById('health-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const patientData = { fullName: document.getElementById('full-name').value, fullName_lowercase: document.getElementById('full-name').value.toLowerCase(), dob: document.getElementById('dob').value, gender: document.getElementById('gender').value, bloodGroup: document.getElementById('blood-group').value, phone: document.getElementById('phone').value, address: document.getElementById('address').value, emergencyName: document.getElementById('emergency-name').value, emergencyPhone: document.getElementById('emergency-phone').value, allergies: document.getElementById('allergies').value, medications: document.getElementById('medications').value, history: document.getElementById('history').value, createdAt: new Date() };
        try {
            const docRef = await db.collection("patients").add(patientData);
            const qrContainer = document.getElementById('qrcode-container');
            qrContainer.innerHTML = '';
            // MODIFIED: Generate the rich text QR code
            const qrText = generateQrCodeText(patientData, docRef.id);
            new QRCode(qrContainer, { text: qrText, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.H });
            navigateTo('qr-page');
            e.target.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Could not create Health ID. Please check your Firebase configuration and internet connection.");
        }
    });

    document.getElementById('download-qr-btn').addEventListener('click', () => {
        const qrCanvas = document.querySelector('#qrcode-container canvas');
        if (qrCanvas) {
            const link = document.createElement('a');
            link.download = 'Mero-Swastha-Card-QR.png';
            link.href = qrCanvas.toDataURL('image/png');
            link.click();
        } else { console.error('QR Canvas not found for download.'); }
    });

    document.getElementById('manual-search-form').addEventListener('submit', (e) => { e.preventDefault(); searchOriginPage = 'scanner-page'; searchPatient(e.target.querySelector('input').value); });
    document.getElementById('dashboard-search-form').addEventListener('submit', e => { e.preventDefault(); searchOriginPage = 'clinic-dashboard-page'; searchPatient(e.target.querySelector('input').value); });
    document.getElementById('add-visit-record-btn').addEventListener('click', () => {
        if (loggedInMedicalOfficial) {
            if (currentPatientContext && currentPatientContext.data) {
                document.getElementById('visit-patient-name').textContent = `For: ${currentPatientContext.data.fullName}`;
                navigateTo('add-visit-page');
            } else { alert("An error occurred. Please go back and select a patient again."); }
        } else {
            showLoginModal();
            loginChoiceView.style.display = 'none';
            medicalLoginView.style.display = 'block';
        }
    });
    
    document.getElementById('add-visit-form').addEventListener('submit', async e => {
        e.preventDefault();
        if(!currentPatientContext.id) { alert("No patient selected."); return; }

        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        const uploadProgress = document.getElementById('upload-progress');

        const visitData = { 
            visitDate: document.getElementById('visit-date').value, 
            reason: document.getElementById('visit-reason').value 
        };
        const reportFile = document.getElementById('visit-report-upload').files[0];

        try {
            if (reportFile) {
                uploadProgress.textContent = 'Uploading file...';
                uploadProgress.style.display = 'block';
                const storageRef = storage.ref(`reports/${currentPatientContext.id}/${Date.now()}_${reportFile.name}`);
                const uploadTask = storageRef.put(reportFile);
                
                await uploadTask;
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                visitData.reportUrl = downloadURL;
                uploadProgress.style.display = 'none';
            }
            await db.collection("patients").doc(currentPatientContext.id).collection("visits").add(visitData);
            alert("Visit record saved successfully!");
            document.getElementById('add-visit-form').reset();
            searchOriginPage = 'clinic-dashboard-page';
            displayPatientData(currentPatientContext.id, currentPatientContext.data);

        } catch (error) {
            console.error("Error saving visit: ", error);
            alert("Could not save visit record. Check console for details.");
            uploadProgress.style.display = 'none';
        } finally {
            submitBtn.disabled = false;
        }
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-pane').forEach(el => el.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
            if (button.dataset.tab === 'all-patients-tab') { loadAllPatients(); }
        });
    });

    document.querySelectorAll('.emergency-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            emergencyModal.querySelector('#modal-initial-state').style.display = 'block';
            emergencyModal.querySelector('#modal-success-state').style.display = 'none';
            emergencyModal.classList.add('visible');
            setTimeout(() => {
                emergencyModal.querySelector('#modal-initial-state').style.display = 'none';
                emergencyModal.querySelector('#modal-success-state').style.display = 'block';
            }, 2000);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => { overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); }); });
    document.querySelectorAll('.modal-close-btn, .close-modal-btn').forEach(btn => { btn.addEventListener('click', (e) => closeModal(e.target.closest('.modal-overlay'))); });
    document.getElementById('get-health-id-btn').addEventListener('click', (e) => { e.preventDefault(); navigateTo('form-page'); });
    document.getElementById('clinic-portal-btn').addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedInMedicalOfficial) { navigateTo('clinic-dashboard-page'); }
        else { showLoginModal(); loginChoiceView.style.display = 'none'; medicalLoginView.style.display = 'block'; }
    });

    document.getElementById('header-login-btn').addEventListener('click', (e) => { e.preventDefault(); showLoginModal(); });
    document.getElementById('choose-patient-btn').addEventListener('click', () => { loginChoiceView.style.display = 'none'; patientLoginView.style.display = 'block'; });
    document.getElementById('choose-medical-btn').addEventListener('click', () => { loginChoiceView.style.display = 'none'; medicalLoginView.style.display = 'block'; });
    loginModal.querySelectorAll('.modal-back-btn').forEach(btn => { btn.addEventListener('click', () => { patientLoginView.style.display = 'none'; medicalLoginView.style.display = 'none'; loginChoiceView.style.display = 'block'; }); });
    
    document.getElementById('patient-login-form').addEventListener('submit', async e => { 
        e.preventDefault();
        const phone = document.getElementById('patient-phone').value;
        const password = document.getElementById('patient-password').value;
        try {
            const snapshot = await db.collection("patients").where("phone", "==", phone).limit(1).get();
            if (snapshot.empty) { alert('No patient found with this phone number.'); return; }
            
            const doc = snapshot.docs[0];
            const patientData = doc.data(); const patientId = doc.id;
            const isNewUser = !patientData.hasOwnProperty('password') || patientData.password === undefined;
            
            if ((isNewUser && password === 'newuser') || (patientData.password === password)) {
                loggedInPatient = { id: patientId, data: patientData };
                closeModal(loginModal); 
                renderLoggedInState(loggedInPatient.data.fullName.split(' ')[0]);
                populatePatientDashboard(); 
                navigateTo('patient-dashboard-page');
                if(isNewUser) { 
                    newPasswordModal.classList.add('visible');
                    db.collection('patients').doc(patientId).update({ password: Math.random().toString(36).slice(-8) });
                }
            } else { alert('Invalid password. Please try again.'); }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your Firebase connection.");
        }
    });

    document.getElementById('medical-login-form').addEventListener('submit', e => { 
        e.preventDefault(); 
        const healthpost = document.getElementById('healthpost-name').value;
        const medicalId = document.getElementById('medical-id').value;
        const loginCode = document.getElementById('login-code').value;
        if (medicalId === 'admin' && loginCode === '1234' && healthpost) {
            loggedInMedicalOfficial = { id: medicalId, healthpost: healthpost };
            closeModal(loginModal);
            renderLoggedInState(`Dr. ${loggedInMedicalOfficial.id}`);
            navigateTo('clinic-dashboard-page');
        } else { alert('Invalid credentials. Please try again.'); }
    });

    dropZone.addEventListener('click', startScanner);
    qrFileInput.addEventListener('change', e => { if (e.target.files.length) handleFile(e.target.files[0]); });
    darkModeToggle.addEventListener('change', function() { document.body.classList.toggle('dark-mode', this.checked); localStorage.setItem('theme', this.checked ? 'dark' : 'light'); });
    
    document.getElementById('download-report-btn').addEventListener('click', generatePatientReport);
    document.getElementById('print-health-card-btn').addEventListener('click', printHealthCard);
    document.getElementById('dashboard-download-qr-btn').addEventListener('click', () => alert('Feature coming soon!'));

    const offlineButton = document.getElementById('offline-access-button');
    function savePatientLocally(patientId, patientData) { localStorage.setItem('lastViewedPatient', JSON.stringify({ id: patientId, data: patientData })); checkOfflineButton(); }
    function loadPatientLocally() { const d = localStorage.getItem('lastViewedPatient'); if (d) { const {id, data} = JSON.parse(d); searchOriginPage = 'main-page'; displayPatientData(id, data, true); } }
    function checkOfflineButton() { offlineButton.style.display = localStorage.getItem('lastViewedPatient') ? 'inline-flex' : 'none'; }
    offlineButton.addEventListener('click', loadPatientLocally);
    
    function populateHospitals() {
        const select = document.getElementById('healthpost-name');
        hospitals.sort().forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital; option.textContent = hospital;
            select.appendChild(option);
        });
    }
    
    // Initial Setup
    const initialTheme = localStorage.getItem('theme');
    if (initialTheme === 'dark') { document.body.classList.add('dark-mode'); darkModeToggle.checked = true; }
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    populateHospitals();
    checkOfflineButton();
    setLanguage('ne');
    renderLoggedOutState();
});