import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [list, setList] = useState(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const app = event.target.app.value;
    const createTask = {
      task: app,
      status: false,
    };
    if (!list.some((item) => item.task === app)) {
      const finalList = [...list, createTask];
      setList(finalList);
    } else {
      alert("TODO List already exists");
    }
    event.target.reset();
  };
  const deleteTask = (index) => {
    const FinalList = list.filter((item, i) => i !== index);
    setList(FinalList);
  };
  const completeTask = (index) => {
    const updatedList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return item;
      }
    });
    setList(updatedList);
  };
  const completedTask = () => {
    return list.filter((item) => item.status).length;
  };
  const totalTask = () => {
    return list.length;
  };
  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(list[index].task);
  };
  const saveTask = (index) => {
    const updatedList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          task: editText,
        };
      }
      return item;
    });

    setList(updatedList);
    setEditIndex(null);
    setEditText("");
  };
  return (
    <>
      <h1>ToDo APP</h1>
      <form onSubmit={handleSubmit}>
        <input name="app" type="text" placeholder="Enter your Task" />
        <button>Save</button>
      </form>
      <h1>
        CompletedTask : {completedTask()} / {totalTask()}
      </h1>
      <ul>
        {list.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              onChange={() => {
                completeTask(index);
              }}
              checked={item.status}
            />
            <h1 key={index} style={{ cursor: "pointer" }}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <button onClick={() => saveTask(index)}>Save</button>
                </>
              ) : (
                item.task
              )}
              <span
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                &times;
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing(index);
                }}
              >
                Edit Button
              </span>
            </h1>
          </div>
        ))}
      </ul>
    </>
  );
}
export default App;
