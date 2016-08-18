/**
 * Created by steffanennis on 18/08/2016.
 */
describe('date validation test',function(){
  var $compile;
  var $scope;
  var template;
  var moment;

  beforeEach(module('utils'));
  beforeEach(module('validators'));

  beforeEach(inject(function(_$compile_,$rootScope,_moment_){
    $compile = _$compile_;
    $scope = $rootScope.$new();
    moment = _moment_;
  }));

  it('Should be invalid',function(){
    $scope.beforeDate = new Date();
    $scope.testDate = new Date('12/12/2018');
    template = '<input type="date" ng-model="testDate" name="testField" before-date="beforeDate">';


    templateElement = $compile(template)($scope);
    $scope.$digest();

    var ngModelCtrl = templateElement.controller('ngModel');

    expect(ngModelCtrl.$error.beforeDate).toEqual(true);

  });

  it('Should be invalid',function(){
    $scope.afterDate = new Date('12/12/2018');
    $scope.testDate = new Date();
    template = '<input type="date" ng-model="testDate" name="testField" after-date="afterDate">';


    templateElement = $compile(template)($scope);
    $scope.$digest();

    var ngModelCtrl = templateElement.controller('ngModel');

    expect(ngModelCtrl.$error.afterDate).toEqual(true);

  })
});
