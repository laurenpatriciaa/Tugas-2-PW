// Create elements and manage DOM manipulation
const root = document.querySelector('.root');

// Notification Section
const notification = document.createElement('div');
notification.classList.add('notification', 'active'); // Add 'active' to make it visible on load
notification.innerHTML = `
    <p>Selamat datang! Silakan isi form di bawah ini.</p>
    <button id="ok-button">OK</button>
`;
root.appendChild(notification);

// Main Title
const title = document.createElement('h1');
title.textContent = 'Tugas-2 Praktikum Pemrograman Web';
title.style.textAlign = 'center'; // Center the title
title.style.position = 'relative'; // Set position relative for the underline
title.style.display = 'inline-block'; // Adjust display property
title.style.margin = '20px 0'; // Add some margin for spacing

// Add underline using a div
const underline = document.createElement('div');
underline.style.height = '2px'; // Set thickness of the underline
underline.style.backgroundColor = 'black'; // Set color of the underline
underline.style.width = '100%'; // Set width to cover the title
underline.style.position = 'absolute'; // Position it relative to the title
underline.style.bottom = '-5px'; // Position it below the title
underline.style.left = '0'; // Align it to the left

title.appendChild(underline); // Append the underline to the title
root.appendChild(title);

// Success Notification Section
const successNotification = document.createElement('div');
successNotification.id = 'successNotification';
successNotification.classList.add('success-notification');
successNotification.innerHTML = `
    <p>Form berhasil disubmit</p>
    <button id="success-ok-button">OK</button>
`;
root.appendChild(successNotification);

// Form and Image Container
const formContainer = document.createElement('div');
formContainer.classList.add('form-container');

// Form Section
const formSection = document.createElement('div');
formSection.classList.add('form-section');
formSection.innerHTML = `
    <form id="myForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Rivaldo Pardede" disabled>
        <label for="nim">NIM:</label>
        <input type="text" id="nim" name="nim" placeholder="221401060" disabled>
        <label for="kom">KOM:</label>
        <input type="text" id="kom" name="kom" placeholder="C" disabled>
        <label for="photo">Upload Photo:</label>
        <input type="file" id="photo" name="photo" accept="image/*" disabled>
        <button type="submit" disabled>Submit</button>
    </form>
`;
formContainer.appendChild(formSection);

// Display Container
const displayContainer = document.createElement('div');
displayContainer.id = 'displayContainer';
displayContainer.classList.add('display-container');

// Image Element
const uploadedImage = document.createElement('img');
uploadedImage.id = 'uploadedImage';
uploadedImage.alt = 'Uploaded Photo';
uploadedImage.style.maxWidth = '100%'; // Ensure the image is responsive
displayContainer.appendChild(uploadedImage);

// Table for displaying name, NIM, KOM after submission
const infoTable = document.createElement('table');
infoTable.classList.add('info-table');
infoTable.innerHTML = `
    <tr><td>Username: <span id="displayUsername"></span></td></tr>
    <tr><td>NIM: <span id="displayNim"></span></td></tr>
    <tr><td>KOM: <span id="displayKom"></span></td></tr>
`;
displayContainer.appendChild(infoTable);

// Initially hide the display container
displayContainer.style.display = 'none'; // Start hidden
formContainer.appendChild(displayContainer);

// Append the form container to the root
root.appendChild(formContainer);

// Event Listeners
document.getElementById('ok-button').addEventListener('click', () => {
    notification.classList.remove('active');  // Hide notification
    // Enable inputs after clicking OK
    document.getElementById('username').disabled = false;
    document.getElementById('nim').disabled = false;
    document.getElementById('kom').disabled = false;
    document.getElementById('photo').disabled = false;
    document.querySelector('button[type="submit"]').disabled = false; // Enable submit button
});

const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const nim = document.getElementById('nim').value;
    const kom = document.getElementById('kom').value;
    const photo = document.getElementById('photo').files[0];

    // Check if all fields are filled
    if (!username || !nim || !kom || !photo) {
        alert("Mohon isi semua data yang diperlukan."); // Alert user to fill in all fields
        return; // Stop further execution
    }

    // Hide the error notification if it was shown
    successNotification.classList.add('active');

    // Display the uploaded image
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage.src = e.target.result; // Store image data
    }
    reader.readAsDataURL(photo);

    // Fill in the details in the info table
    document.getElementById('displayUsername').textContent = username;
    document.getElementById('displayNim').textContent = nim;
    document.getElementById('displayKom').textContent = kom;

    // Hide display container until OK is clicked
    displayContainer.style.display = 'none'; // Start hidden
});

// Handle OK button on success notification
document.getElementById('success-ok-button').addEventListener('click', () => {
    successNotification.classList.remove('active'); // Hide the notification
    displayContainer.style.display = 'block'; // Show the display container with the image and user info
});