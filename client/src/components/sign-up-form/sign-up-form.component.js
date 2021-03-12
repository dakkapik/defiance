import React from 'react'

import './sign-up-form.styles.scss'

const SignUpForm = () => {
    const handleSubmit = event => {
        event.preventDefault();
        console.log("name", event.target.name.value)
        console.log("lastname", event.target.lastname.value)
        console.log("role", event.target.role.value)
        alert('You have submitted the form.')
    }

    return (
        <section className="form-container">
            <h1>This is some shitty form</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Name</p>
                        <input name="name" />
                    </label>
                    <label>
                        <p>Last name</p>
                        <input name="lastname" />
                    </label>
                    <label>
                        <p>Role</p>
                        <input name="role" />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default SignUpForm
