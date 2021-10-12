import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleCreateNewTask() {
    if (newTaskTitle.length) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          isComplete: false,
          title: newTaskTitle,
        },
      ]);
      setHasError(false);
      setNewTaskTitle("");
    } else {
      setHasError(true);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const temp = [...tasks];
    temp[temp.findIndex((task) => task.id === id)].isComplete =
      !temp[temp.findIndex((task) => task.id === id)].isComplete;
    setTasks(temp);
  }

  function handleRemoveTask(id: number) {
    const temp = [...tasks];
    temp.splice(
      temp.findIndex((task) => task.id === id),
      1
    );
    setTasks(temp);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <div>
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            {hasError && <p>Titulo é obrigatório</p>}
          </div>
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
