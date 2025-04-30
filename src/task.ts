const button = document.getElementById("generateButton") as HTMLBodyElement;
const input = document.getElementById("password") as HTMLInputElement;
const passwordLength = document.getElementById("passwordLength") as HTMLInputElement;
const message = document.getElementById("message") as HTMLParagraphElement;
const messageWarning = document.getElementById("messageWarning") as HTMLParagraphElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const copyClipboardButton = document.getElementById("copyClipboardButton") as HTMLButtonElement;
const strengthLevel = document.getElementById("strengthLevel") as HTMLDivElement;
const toggle = document.getElementById("togglePassword") as HTMLInputElement;

function passwordGenerator(lenght: number = 12): string {
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
    let password = "";
    for(let i=0;i<lenght;i++){
        const index = Math.floor(Math.random()*char.length);
        password+=char[index];
    }
    return password;
}

function showPasswordStrength(lenght:number){
    let strength = 0;
    let color = "red";

    if(lenght>=8) strength = 33;
    if(lenght>=20) strength = 66;
    if(lenght>=32) strength = 99;

    if(strength===33) color = "orange";
    if(strength===66) color = "gold";
    if(strength===99) color = "green";

    strengthLevel.style.width=`${strength}%`;
    strengthLevel.style.backgroundColor=color;

}

button.addEventListener("click",() =>{
    let length = parseInt(passwordLength.value,12);
    message.textContent = "";
    messageWarning.textContent = "";

    if (isNaN(length)) {
        message.textContent = "Please enter a number.";
        return;
    }

    if(length<8){
        messageWarning.textContent = "Password must be at least 8 characters. Using 8 instead.";
        length=8;
    }    
    else if(length>33){
        messageWarning.textContent = "Password can't be more than 32 characters. Using 32 instead.";
        length = 32;
    } 

    const password = passwordGenerator(length);
    input.value=password
    showPasswordStrength(length);
});

resetButton.addEventListener("click", () => {
    passwordLength.value = "12";  
    input.value = "";             
    message.textContent = "";
    messageWarning.textContent = "";
    strengthLevel.style.width = "0%";    
});

copyClipboardButton.addEventListener("click", ()=>{
    if(input.value !=null){
        navigator.clipboard.writeText(input.value);
        message.textContent = "Password copied to clipboard";
        message.style.color="black"
    }
    else{
        message.textContent="Generate first a password!";
        message.style.color="red";
    }
});

toggle.addEventListener("change", () => {
    input.type = toggle.checked ? "text" : "password";
});
