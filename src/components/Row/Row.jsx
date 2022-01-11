import React, { memo } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/ru";
import {
  selectContactById,
  selectStatusById,
  selectUserById,
} from "../../redux/dataSlice";
import { useSelector } from "react-redux";
import { Avatar, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CallIcon from "@mui/icons-material/Call";
import Divider from "@mui/material/Divider";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale("ru");

const useStyles = makeStyles(() => ({
  tableItem: {
    display: "flex",
    alignItems: "center",
  },

  tableItemAvatar: {
    marginRight: 5,
  },

  tableCollapse: {
    backgroundColor: "#e8e8e8",
    padding: 0,
  },

  tableCollapseBox: {
    margin: 0,
  },

  tableRowItem: {
    width: 1,
  },

  contact: {
    display: "flex",
    alignItems: "center"
  },

  callContact: {
    color: "green"
  },
}));

const Row = (props) => {
  const classes = useStyles();
  const { trade } = props;
  const [open, setOpen] = React.useState(false);
  const status = useSelector(
    selectStatusById({
      statusId: trade.status_id,
      pipelineId: trade.pipeline_id,
    })
  );
  const users = useSelector(selectUserById(trade.responsible_user_id));
  const contacts = useSelector(selectContactById(trade._embedded.contacts));

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {trade.name}
        </TableCell>
        <TableCell align="left">
          <Chip
            variant="outlined"
            size="small"
            label={status.name}
            style={{ background: status.color }}
          />
        </TableCell>
        <TableCell align="left">
          <Box className={classes.tableItem}>
            <Avatar src="" className={classes.tableItemAvatar} />
            <Box>{users.name}</Box>
          </Box>
        </TableCell>
        <TableCell align="left">
          {dayjs.unix(trade?.created_at).format("D MMMM YYYY")}
        </TableCell>
        <TableCell align="left">{trade.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={classes.tableCollapse}
          padding={"none"}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.tableCollapseBox}>
              <Table size="small">
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell
                        style={{ width: "20px", padding: 5 }}
                        component="th"
                        scope="row"
                      >
                        <Avatar src="" />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        <Box className={classes.contact}>
                          {contact.name}
                          <Divider
                              style={{ height: 18, margin: 5 }}
                              orientation="vertical"
                          />
                          <IconButton>
                            <CallIcon style={{width: 20}} className={classes.callContact} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default memo(Row);
