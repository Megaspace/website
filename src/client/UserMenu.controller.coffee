angular
.module 'app'
.controller 'UserMenuController',
  [
    '$scope', '$window', '$cookies',
    ($scope, $window, $cookies) ->

      $scope.logout = () ->
        $cookies.remove 'token'
        $window.location.href = '/'

      return
  ]
