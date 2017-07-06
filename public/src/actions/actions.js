export const loginWithFacebook = () => {
  console.log('Entering loginWithFacebook action');
  return {
    type: 'LOGIN_FACEBOOK',
    payload: true
  };
};

export const loginWithGoogle = () => {
  console.log('Entering loginWithGoogle action');
  return {
    type: 'LOGIN_GOOGLE',
    payload: true
  };
};
