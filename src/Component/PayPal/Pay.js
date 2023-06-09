import { Details } from "@mui/icons-material";
import React from "react";
import {PayPalButton} from "react-paypal-button-v2"
import { useEffect } from "react";

function Pay() {
  const [inputValue, setInputValue] = React.useState("");
  const onChangeHandler = event => {
    setInputValue(event.target.value);
    console.log(inputValue);
 };
 useEffect(() => {
}, [inputValue]);
  return (
    <>
         <input
   type="number"
   style={{width: "250px" ,textAlign:"center",margin: "auto"}}

   name="name"
   placeholder="הסכום לתשלום"
   onChange={onChangeHandler}
   value={inputValue}
/>
<br></br>
    <PayPalButton
      currency="ILS"
      amount={inputValue}
      options={{
        clientId:"AS54c_VkxsRyJgVhF5fww5XunN9WQot49_3M8t4gQAx14REug8It_3RispzY1cz-dm0Shs06i-hvCFvv"
      }}
      onSuccess={(details,data)=>{
        console.log(data);
      }}
      onError={(err)=>{
        console.log(err);
        alert("The Payment is cancel")
      }}
    />
    </>
  )
}

export default Pay