import React from 'react';
import Directories from "../directories";
import {AppBar, Box, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  title: {
    color: "#fff"
  },
  appBar: {
    marginBottom: "20px"
  },
  container: {
    paddingLeft: "20px"
  },
  link: {
    paddingLeft: "60px"
  },
});

function App() {

  const classes = useStyles();

  return (
    <Box>
      <CssBaseline />
      {/* <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Digital Habits. Entrance test
          </Typography>
          <Typography variant="h5">
            <Link color={"secondary"} href={"https://github.com/ivanovmain/directories-tree"} className={classes.link}>
              Github - Ivanov
            </Link>
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box className={classes.container}>
        <Directories />
      </Box>

    </Box>
  );
}

export default App;
