angular
.module 'game'
.controller 'UserMenuController',
  [
    '$scope', '$window', '$cookies', 'jwtHelper'
    ($scope, $window, $cookies, jwtHelper) ->

      init = () ->
        token = $cookies.get 'token'
        payload = jwtHelper.decodeToken token
        $scope.username = payload.username

      $scope.logout = () ->
        $cookies.remove 'token'
        $window.location.href = '/'

      init()

      return
  ]
