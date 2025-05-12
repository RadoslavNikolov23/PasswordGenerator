const button = document.getElementById("generateButton") as HTMLBodyElement;
const input = document.getElementById("password") as HTMLInputElement;
const passwordLength = document.getElementById("passwordLength") as HTMLInputElement;
const message = document.getElementById("message") as HTMLParagraphElement;
const messageWarning = document.getElementById("messageWarning") as HTMLParagraphElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const copyClipboardButton = document.getElementById("copyClipboardButton") as HTMLButtonElement;
const strengthLevel = document.getElementById("strengthLevel") as HTMLDivElement;
const toggle = document.getElementById("togglePassword") as HTMLInputElement;


button.addEventListener("click",() =>{
    const rawValue = passwordLength.value.trim();
    let length = Number(rawValue);
    message.textContent = "";
    messageWarning.textContent = "";

    if (isNaN(length)) {
        message.textContent = "Please enter a number.";
        return;
    }
    
    if(length<8){
        messageWarning.textContent = "⚠️ Password must be at least 8 characters.";
        input.value = "";
        strengthLevel.style.width = "0%";
        return;
    }    
    else if(length>40){
        messageWarning.textContent = "⚠️ Password can't be more than 40 characters.";
        input.value = "";
        strengthLevel.style.width = "0%";
        return;
    } 

    const password = passwordGenerator(length);
    input.value=password
    showPasswordStrength(length);
});

function passwordGenerator(lenght: number = 12): string {
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
    let password = "";
    for(let i=0;i<lenght;i++){
        const index = getRandomInt(0,char.length-1);
        password+=char[index];
    }
    return password;
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
