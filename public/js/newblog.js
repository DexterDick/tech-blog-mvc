const newblogHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const contents = document.querySelector("#contents").value.trim();

    if (title && contents) {
        // Send a POST request to the API endpoint
        const response = await fetch("/api/blog", {
            method: "POST",
            body: JSON.stringify({ title, contents }),
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
    .querySelector(".newblog-form")
    .addEventListener("submit", newblogHandler);
