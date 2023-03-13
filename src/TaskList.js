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
      };
    }
  
    handleCheck = (index) => {
      const tasks = [...this.state.tasks];
      tasks[index].isChecked = !tasks[index].isChecked;
      this.setState({ tasks }, () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      });
    };
  
    render() {
      return (
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
      );
    }
  }
  
  export default TaskList;