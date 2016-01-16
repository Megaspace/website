/* global angular toastr */

angular
.module('login')
.controller('LoginController',
  [
    '$scope', '$http', '$window', '$cookies', 'jwtHelper',
    ($scope, $http, $window, $cookies, jwtHelper) => {
      $scope.loginFailed = false

      $scope.login = () => {
        $scope.loginFailed = false

        $http.post('/authenticate', {
          email: $scope.email,
          password: $scope.password
        })
        .success((data, status, headers, config) => {
          const expDate = jwtHelper.getTokenExpirationDate(data.token)
          $cookies.put('token', data.token, {expires: expDate})
          $window.location.href = '/game'
        })
        .error((data, status, headers, config) => {
          $scope.loginFailed = true
          if (status === 401) toastr.error('Invalid username or password', 'Authentication failed')
          if (status === 502) toastr.error('Login server offline, try again later', 'Authentication failed')
        })
      }
    }
  ]
)
