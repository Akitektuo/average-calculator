import React, { Component } from 'react';
import './App.css';

class App extends Component {

  validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  inputGrades = React.createRef();
  inputSemestrial = React.createRef();
  result = React.createRef();

  componentWillMount() {
    this.setState({
      result: "The result is 0"
    });
  }

  render() {
    return (
      <div className="app">
        <div>
          <input ref={this.inputGrades} className="grades" inputmode="numeric" type="text" pattern="[0-9]*" placeholder="Grades (Ex: 10 8 9)" name="Grades" onChange={this.onGradesEdit} onPaste={this.preventPaste}/>
        </div>
        <div className="extra-functions">
          <div className="semestrial-grade">
            <div className="semestrial">Semestrial grade:</div>
            <input ref={this.inputSemestrial} className="semestrial" inputmode="numeric" type="text" pattern="[0-9]*" name="Semestrial grade" onChange={this.onSemestrialEdit} onPaste={this.preventPaste} placeholder="0"/>
          </div>
          <div className="clear-button ripple" onClick={this.clear}>Clear</div>
        </div>
        <div className="result" ref={this.result}>{this.state.result}</div>
      </div>
    );
  }

  onGradesEdit = () => {
    const input = this.inputGrades.current;
    if (input.value.length < 1) {
      this.computeAverage();
      return;
    }
    if (this.isValid(input.value)) {
      if (this.getLastChar(input.value) === '0' && !this.is1Before0(input.value)) {
        input.value = this.cutLastChar(input.value);
        return;
      }
      input.value = this.insertSpace(input.value);
      this.computeAverage();
      return;
    }
    input.value = this.cutLastChar(input.value);
  }

  onSemestrialEdit = () => {
    const input = this.inputSemestrial.current;
    if (input.value.length < 1) {
      this.computeAverage();
      return;
    }
    if (this.is1Before0(input.value)) {
      this.computeAverage();
      return;
    }
    if (this.getLastChar(input.value) === '0') {
      input.value = '';
      this.computeAverage();
      return;
    }
    if (this.isValid(input.value)) {
      input.value = this.getLastChar(input.value);
      this.computeAverage();
      return;
    }
    input.value = this.cutLastChar(input.value);
  }

  clear = () => {
    this.inputGrades.current.value = '';
    this.inputSemestrial.current.value = '';
    this.computeAverage();
  }

  setResult = (val) => {
    this.setState({
      result: `The result is ${Math.floor(val * 1000) / 1000}`
    });
  }

  preventPaste = (event) => {
    event.preventDefault();
  }

  getLastChar = (str) => {
    if (str.length < 1) {
      return "";
    }
    return str[str.length - 1];
  }

  cutLastChar = (str) => {
    if (str.length < 1) {
      return "";
    }
    return str.substring(0, str.length - 1);
  }

  is1Before0 = (str) => {
    if (str.length < 2) {
      return false;
    }
    return str[str.length - 2] === '1' && str[str.length - 1] === '0';
  }

  isSpace = (str) => {
    if (str.length < 2) {
      return false;
    }
    return str[str.length - 2] === ' ';
  }

  insertSpace = (str) => {
    if (str.length < 2) {
      return str;
    }
    if (this.is1Before0(str)) {
      return str;
    }
    if (this.isSpace(str)) {
      return str;
    }
    return `${str.substring(0, str.length - 1)} ${this.getLastChar(str)}`;
  }

  isValid = (str) => {
    return this.validKeys.includes(this.getLastChar(str));
  }

  computeAverage = () => {
    const grades = this.inputGrades.current.value.split(' ').map(Number);
    const semestrial = parseInt(this.inputSemestrial.current.value);
    if (grades.length < 1 || grades[0] === 0) {
      this.setResult(0);
      return;
    }
    let sum = 0;
    grades.forEach((grade) => {
      sum += grade;
    })
    sum /= grades.length;
    if (isNaN(semestrial)) {
      this.setResult(sum);
      return;
    }
    this.setResult((sum * 3 + semestrial) / 4);
  }

}

export default App;
