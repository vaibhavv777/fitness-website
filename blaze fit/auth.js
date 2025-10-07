document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = signupForm.username.value.trim().toLowerCase();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;

      if (!username || !email || !password) {
        alert("Please fill out all fields.");
        return;
      }

      if (localStorage.getItem(`user_${username}`)) {
        alert("Username already exists. Please choose another.");
        return;
      }

      localStorage.setItem(`user_${username}`, JSON.stringify({email, password}));
      alert('Sign up successful! Please log in.');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = loginForm['login-username'].value.trim().toLowerCase();
      const password = loginForm['login-password'].value;

      const userData = localStorage.getItem(`user_${username}`);
      if (!userData) {
        alert('User not found. Please sign up first.');
        return;
      }

      const user = JSON.parse(userData);
      if (user.password === password) {
        alert('Login successful!');
        
        window.location.href = 'main2.html';
      } else {
        alert('Incorrect password.');
      }
    });
  }
});
// auth.js
if (user.password === password) {
  alert('Login successful!');
  localStorage.setItem('currentUser', username); // ✅ Save login state
  window.location.href = 'main2.html';
} else {
  alert('Incorrect password.');
}
