import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  let errMessage = '';
  const [state, setState] = useState('');

const handleChange = e =>{
  setState(e.target.value)
}

  const registerUser = async (event) => {
    event.preventDefault();
    const res = await fetch(
      "https://staging.api.admin.plentywaka.com/api/v1/isp/partners/create",
      {
        body: JSON.stringify({
          company_name: event.target.companyNname.value,
          company_email: event.target.email.value,
          company_phone: event.target.phone.value,
          residential_address: event.target.address.value,
          has_existing_system: state,
          name: event.target.name.value,
          password: event.target.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
      
    );

    const result = await res.json();
    // result.user => 'Ada Lovelace'
      errMessage = result.message;
     alert(errMessage);
    
  };

  return (
    <div className={styles.container}>

     <p>{ errMessage }</p>
      <form onSubmit={registerUser}>
        <label htmlFor="company_name">Name</label>
        <input id="companyNname" name="companyNname" type="text" autoComplete="companyNname"  />
        <br />
        <label htmlFor="company_email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          autoComplete="email"
          
        />
        <br />
        <label htmlFor="company_phone">phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          autoComplete="phone"
          
        />

        <br />
        <label htmlFor="residential_address">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="address"
          
        />
         <br />
        <label htmlFor="name">Admin Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          
        />

        <br />
        <label htmlFor="has_existing_system">Has Existing System</label>
        <select
        onChange={handleChange}
        value={state}
        >
          <option disabled selected>Select an option</option>
           <option value='1'>Yes</option>
            <option value='0'>No</option>
        </select>

<br />
        <label htmlFor="password">Passsword</label>
        <input
          id="password"
          name="password"
          type="text"
          autoComplete="password"
          
        />

       <br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
