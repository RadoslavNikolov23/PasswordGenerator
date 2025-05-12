var button = document.getElementById("generateButton");
var input = document.getElementById("password");
var passwordLength = document.getElementById("passwordLength");
var message = document.getElementById("message");
var messageWarning = document.getElementById("messageWarning");
var resetButton = document.getElementById("resetButton");
var copyClipboardButton = document.getElementById("copyClipboardButton");
var strengthLevel = document.getElementById("strengthLevel");
var toggle = document.getElementById("togglePassword");
button.addEventListener("click", function () {
    var rawValue = passwordLength.value.trim();
    var length = Number(rawValue);
    message.textContent = "";
    messageWarning.textContent = "";
    if (isNaN(length)) {
        message.textContent = "Please enter a number.";
        return;
    }
    if (length < 8) {
        messageWarning.textContent = "⚠️ Password must be at least 8 characters.";
        input.value = "";
        strengthLevel.style.width = "0%";
        return;
    }
    else if (length > 40) {
        messageWarning.textContent = "⚠️ Password can't be more than 40 characters.";
        input.value = "";
        strengthLevel.style.width = "0%";
        return;
    }
    var password = passwordGenerator(length);
    input.value = password;
    showPasswordStrength(length);
});
function passwordGenerator(lenght) {
    if (lenght === void 0) { lenght = 12; }
    var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
    var password = "";
    for (var i = 0; i < lenght; i++) {
        var index = getRandomInt(0, char.length - 1);
        password += char[index];
    }
    return password;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function showPasswordStrength(lenght) {
    var strength = 0;
    var color = "red";
    if (lenght >= 8)
        strength = 33;
    if (lenght >= 20)
        strength = 66;
    if (lenght >= 32)
        strength = 99;
    if (strength === 33)
        color = "orange";
    if (strength === 66)
        color = "gold";
    if (strength === 99)
        color = "green";
    strengthLevel.style.width = "".concat(strength, "%");
    strengthLevel.style.backgroundColor = color;
}
resetButton.addEventListener("click", function () {
    passwordLength.value = "12";
    input.value = "";
    message.textContent = "";
    messageWarning.textContent = "";
    strengthLevel.style.width = "0%";
});
copyClipboardButton.addEventListener("click", function () {
    if (input.value != null) {
        navigator.clipboard.writeText(input.value);
        message.textContent = "Password copied to clipboard";
        message.style.color = "black";
    }
    else {
        message.textContent = "Generate first a password!";
        message.style.color = "red";
    }
});
toggle.addEventListener("change", function () {
    input.type = toggle.checked ? "text" : "password";
});
