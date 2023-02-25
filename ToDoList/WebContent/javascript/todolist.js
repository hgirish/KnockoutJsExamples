
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
    status: states.NEW,
  };

  const tasks = ko.observableArray();

  const addTask = function () {
    console.log(`adding task: name: ${task.name()}, description: ${task.description()}`);
    tasks.push({
      name: task.name(), description: task.description(),
      status: ko.observable(states.NEW)
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
  };
}();