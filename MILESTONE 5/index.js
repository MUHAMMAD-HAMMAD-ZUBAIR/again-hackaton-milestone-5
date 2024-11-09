var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Select the form and the resume output div
var form = document.getElementById("Resumeform");
var resumeOutput = document.getElementById("resumeOutput");
// Function to handle form submission and generate resume
form.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault(); // Prevent form from refreshing the page
    // Get the form input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Get the uploaded profile picture
    var profilePicture = (_a = document.getElementById("profilepicture").files) === null || _a === void 0 ? void 0 : _a[0];
    // Function to convert image to base64
    var convertImageToBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    // Function to generate resume HTML content
    var generateResumeHTML = function () { return __awaiter(_this, void 0, void 0, function () {
        var resumeHTML, base64Image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resumeHTML = "\n            <div style=\"text-align: center;\">\n                <h2>Resume: <span>".concat(name, "</span></h2>\n            </div>\n            <p><strong>Username:</strong> ").concat(username, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Education:</strong> ").concat(education, "</p>\n            <p><strong>Experience:</strong> ").concat(experience, "</p>\n            <p><strong>Skills:</strong> ").concat(skills, "</p>\n        ");
                    if (!profilePicture) return [3 /*break*/, 2];
                    return [4 /*yield*/, convertImageToBase64(profilePicture)];
                case 1:
                    base64Image = _a.sent();
                    resumeHTML = "\n                <div style=\"text-align: center;\">\n                    <img src=\"".concat(base64Image, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\">\n                </div>\n                ").concat(resumeHTML, "\n            ");
                    _a.label = 2;
                case 2: return [2 /*return*/, resumeHTML];
            }
        });
    }); };
    // Generate the resume HTML and display it
    generateResumeHTML().then(function (resumeHTML) {
        // Display the generated resume in the output div
        resumeOutput.innerHTML = resumeHTML;
        // Create a Blob with the resume HTML content for download
        var blob = new Blob([resumeHTML], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        // Create a download link for the resume
        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "".concat(username, "-resume.html"); // File name with username
        downloadLink.innerText = "Download your Resume";
        // Create a shareable URL link
        var shareableLink = document.createElement("p");
        shareableLink.innerHTML = "<strong>Share your resume using this link:</strong> <a href=\"".concat(url, "\" target=\"_blank\">").concat(url, "</a>");
        // Append both the download link and the shareable link to the output div
        var downloadMessage = document.createElement("p");
        downloadMessage.appendChild(downloadLink);
        resumeOutput.appendChild(downloadMessage);
        resumeOutput.appendChild(shareableLink);
    });
});
