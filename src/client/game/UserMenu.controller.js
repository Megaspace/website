/* global angular */

angular
.module('game')
.controller('UserMenuController',
  [
    '$scope', '$window', '$cookies', 'jwtHelper',
    ($scope, $window, $cookies, jwtHelper) => {
      const init = () => {
        const token = $cookies.get('token')
        const payload = jwtHelper.decodeToken(token)
        $scope.username = payload.username
      }

      $scope.logout = () => {
        $cookies.remove('token')
        $window.location.href = '/'
      }

      init()
    }
  ]
)
