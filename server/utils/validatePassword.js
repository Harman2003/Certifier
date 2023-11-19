const validatePassword = (pass) => {
   const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=]).{8,}$/;
    const isValidPassword = passwordRegex.test(pass);
    return isValidPassword;
}

module.exports = validatePassword;