const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

const users = [{name:"srinidhi",password:"12345"},
    {name:"basu",password:"12345"}
];


document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("signupName").value;
    const password = document.getElementById("signupPassword").value;

    const userExists = users.some(user => user.name === name);

    if (userExists) {
        alert(`Welcome back, ${name} ! You have already signed in .`);
    } else {
        users.push({ name, password });
        alert(`Signup successful, ${name} ! Welcome to StudentCare.com`);
        document.getElementById("signupForm").reset();
    }
});


document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signinName").value;
    const password = document.getElementById("signinPassword").value;

    const user = users.find(user => user.name === name && user.password === password);

    if (user) {
        window.location.href = "http://localhost:8080/home";
    } else {
        window.location.href = "http://localhost:8080/signup/error";
    }
});