import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/dataSlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  search: {
    display: "flex",
    alignItems: "center",
    width: 360,
    maxHeight: 30,
    borderRadius: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  }
}));

const SearchInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleClick = () => {
    dispatch(fetchData(value));
    setValue("");
  };
  return (
    <Paper className={classes.search}>
      <InputBase
        className={classes.searchInput}
        placeholder="Поиск"
        onChange={(e) => setValue(e.target.value)}
      />
      <Divider
        style={{ height: 18, margin: 1 }}
        orientation="vertical"
      />
      <IconButton
        style={{ width: 50, height: 30, borderRadius: 5 }}
        aria-label="search"
        onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
