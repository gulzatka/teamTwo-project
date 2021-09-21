import "./index.html";
import "./main.css";

import _ from "lodash";

import {
  store,
  check,
  enableButton,
  displayPassword,
  hidePassword,
} from "./utils";
// userName and password fields

// TODO: refactor code to prevent repeating myself
// register button and register field
const userName = document.getElementById("userName");
const password = document.getElementById("password");

const registerButton = document.getElementById("rgstr_btn");

userName.addEventListener("change", enableRegisterButton);
password.addEventListener("change", enableRegisterButton);

function enableRegisterButton() {
  enableButton(registerButton, userName.value, password.value);
}

// login button and login field
const logInUserName = document.getElementById("logInName");
const logInPassword = document.getElementById("logInPassword");

const loginButton = document.getElementById("login_btn");

logInUserName.addEventListener("change", enableLogInButton);
logInPassword.addEventListener("change", enableLogInButton);

function enableLogInButton() {
  enableButton(loginButton, logInUserName.value, logInPassword.value);
}

// logic for accessing local storage
registerButton.addEventListener("click", store);
loginButton.addEventListener("click", check);

const iconBtn = document.querySelector(".icon");

iconBtn.addEventListener("mousedown", displayPassword);
iconBtn.addEventListener("mouseup", hidePassword);
