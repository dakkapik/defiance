import React from 'react'
import axios from 'axios'

import "./sign-in-form.styles.scss";

import SignInNumpad from "../sign-in-numpad/sign-in-numpad.component";

const SignInForm = () => {
  const handleSubmit = event => {
    event.preventDefault()
    const userid = event.target.userid.value
    if (!userid) {
      alert('You must enter your user id!')
      return
    }

    const instance = axios.create({
      baseURL: '/api/',
      headers: { 'signed-in': false }
    })

    instance.post(`/users/${userid}`)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          instance.defaults.headers = {
            'signed-in': true,
            'token': response.data.token
          }
        }
        // console.log(response)
        // console.log(instance.defaults.headers)
      })
      .catch(error => {
        console.log(error)
        alert('Sorry, there is no user with this id, try again')
      })
  };

  return (
    <section className="form-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>User id:</p>
            <input name="userid" id="userid" type="password" />
          </label>
          <SignInNumpad />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default SignInForm;
