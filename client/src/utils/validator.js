module.exports = {
  pwValidator: password => {
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return regExp.test(password);
  },

  pwMatchValidator: (password, rePassword) => {
    if (password === '' || rePassword === '') return false;
    return password === rePassword;
  },

  nicknameValidator: nickname => {
    const regExp = /^[A-Za-z0-9_ㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/;
    return regExp.test(nickname);
  },
};
