const postId = document.querySelector("#post-id").value.trim();

const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#edit-title").value.trim();
    const body = document.querySelector("#edit-body").value.trim();

    if (title && body) {
        await fetch(`/api/posts/${postId}`, {
            method: "PUT",
            body: JSON.stringify({ title, body }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        document.location.replace("/dashboard");
    }
};

const deletePost = async () => {
    await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });

    document.location.replace("/dashboard");
};

document.querySelector(".edit-form").addEventListener("submit", updatePost);

document.querySelector("#btn-delete").addEventListener("click", deletePost);
