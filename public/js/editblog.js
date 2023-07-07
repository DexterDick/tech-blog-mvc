const editblogHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const contents = document.querySelector("#contents").value.trim();
    const id = event.target.getAttribute("data-blogId");

    if (title && contents) {
        // Send a Put request to the API endpoint
        const response = await fetch(`/api/blog/edit/${id}`, {
            method: "PUT",
            body: JSON.stringify({ blogId: id, title, contents }),
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

const deleteblogHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data-deleteId");
    console.log("test 123" + id);
    if (id) {
        const response = await fetch(`/api/blog/delete/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Fail to delete blog with id");
        }
    }
};

document
    .querySelector(".editblog-form")
    .addEventListener("submit", editblogHandler);

document
    .querySelector(".btn-delete")
    .addEventListener("click", deleteblogHandler);
