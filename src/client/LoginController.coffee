angular
  .module 'app'
  .controller 'LoginController',
    [
      '$scope',
      '$http',
      '$window',
      '$cookies',
      'jwtHelper',
      ($scope, $http, $window, $cookies, jwtHelper) ->
        $scope.authFailed = false

        $scope.login = () ->
          $http.post '/authenticate',
            email: $scope.email
            password: $scope.password
          .success (data, status, headers, config) ->
            expDate = jwtHelper.getTokenExpirationDate data.token
            $cookies.put 'token', data.token, expires: expDate
            $window.location.href = '/game'
          .error (data, status, headers, config) ->
            $scope.authFailed = true

        return
    ]
