import React, { Component } from "react";

export default class test extends Component {
  constructor() {
    super();
    this.state = {
      employee: []
    };
  }
  componentDidMount() {
    fetch("http://dummy.restapiexample.com/api/v1/employees%22")
      .then(response => response.json())
      .then(data => {
        this.setState({
          employee: data
        });
      });
  }
  render() {
    let data = this.state.employee.map(employee => (
      <p key={employee.id}>{employee.employee.name}</p>
    ));
    return <div>{data}</div>;
  }
}
