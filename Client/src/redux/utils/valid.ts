export interface IErr extends Object {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  cfPassword: string;
}

const valid = (data: IErr) => {
  const { fullName, userName, email, password, cfPassword } = data;
  const err: IErr | any = {};

  function validateEmail(mail: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  if (!fullName) {
    err.fullName = 'Please add your full name.';
  } else if (fullName.length > 25) {
    err.fullName = 'Full name is up to 25 characters long.';
  }

  if (!userName) {
    err.userName = 'Please add your user name.';
  } else if (userName.replace(/ /g, '').length > 25) {
    err.userName = 'User name is up to 25 characters long.';
  }

  if (!email) {
    err.email = 'Please add your email.';
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect.';
  }

  if (!password) {
    err.password = 'Please add your password.';
  } else if (password.length < 6) {
    err.password = 'Password must be at least 6 characters.';
  }

  if (password !== cfPassword) {
    err.cfPassword = 'Confirm password did not match.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export default valid;
