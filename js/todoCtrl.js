app.controller('TodoCtrl', ['$scope', 'ds', function TodoCtrl($scope, ds) {
  const record = ds.record.getRecord('todos')
  $scope.todos = {
    markAll: false,
    todosList: []
  }
  $scope.ready = false

  record.whenReady((record) => {
    $scope.ready = true
    var init = record.get()
    if (!angular.equals(init, {})) {
      angular.copy(init, $scope.todos)
      setTimeout(function () {
        $scope.$apply()
      }, 1)
    }

    record.subscribe(function (data) {
      angular.copy(data, $scope.todos)
      setTimeout(function () {
        $scope.$apply()
      }, 1)
    })
  })

  $scope.updateRecord = function (rec) {
    $scope.todos.todosList = $scope.todos.todosList.map(function (e) {
      if (e.$$hashKey === rec.$$hashKey) {
        return rec
      }
      return e
    })

    record.set($scope.todos)
  }

  $scope.addTodo = function (event) {
    if (event.keyCode === 13 && $scope.todoText) {
      $scope.todos.todosList.push({text: $scope.todoText, done: false})
      record.set($scope.todos)
      $scope.todoText = ''
    }
  }

  $scope.markOne = function (todo) {
    $scope.updateRecord(todo)
  }

  $scope.remaining = function () {
    var count = 0
    $scope.todos.todosList.forEach(function (todo) {
      count += todo.done ? 0 : 1
    })
    return count
  }

  $scope.hasDone = function () {
    return ($scope.todos.todosList.length !== $scope.remaining())
  }

  $scope.itemText = function () {
    return ($scope.todos.todosList.length - $scope.remaining() > 1) ? 'items' : 'item'
  }

  $scope.toggleMarkAll = function () {
    $scope.todos.todosList = $scope.todos.todosList.map(function (e) {
      e.done = $scope.todos.markAll
      return e
    })

    record.set($scope.todos)
  }

  $scope.clear = function () {
    $scope.todos.todosList = $scope.todos.todosList.reduce(function (acc, val) {
      if (!val.done) {
        acc.push(val)
      }
      return acc
    }, [])
    $scope.todos.markAll = false

    record.set($scope.todos)
  }
}])
