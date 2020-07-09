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
  submitHandler = (e) => {
    e.preventDefault();
    let formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      birthDate: this.state.birthDate,
    }
    this.props.data(formData);

    e.target.reset();
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
      <label>First name
      <input
        type='text'
        name='firstName'
        onChange={this.changeHandler}
      />
      </label>
       <label>Last name
      <input
        type='text'
        name='lastName'
        onChange={this.changeHandler}
      />
      </label>
       <label>Password
      <input
        type='password'
        name='password'
        onChange={this.changeHandler}
      />
      </label>
      <label>Phone Number
      <input
        type='text'
        name='phoneNumber'
        onChange={this.changeHandler}
      />
      </label>
      <label>Email
      <input
        type='email'
        name='email'
        onChange={this.changeHandler}
      />
      </label>
       <label>Date of Birth
      <input
        type='date'
        name='birthDate'
        onChange={this.changeHandler}
      />
      </label>
      <button type='submit'>
      Register!
      </button>
      </form>
    );
  }
}
