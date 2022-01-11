import "./App.css";
import ContentTable from "../Table/ContentTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../redux/dataSlice";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="App">
      <ContentTable />
    </div>
  );
};

export default App;
