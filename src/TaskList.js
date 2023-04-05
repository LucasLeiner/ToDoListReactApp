import React from 'react';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    this.state = {
      tasks: tasksFromStorage || [
        { title: "1.Idée", isChecked: true },
        { title: "2.Marché", isChecked: true },
      ],
      newTaskTitle: "",
      searchText: "",
    };
  }

  handleCheck = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].isChecked = !tasks[index].isChecked;
    this.setState({ tasks }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  };

  handleTitleChange = (event) => {
    this.setState({ newTaskTitle: event.target.value });
  };

  handleSearch = (event) => {
    this.setState({ searchText: event.target.value });
  };

  handleAddTask = () => {
    const tasks = [...this.state.tasks];
    tasks.push({ title: this.state.newTaskTitle, isChecked: false });
    this.setState({ tasks, newTaskTitle: "" }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  };

  handleMoveUp = (index) => {
    const tasks = [...this.state.tasks];
    if (index > 0) {
      const tmp = tasks[index - 1];
      tasks[index - 1] = tasks[index];
      tasks[index] = tmp;
      this.setState({ tasks }, () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      });
    }
  };

  handleMoveDown = (index) => {
    const tasks = [...this.state.tasks];
    if (index < tasks.length - 1) {
      const tmp = tasks[index + 1];
      tasks[index + 1] = tasks[index];
      tasks[index] = tmp;
      this.setState({ tasks }, () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      });
    }
  };

  handleDeleteTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({ tasks }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  };

  render() {
    const filteredTasks = this.state.tasks.filter(task =>
      task.title.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleSearch}
            placeholder="Search tasks"
            className='rounded-lg p-2 mb-3'
          />
        </div>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={() => this.handleCheck(index)}
                  />
                  {task.title}
                </label>
                {index !== 0 && (
                  <button onClick={() => this.handleMoveUp(index)}>▲</button>
                )}
                {index !== this.state.tasks.length - 1 && (
                  <button onClick={() => this.handleMoveDown(index)}>▼</button>
                )}
                <button onClick={() => this.handleDeleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <footer className="flex flex-row justify-center mb-0">
          <textarea
            className="border-2 border-black m-10"
            value={this.state.newTaskTitle}
            onChange={this.handleTitleChange}
          />
          <button onClick={this.handleAddTask} className="border-2 border-black p-2 mt-10 mb-10 mr-10">
            Add task
          </button>
        </footer>
      </div>
    );
  }  
}
export default TaskList;