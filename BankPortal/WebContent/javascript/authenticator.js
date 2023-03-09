/*global jwt */

// eslint-disable-next-line no-unused-vars
const Authenticator = function(serverModule){
  /* the server module */
  const server = serverModule;

  /* authentication for the currently logged in user */
  const authenticationToken = ko.observable();

  /* call back on successful login */
  let loginCallBack;

  /* model for user credentials */
  const credentials = {
    userName: ko.observable(),
    password: ko.observable(),
  };

  /* return the authentication token */
  const getAuthenticationToken = function(){
    return authenticationToken;
  };

  /* return true if user is authenticated, false otherwise */
  const isAuthenticated = ko.pureComputed(function(){
    return authenticationToken() != false;
  });

  const login = function(){
    const token  = server.login(credentials.userName(), credentials.password());
    authenticationToken(token);
    console.log('login ' + authenticationToken());
    loginCallBack();
  };

  /* method sets the call back */
  const setCallBack = function(callBack){
    loginCallBack = callBack;
  };

  /* initialize the module */
  const init = function(){
    const token = sessionStorage.getItem('token');
    if (token == null){
      authenticationToken(false);
    } else {
      authenticationToken(token);
    }
  }();
 

  return {
    credentials,
    isAuthenticated: isAuthenticated,
    getAuthenticationToken: getAuthenticationToken,
    setCallBack: setCallBack,
    login: login,
  };
};