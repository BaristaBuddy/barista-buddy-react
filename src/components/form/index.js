class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password:'',
      age: null,
      phonenumber: null,
      birthday:'',
    };
  }
  SubmitHandler = (event) => {
    event.preventDefault();
    let age = this.state.age;
    if (!Number(age)) {
      alert("Your age must be a number");
    }
  }
  ChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form onSubmit={this.SubmitHandler}>
      <h1>Sign-up for BaristaBuddy!</h1>
      <p>Enter your First name:</p>
      <input
        type='text'
        name='firstname'
        onChange={this.ChangeHandler}
      />
       <p>Enter Last name:</p>
      <input
        type='text'
        name='lastname'
        onChange={this.ChangeHandler}
      />
       <p>Enter your Username:</p>
      <input
        type='text'
        name='username'
        onChange={this.ChangeHandler}
      />
       <p>Enter your password:</p>
      <input
        type='text'
        name='password'
        onChange={this.ChangeHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.ChangeHandler}
      />
      <p>Enter your Phone Number:</p>
      <input
        type='text'
        name='phonenumber'
        onChange={this.ChangeHandler}
      />
       <p>Enter your Birthday:</p>
      <input
        type='text'
        name='birthday'
        onChange={this.ChangeHandler}
      />
      <br/>
      <br/>
      <input type='submit' />
      </form>
    );
  }
}

ReactDOM.render(<SignUpForm />, document.getElementById('root'));