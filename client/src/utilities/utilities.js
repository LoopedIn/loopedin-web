const validateLoginCredentials = (userName, password) => {
  if (userName === undefined || userName.length === 0 || password.length < 8) {
    return false;
  }

  return true;
};
