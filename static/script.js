const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const generateBtn = document.getElementById("generateBtn");

const copyBtn = document.getElementById("copyBtn");

const entropyText = document.getElementById("entropyText");

const darkModeBtn = document.getElementById("darkModeBtn");


// SHOW / HIDE PASSWORD

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    }

    else {

        passwordInput.type = "password";

    }

});


// GENERATE PASSWORD

generateBtn.addEventListener("click", () => {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";

    for (let i = 0; i < 12; i++) {

        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    passwordInput.value = password;

    calculateEntropy(password);

});


// COPY PASSWORD

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(passwordInput.value);

    alert("Password copied!");

});


// ENTROPY CALCULATION

passwordInput.addEventListener("input", () => {

    calculateEntropy(passwordInput.value);

});

function calculateEntropy(password) {

    const entropy = password.length * 4;

    entropyText.innerHTML =
        "Entropy Score: " + entropy;

}


// DARK MODE

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});