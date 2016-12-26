// javascript code fetching from factory

mobius.controller('codeCtrl',[
    '$scope',
    'generateCode',
    function($scope,generateCode) {

        // generated javascript code
        $scope.javascriptCode = generateCode.getJavascriptCode();

        $scope.$watch(function () { return generateCode.getRawJSCode(); }, function (newValue, oldValue) {
            if(newValue !== oldValue){
                $scope.javascriptCode = generateCode.getJavascriptCode();
            }
        },true);
    }]);