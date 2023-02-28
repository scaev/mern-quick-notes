import React, { Component } from "react";
import { signUp } from "../../utilities/users-service";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  //   handleSubmit = (evt) => {
  //       evt.preventDefault();
  //       // alert(JSON.stringify(this.state)); converts JS objectr to the JSON object.
  //       //use AJAX to send this.state to the server
  // }
  handleSubmit = async (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state)); converts JS object to the JSON object.
    //use AJAX to send this.state to the server
    const formData = { ...this.state };
    delete formData.error;
    delete formData.confirm;
    try {
      const user = await signUp(formData);
      this.props.setUser(user);
      // console.log(user);  //token
    } catch (e) {
      console.log(e);
      // An error occurred
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}

export default SignUpForm;