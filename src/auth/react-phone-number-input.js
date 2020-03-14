import React, { useState } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneInputs = () => {
  const [phoneNumber, setValue] = useState();
  console.log(phoneNumber);
  //   const demoMethod = () =>{
  //     this.props.sendData(phoneNumber);
  //  }
  return (
    <PhoneInput
      style={{ border: "1px dashed" }}
      id="phoneNumber"
      countrySelectProps={{ unicodeFlags: true }}
      defaultCountry={"PA"}
      value={phoneNumber}
      onChange={setValue}
    ></PhoneInput>
  );
};

export default PhoneInputs;
