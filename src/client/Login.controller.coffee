angular
  .module 'app'
  .controller 'LoginController',
    [
      '$scope', '$http', '$window', '$cookies', 'jwtHelper',
      ($scope, $http, $window, $cookies, jwtHelper) ->

        $scope.authFailed = false
        $scope.serverOffline = false

        $scope.login = () ->
          $scope.authFailed = false
          $scope.serverOffline = false
          
          $http.post '/authenticate',
            email: $scope.email
            password: $scope.password
          .success (data, status, headers, config) ->
            expDate = jwtHelper.getTokenExpirationDate data.token
            $cookies.put 'token', data.token, expires: expDate
            $window.location.href = '/game'
          .error (data, status, headers, config) ->
            $scope.authFailed = true if status is 401
            $scope.serverOffline = true if status is 502

        return
    ]
