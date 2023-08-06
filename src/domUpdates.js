// --------- query selectors
const loginForm = document.querySelector('#loginForm')
const loginSection = document.querySelector('.login-section')

// --------- functions for event listeners
const login = (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  const currentUserId = /^traveler\d+$/;

  if (currentUserId.test(username) && password === 'travel') {
    loginSection.classList.add('hidden')
  }
}

export {
  loginForm,
  login
}