import { useState } from "react";
import "./App.css";
function App() {
  const [list, setList] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const app = event.target.app.value;
    if (!list.includes(app)) {
      const finalList = [...list, app];
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
  return (
    <>
      <h1>ToDo APP</h1>
      <form onSubmit={handleSubmit}>
        <input name="app" type="text" placeholder="Enter your Task" />
        <button>Save</button>
      </form>
      <ul>
        {list.map((item, index) => (
          <h1 key={index}>
            {item}{" "}
            <span
              style={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={() => {
                deleteTask(index);
              }}
            >
              &times;
            </span>
          </h1>
        ))}
      </ul>
    </>
  );
}
export default App;
