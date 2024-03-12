var logoutButton = document.querySelector('#logoutlink');

const logoutHandler = async () => {
     const response = await fetch('/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
     });

     if (response.ok) {
          document.location.replace('/');
     } else {
          alert('Failed to log out.');
     }
};

logoutButton.addEventListener('click', logoutHandler);