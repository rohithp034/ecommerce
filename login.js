// ===============================
// Amazon Cognito Configuration
// ===============================

console.log("login.js loaded");
console.log(AmazonCognitoIdentity);

const poolData = {
    UserPoolId: "us-east-1_4XFuIbPVc",
    ClientId: "atsublffk5frh0f9g18uis5of"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// ===============================
// Toggle Login / Signup
// ===============================

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// ===============================
// Signup
// ===============================

function signup() {

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const attributeList = [];

    attributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "email",
            Value: email
        })
    );

    userPool.signUp(
        email,
        password,
        attributeList,
        null,
        function(err, result) {

            console.log("Signup Result:", result);
            console.log("Signup Error:", err);

            if (err) {
                console.error(err);
                alert(err.message);
                return;
            }

            alert("Signup successful!");

            localStorage.setItem("verifyEmail", email);

            window.location.href = "verify.html";

        }
    );

}
// ===============================
// Login
// ===============================

function login() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const authenticationDetails =
        new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password
        });

    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser =
        new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {

        onSuccess: function (result) {

            localStorage.setItem(
                "jwtToken",
                result.getIdToken().getJwtToken()
            );

            localStorage.setItem(
                "accessToken",
                result.getAccessToken().getJwtToken()
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            alert("Login Successful!");

            window.location.href = "index.html";
        },

        onFailure: function (err) {

            alert(err.message);

        }

    });

}

// ===============================
// Logout
// ===============================

function logout() {

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.signOut();
    }

    localStorage.clear();

    window.location.href = "login.html";
}

// ===============================
// Mobile Navbar
// ===============================

const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}