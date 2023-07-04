const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value.trim();

    const blog_id = document.querySelector(".comment-form").dataset.blogid;

    if (comment) {
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({ comment, blog_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // start here
            document.location.reload();
        } else {
            alert("Failed to create comment!");
        }
    }
};

document
    .querySelector(".comment-form")
    .addEventListener("submit", commentHandler);
