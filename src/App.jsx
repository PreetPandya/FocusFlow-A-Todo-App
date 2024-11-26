import Headers from "./components/Headers";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Todo from "./components/Todo";
import ThemeSwiper from "./components/ThemeSwiper";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <ThemeSwiper />
      <SideBar />
      <Headers />
      <AddTodo />
      <Todo />
    </>
  );
}

export default App;
