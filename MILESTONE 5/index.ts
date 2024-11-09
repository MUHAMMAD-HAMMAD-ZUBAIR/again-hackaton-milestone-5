// Select the form and the resume output div
const form = document.getElementById("Resumeform") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;

// Function to handle form submission and generate resume
form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the form input values
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    
    // Get the uploaded profile picture
    const profilePicture = (document.getElementById("profilepicture") as HTMLInputElement).files?.[0];

    // Function to convert image to base64
    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Function to generate resume HTML content
    const generateResumeHTML = async () => {
        let resumeHTML = `
            <div style="text-align: center;">
                <h2>Resume: <span>${name}</span></h2>
            </div>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Education:</strong> ${education}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Skills:</strong> ${skills}</p>
        `;

        // If profile picture is uploaded, convert it to base64 and add to the resume
        if (profilePicture) {
            const base64Image = await convertImageToBase64(profilePicture);
            resumeHTML = `
                <div style="text-align: center;">
                    <img src="${base64Image}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">
                </div>
                ${resumeHTML}
            `;
        }

        return resumeHTML;
    };

    // Generate the resume HTML and display it
    generateResumeHTML().then((resumeHTML) => {
        // Display the generated resume in the output div
        resumeOutput.innerHTML = resumeHTML;

        // Create a Blob with the resume HTML content for download
        const blob = new Blob([resumeHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        // Create a download link for the resume
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `${username}-resume.html`; // File name with username
        downloadLink.innerText = "Download your Resume";

        // Create a shareable URL link
        const shareableLink = document.createElement("p");
        shareableLink.innerHTML = `<strong>Share your resume using this link:</strong> <a href="${url}" target="_blank">${url}</a>`;

        // Append both the download link and the shareable link to the output div
        const downloadMessage = document.createElement("p");
        downloadMessage.appendChild(downloadLink);
        resumeOutput.appendChild(downloadMessage);
        resumeOutput.appendChild(shareableLink);
    });
});
