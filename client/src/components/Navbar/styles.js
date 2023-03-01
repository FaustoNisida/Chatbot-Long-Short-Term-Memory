import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },

  clearButton: {
    '@media (min-width: 768px)': {
      display: 'flex',
    },
    display: 'none',
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // paddingBottom: '2rem',
    // paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    backgroundColor: "#f2f2f2",
    color: "#333333",
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: "#BDBDBD",
      // color: "#ffffff"
    },
  },
  clearButtonMobile: {
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // color: "white",
    // paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    backgroundColor: "#f2f2f2",
    color: "#333333",
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {      
      backgroundColor: "#BDBDBD",
    },
  },
  logout: {
    '@media (min-width: 768px)': {
      display: 'flex',
    },
    display: 'none',
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // color: "white",
    // paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    // marginBottom: "",
    backgroundColor: '#e32929',
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: '#bd2424',
    },
  },
  logoutMobile: {
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // color: "white",
    // paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    // marginBottom: "",
    backgroundColor: '#e32929',
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: '#bd2424',
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '420px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
},
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));