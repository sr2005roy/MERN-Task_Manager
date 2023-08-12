import TaskList from "./components/TaskList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// process.env.PORT
export const BURL=process.env.REACT_APP_Umiko

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
