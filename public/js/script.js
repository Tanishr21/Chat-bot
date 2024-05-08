var sendbtn = document.getElementById('sendbtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var user = { message: "" };
var userData = {
    phoneNumber: "",
    email: "",
    name: ""
};

var arrayofPossibleMessage = [
    { message: "What is your name?", response: "I'm a Chatbot" },
    { message: "I'm looking for a [insert type of car].", response: "What type of car are you looking for? (e.g., sedan, SUV, coupe)" },
    { message: "Do you have any specific make or model in mind?", response: "I'm interested in [insert make/model], but I'm open to suggestions." },
    { message: "My budget range is between [insert budget range].", response: "What is your budget range for the car?" },
    { message: "I'm comfortable with a car that has up to [insert mileage].", response: "How many miles/kilometers are you comfortable with on the odometer?" },
    { message: "Are there any specific features or options you're looking for in the car?", response: "I'm particularly interested in [insert features/options]." },
    { message: "Yes, I prefer a car with a clean accident history.", response: "Do you prefer a car with a clean accident history?" },
    { message: "I'm interested in a second-hand premium car because [insert reason].", response: "Is there any specific reason you're interested in a second-hand premium car?" },
    { message: "Yes, I've owned a premium car before.", response: "Have you owned a premium car before?" },
    { message: "Yes, I'd appreciate assistance in scheduling a test drive.", response: "Would you like assistance in scheduling a test drive?" },
    { message: "I'm also looking for [insert preferences/requirements].", response: "Do you have any other preferences or requirements for the car?" },
    { message: "I'm planning to [insert financing/payment method].", response: "Are you planning to finance the purchase or pay in full?" },
    { message: "That's all for now, thank you!", response: "Is there anything else I can help you with?" }
];

function sendMessage(userMessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.style.margin = "10px";

    messageElement.innerHTML = "<span> You : </span>" + "<span>" + userMessage + "</span>";

    chatContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


function ChatbotResponse(userMessage) {
    var chatbotmessage = "";
    if (userMessage.toLowerCase() === "hi") {
        chatbotmessage = "Hello! How can I assist you today?";
    } else if (userMessage.toLowerCase() === "how are you") {
        chatbotmessage = "I'm Great";
    } else if (userMessage.toLowerCase().includes("which car brand do you want to buy?")) {
        var premiumCars = getPremiumCars(); // Retrieve premium cars
        chatbotmessage = "Here are some premium car brands: " + premiumCars.join(", ");
    } else if (userMessage.length > 5) {
        var result = arrayofPossibleMessage.filter(val => val.message.toLowerCase().includes(userMessage.toLowerCase()));

        if (result.length > 0) {
            var response = result[0].response;
            chatbotmessage = response;
        } else {
            chatbotmessage = "please send another message ";
        }
    } else {
        chatbotmessage = "please send me a different message ";
    }

    var messageElement = document.createElement('div');
    messageElement.innerHTML = "<span>Chatbot: </span>" + "<span>" + chatbotmessage + "</span>";
    chatContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function selectQuestion(questionNumber) {
    switch (questionNumber) {
        case 1:
            // Perform actions for question 1
            console.log("Question 1 selected");
            break;
        case 2:
            // Perform actions for question 2
            console.log("Question 2 selected");
            break;
        case 3:
            // Perform actions for question 3
            console.log("Question 3 selected");
            submitUserData();
            Visibility(); // Call the submitUserData function for question 3
            break;
       case 4:
            // Perform actions for question 4
            console.log("Question 4 selected");
            displayPaymentOptions(); // Call function to display payment options
            break;
        default:
            console.log("Question", questionNumber, "selected");
            if (questionNumber === 3) {
                retrieveUserData(); // Call function to retrieve user data
                Visibility(); // Toggle visibility of input fields
            }
    }
}

 
function submitUserData() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;

    // Check if any of the fields are empty
    // if (!phoneNumber || !email || !name) {
    //     alert("Please fill in all fields.");
    //     return;
    // }

    // Assign values to userData object
    userData.phoneNumber = phoneNumber;
    userData.email = email;
    userData.name = name;

    // Perform further actions with userData object
    console.log("User data submitted:", userData);

    // Reset input fields
    document.getElementById('phoneNumber').value = "";
    document.getElementById('email').value = "";
    document.getElementById('name').value = "";

    // Toggle display of userDataForm
    var userDataForm = document.getElementById('userDataForm');
    if (userDataForm) {
        userDataForm.style.display = (userDataForm.style.display === 'none') ? 'block' : 'none';
    }
    // else {
    //     console.error("Element with ID 'userDataForm' not found.");
    // }
}

function retrieveUserData() {
    userData.phoneNumber = document.getElementById('phoneNumber').value;
    userData.email = document.getElementById('email').value;
    userData.name = document.getElementById('name').value;
}

function Visibility() {
    var phoneNumberField = document.getElementById('phoneNumber');
    var emailField = document.getElementById('email');
    var nameField = document.getElementById('name');

    // Toggle the visibility of input fields
    phoneNumberField.style.display = (phoneNumberField.style.display === 'none' || phoneNumberField.style.display === '') ? 'block' : 'none';
    emailField.style.display = (emailField.style.display === 'none' || emailField.style.display === '') ? 'block' : 'none';
    nameField.style.display = (nameField.style.display === 'none' || nameField.style.display === '') ? 'block' : 'none';
}
// Function to check if all form fields are filled
function checkFormCompletion() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;

    // Check if all fields are filled
    if (phoneNumber && email && name) {
        document.getElementById('submitDetailsBtn').classList.remove('hidden'); // Show the submit button
    } else {
        document.getElementById('submitDetailsBtn').classList.add('hidden'); // Hide the submit button
    }
}

// Add event listeners to form fields to check completion
document.getElementById('phoneNumber').addEventListener('input', checkFormCompletion);
document.getElementById('email').addEventListener('input', checkFormCompletion);
document.getElementById('name').addEventListener('input', checkFormCompletion);


// Remove this code block
sendbtn.addEventListener('click', function(e) {
    var userMessage = textbox.value;
    if (userMessage == "") {
        alert('Please Type In A Message');
    } else {
        let userMessageText = userMessage.trim();
        user.message = userMessageText;
        textbox.value = "";
        sendMessage(userMessageText);
        ChatbotResponse(userMessageText);
    }
});


var submitDetailsBtn = document.getElementById('submitDetailsBtn');

submitDetailsBtn.addEventListener('click', function() {
    submitUserData();
    // Display message from chatbot
    var messageFromChatbot = "Our team will get back to you soon.";
    var messageElement = document.createElement('div');
    messageElement.innerHTML = "<span>Chatbot: </span>" + "<span>" + messageFromChatbot + "</span>";
    chatContainer.appendChild(messageElement);
    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
    alert("Our team will get back to you soon");
});

function showPaymentOptions() {
    // Display payment options container or elements
    var paymentOptionsContainer = document.getElementById('paymentOptionsContainer');
    if (paymentOptionsContainer) {
        paymentOptionsContainer.style.display = 'block';
    } else {
        console.error("Payment options container not found.");
    }
}

function displayPaymentOptions() {
    var paymentOptions = document.getElementById('paymentOptions');
    if (paymentOptions) {
        paymentOptions.classList.remove('hidden');
    } else {
        console.error("Payment options container not found.");
    }
}