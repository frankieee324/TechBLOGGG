var loginButton = document.querySelector('.login-form');
var submitPostBtn = document.querySelector('#submitPostBtn');
var signupbtn = document.querySelector('#signupbtn');

var dashdeletebtn = document.querySelectorAll('.dashdeletebtn');
var dasheditbtn = document.querySelectorAll('.dasheditbtn');
var dashcommentbtn = document.querySelectorAll('.dashcommentbtn');
var commentSection = document.querySelectorAll('.commentSection');
var buttonSection = document.querySelectorAll('.buttonSection');
var submitCommentBtn = document.querySelectorAll('.submitCommentBtn');
var blogCommentElement = document.querySelectorAll('.blogComment');
var homecommentbtn = document.querySelectorAll('.homecommentbtn');
var submitBlogCommentBtn = document.querySelector('.submitBlogCommentBtn');
var blogcommentbtn = document.querySelector('.blogcommentbtn');

var blogButtonSection = document.querySelector('.blogButtonSection');
var blogCommentSection = document.querySelector('.blogCommentSection');
var cancelCommentBtn = document.querySelector('.cancelCommentBtn');
var cancelPostBtn = document.querySelector('#cancelPostBtn');
var cancelDashCommentBtn = document.querySelectorAll('.cancelDashCommentBtn');



// Function to Login into the application
const loginFormHandler = async (event) => {
     event.preventDefault();

     const email = document.querySelector('#emailInput').value.trim();
     const password = document.querySelector('#passwordInput').value.trim();
 
     if (email && password) {
          const response = await fetch('/login', {
               method: 'POST',
               body: JSON.stringify({ email, password }),
               headers: { 'Content-Type': 'application/json' },
          });
 
          if (response.ok) {
               document.location.replace('/home');
          } else {
               alert('Failed to log in.');
          } 
     } 
};

// Function to get the Blog data and call the Save method
const saveBlogPostHandler = (event) => {
     event.preventDefault();
     const blogTitle = document.querySelector('#blogTitle').value;
     const blogPost = document.querySelector('#blogPost').value;

     var itemElement = event.currentTarget.parentElement;
     const blogId = itemElement.getAttribute("blogId");

     const newBlogPost = {
          blog_title: blogTitle,
          blog_post: blogPost
     };
     saveBlogPost(newBlogPost, blogId);
};

// Function to save the Blog Post
const saveBlogPost = async (newBlogPost, blogId) => {
     let response;
     if (blogId) {
          response = await fetch(`/blog/${blogId}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(newBlogPost)
          });
     } else {
          response = await fetch('/blog', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(newBlogPost)
          });
     }

     if (response.ok) {
          document.location.replace('/dashboard');
     } else {
          alert('Error in saving the posts');
     } 
};


// Function to SignUp into the application
const signUpFormHandler = async (event) => {
     event.preventDefault();

     const firstName = document.querySelector('#firstnamesignup').value.trim();
     const lastName = document.querySelector('#lastnamesignup').value.trim();
     const username = document.querySelector('#emailsignup').value.trim();
     const password = document.querySelector('#passwordsignup').value.trim();
     const confirmpassword = document.querySelector('#confirmpasswordsignup').value.trim();

     if (firstName && lastName && username && comparePassword(password, confirmpassword)) {
          const response = await fetch('/signup', {
               method: 'POST',
               body: JSON.stringify({ firstName, lastName, username, password }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.replace('/dashboard');
               alert("You are logged in!");
          } else {
               alert('Sign Up process failed. Please try again!');
          }
     }
};

// Function to compare the password and confirm password
function comparePassword(password, confirmpassword) {
     if (password === confirmpassword) {
          return true;
     } else {
          alert('Entered Password and Confirm Password does not match!');
          return false;
     }
}

// Function to delete the blog post
for (let i = 0; i < dashdeletebtn.length; i++) {
     dashdeletebtn[i].addEventListener("click", async function(event) {
          var itemElement = event.currentTarget.parentElement;
          const targetId = itemElement.getAttribute("id");

          const response = await fetch('/blog', {
               method: 'DELETE',
               body: JSON.stringify({targetId }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               alert('Blog id# '+targetId+' deleted successfully');
               document.location.replace('/dashboard');
          } else {
               alert('Delete Failed. Please try again!');
          }
     });
}

// Function to display the comment section in dashboard page
for (let i = 0; i < dashcommentbtn.length; i++) {
     dashcommentbtn[i].addEventListener('click', function (event) {
          commentSection[i].classList.value = "showComment";
          buttonSection[i].classList.value = "hideButtons";
     });
}

// Function to save the comment from dashboard page
for (let i = 0; i < submitCommentBtn.length; i++) {
     submitCommentBtn[i].addEventListener('click', async function (event) {
          var itemElement = event.currentTarget.parentElement;
          const blogId = itemElement.getAttribute("blogid");
          var blogComment = blogCommentElement[i].value;
          saveCommentFunction(blogId, blogComment, "dashboardComment");
     });
}

// Function to display the comment section in home page
const commentBtnHandler = async (event) => { 
     blogButtonSection.classList.value = "hideButtons";
     blogCommentSection.classList.value = "showComment";
};

// Function to save the comment from home page
const commentHandler = async (event) => { 
     event.preventDefault();
     const blogIdElement = document.querySelector('.blogIdClass');
     const blogId = blogIdElement.getAttribute("blogid");
     const blogComment = document.querySelector('.blogComment').value;
     saveCommentFunction(blogId, blogComment, "homeComment");
};

// Function to save the comment in the database
async function saveCommentFunction(blogId, blogComment, commentType) {
     const response = await fetch('/comment', {
          method: 'POST',
          body: JSON.stringify({blogId, blogComment }),
          headers: { 'Content-Type': 'application/json' },
     }); 

     if (response.ok && commentType === "homeComment") {
          document.location.replace(`/blogcomments/${blogId}`);
     } else if (response.ok && commentType === "dashboardComment") { 
          document.location.replace('/dashboard');
     } else {
          alert('Blog Comment saved!');
     }
}

// Function to display the comment section in blog comment page
for (comment of homecommentbtn) {
     comment.addEventListener('click', async function (event) {
          //event.preventDefault();
          var itemElement = event.currentTarget.parentElement;
          const blogId = itemElement.getAttribute("blogid");

          if (blogId) {
               const response = await fetch(`/blogcomments/${blogId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
               });

               if (response.ok) {
                    document.location.replace(`/blogcomments/${blogId}`);
               } else {
                    document.location.replace('/login');
               }
          }
     });
}

// Function to display the blog post in blog page for editing
for (blog of dasheditbtn) {
     blog.addEventListener('click', async function (event) {
          var itemElement = event.currentTarget.parentElement;
          const targetId = itemElement.getAttribute("id");
          const response = await fetch(`/blog/${targetId}`, {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.replace(`/blog/${targetId}`);
          } 
     });
}
     


if (loginButton) {
     loginButton.addEventListener('click', loginFormHandler);
}

if (submitPostBtn) {
     submitPostBtn.addEventListener('click', saveBlogPostHandler);
}

if (signupbtn) {
     signupbtn.addEventListener('click', signUpFormHandler);
}

if (submitBlogCommentBtn) {
     submitBlogCommentBtn.addEventListener('click', commentHandler);
}

if (blogcommentbtn) {
     blogcommentbtn.addEventListener('click', commentBtnHandler);
}

if (cancelCommentBtn) {
     cancelCommentBtn.addEventListener('click', function (event) {
          var itemElement = event.currentTarget.parentElement;
          const blogId = itemElement.getAttribute("blogid");
          window.location.replace(`/blogcomments/${blogId}`);
     });
}

if (cancelPostBtn) {
     cancelPostBtn.addEventListener('click', function (event) {
          event.preventDefault();
          console.log(1234);
          window.location.replace('/dashboard');
      });
}

for(cancelBtn of cancelDashCommentBtn) {
     cancelBtn.addEventListener('click', function (event) {
          window.location.replace('/dashboard');
     });
}





