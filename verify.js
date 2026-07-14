const poolData = {
    UserPoolId: "us-east-1_4XFuIbPVc",
    ClientId: "atsublffk5frh0f9g18uis5of"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

window.onload = function () {

    const email = localStorage.getItem("verifyEmail");

    if (email) {
        document.getElementById("email").value = email;
    }

}

function verifyUser() {

    const email = document.getElementById("email").value;
    const code = document.getElementById("code").value;

    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser =
        new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(
        code,
        true,
        function (err, result) {

            if (err) {

                alert(err.message);

                return;

            }

            alert("Email Verified Successfully!");

            localStorage.removeItem("verifyEmail");

            window.location.href = "login.html";

        }
    );

}