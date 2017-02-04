export function initializeUser() {
  const currentUser = window.firebase.auth().currentUser;
  return {
    type: 'INITIALIZE_USER',
    currentUser: currentUser
  };
}
