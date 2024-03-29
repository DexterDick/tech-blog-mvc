const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
