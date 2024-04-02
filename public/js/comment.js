const addComment = async (event) => {
    const postId = document.querySelector("#post_id").value.trim();
    const body = document.querySelector("#comment-body").value.trim();

    if (postId && body) {
        const response = await fetch(`/api/comment`, {
            method: "POST",
            body: JSON.stringify({ body, postId }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.reload();
        }
    }
};
