
/* Modue for ToDo List application */
var ToDoList = function () {
  const states = {
    NEW: 'new',
    COMPLETE: 'complete'
  };

  /* Add members here */
  const task = {
    name: ko.observable(),
    description: ko.observable(),
    priority: ko.observable(),
  };

  const tasks = ko.observableArray();

  const addTask = function () {
    console.log(`adding task: name: ${task.name()}, description: ${task.description()}`);
    tasks.push({
      name: task.name(),
      description: task.description(),
      priority: task.priority(),
      status: ko.observable(states.NEW),
    });
    clearTask();
  };

  const deleteTask = function (task) {
    console.log(`Deleting task with name: ${task.name}`);
    tasks.remove(task);
  };

  const completeTask = function (task) {
    console.log(task);
    console.log(`Completing task with name: ${task.name}`);
    task.status(states.COMPLETE);
  };

  const clearTask = function () {
    task.name(null);
    task.description(null);
    task.priority('1');
  };

  const sortByPriority = function () {
    console.log('Sorting task by priority');
    tasks.sort(
      function (left, right) {
        return left.priorityy == right.priority ?
          0 :
          (left.priority < right.priority ? -1 : 1);
      }
    );
  };

  const sortByName = function () {
    console.log('Sorting task by name');
    tasks.sort(
      function (left, right) {
        return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
      }
    );
  };

  const init = function () {
    /* add code to initialize this module */
    ko.applyBindings(ToDoList);
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    /* add members that will be exposed publicly */
    task: task,
    tasks: tasks,
    addTask: addTask,
    deleteTask: deleteTask,
    completeTask: completeTask,
    states: states,
    sortByPriority: sortByPriority,
    sortByName: sortByName,
  };
}();