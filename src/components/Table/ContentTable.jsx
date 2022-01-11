import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "../Row/Row";
import { useSelector } from "react-redux";
import { selectData, selectLoading } from "../../redux/dataSlice";
import SearchInput from "../Search/Search";
import Box from "@mui/material/Box";
import { Chip, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  table: {
    margin: 90,
    padding: 50,
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
  },
}));

const headItems = [
  "Инфо",
  "Название",
  "Статус",
  "Ответственный",
  "Дата создания",
  "Бюджет",
];

const ContentTable = () => {
  const classes = useStyles();
  const trade = useSelector(selectData);
  const loading = useSelector(selectLoading);

  return (
    <Paper className={classes.table} elevation={9}>
      <Box className={classes.tableHeader}>
        <Chip label="Пример тестового задания" />
        <SearchInput />
      </Box>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {headItems.map((item) => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                {headItems.map((item)=>
                  <TableCell key={item}>
                    <Box>
                      <Skeleton height={40} animation="wave" />
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ) : (
              trade?.trades?.map((item) => <Row key={item.id} trade={item} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ContentTable;
