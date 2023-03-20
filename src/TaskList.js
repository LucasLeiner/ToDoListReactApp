import React from 'react';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    this.state = {
      tasks: tasksFromStorage || [
        { title: "1.Idée", isChecked: true },
        { title: "2.Marché", isChecked: true },
        { title: "3.Wireframe", isChecked: true },
        { title: "4.Design", isChecked: true },
        { title: "5.Landingpage", isChecked: true },
        { title: "6.Développement", isChecked: false },
        { title: "7.Publish", isChecked: false },
        { title: "8.Pub", isChecked: false },
        { title: "9.Feedback", isChecked: false },
      ],
      newTaskTitle: "",
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

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => this.handleCheck(index)}
                />
                {task.title}
              </label>
            </li>
          ))}
        </ul>
        <footer className="flex flex-row justify-center mb-0">
          <textarea className="border-2 border-black"
            value={this.state.newTaskTitle}
            onChange={this.handleTitleChange}
          />
          <button onClick={this.handleAddTask} className="border-2 border-black p-2 m-2">Add task</button>
        </footer>
      </div>
    );
  }
}
export default TaskList;