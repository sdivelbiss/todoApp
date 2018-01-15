function todoController(TodoService) {
    vm = this;
    vm.newTodo = '';
    vm.list = [];
    function getTodos(){
        TodoService
            .retrieve()
            .then(function(response){
                vm.list = response;
            })
    }
    vm.removeTodo = function(item, index){
        TodoService
            .remove(item)
            .then(function(response){
                vm.list.splice(index, 1);
            });
        
    }
    vm.getRemaining = function(){
        return vm.list.filter(item => !item.completed)
    }
    vm.addTodo = function(){
        if(!vm.newTodo){
            return
        }
        TodoService
            .create({
                title: vm.newTodo,
                completed: false
            })
            .then(function(response){
                vm.list.unshift(response);
                vm.newTodo = ''
            })
        
        
    }
    vm.updateTodo = function(item, index){
        if(!item.title){
            vm.removeTodo(item, index)
            return;
        }
        TodoService
            .update(item)
    }
    getTodos();
    vm.toggleState = function(item){
        TodoService
            .update(item)
            .then(function(response){

            }), function() {
                item.completed = !item.completed;
            }
    }
}

//todoController.$inject = ['$scope']

angular
    .module('app')
    .controller('todoController', todoController)