const validator = require("validator");

const validateLogin = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;
  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.fusername = "Please provide your username.";
  }
  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }
};
