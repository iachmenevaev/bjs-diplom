"use strict"
    const userForm = new UserForm();
    userForm.loginFormCallback = (data) => ApiConnector.login(data, (response) => { 
        console.log(response);
    if (response.success === true){
        location.reload();
    } else if (response.success === false){
        userForm.setLoginErrorMessage(response.error);
     }});
   
   userForm.registerFormCallback = (data) => ApiConnector.register(data,(response) => { 
    console.log (response);
   if (response.success === true){
    location.reload();
} else if (response.success === false){
    userForm.setRegisterErrorMessage(response.error); }});


