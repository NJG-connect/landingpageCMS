const validateEmail = (mail: string) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

// Regex for return  Phone
const validatePhone = (phone: string) => {
  if (
    /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/.test(
      phone
    )
  ) {
    return true;
  }
  return false;
};

// Regex for return Email or Phone
const validePhoneOrEmail = (value?: string) => {
  if(!!value){
    if (validateEmail(value)) {
      return "Email";
    } else if (validatePhone(value)) {
      return "Tel";
    }
  }
  return false;
};

export { validateEmail, validatePhone, validePhoneOrEmail };
