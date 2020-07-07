import React from 'react';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: '',
      email: '',
      birthDate: new Date(1970, 0, 1, 9, 30),
    };
  }
  submitHandler = (event) => {
    event.preventDefault();
  }
  
  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
      <h1>Sign up for Barista Buddy!</h1>
      <p>First name:</p>
      <input
        type='text'
        name='firstName'
        onChange={this.changeHandler}
      />
       <p>Last name:</p>
      <input
        type='text'
        name='lastName'
        onChange={this.changeHandler}
      />
       <p>Enter your password:</p>
      <input
        type='password'
        name='password'
        onChange={this.changeHandler}
      />
      <p>Phone Number:</p>
      <input
        type='text'
        name='phoneNumber'
        onChange={this.changeHandler}
      />
      <p>Email:</p>
      <input
        type='email'
        name='email'
        onChange={this.changeHandler}
      />
       <p>Birthdate:</p>
      <input
        type='date'
        name='birthDate'
        onChange={this.changeHandler}
      />
      <button type='submit'>
      Register!
      </button>
      </form>
    );
  }
}
