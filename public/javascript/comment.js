async function commentFormHandler(event) {
  event.preventDefault();
  
 // this will split the url from the first / then it will give us post/1 then split again to have 1 left
  const comment_name = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_name) {
    // this will be added to the comment table, and the way this will happen is that this data is sent to the backend and the backend will have another post,
    // to the same endpoint then it will be a create method, and send back data back to the frontend as json
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        // this comment_name is whatever we enter to the textarea 
        comment_name,
        // this post_id is the post id that we have on the URL, we just splitted the url to get itz
        post_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
