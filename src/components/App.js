import react from 'react';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {palette} from '@material-ui/styles';
import {Container, AppBar, Typography, Grow, Box, TextField, Button, Card, CardContent, withStyles, Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios';
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'a8d796904a1166ecf1f5e434093514a8';


const useStyles = makeStyles({
  root: {
    background: '#2C3030',
    height: '100vh'
  },
  card: {
    height: '30vh',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({})

  const classes = useStyles();
  const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
      params: {
        q: query,
        units: 'metric',
        APPID: API_KEY
      }
    })

    return data;
  }

  const doSearch = async (text) => {
    const data = await fetchWeather(text);
    setWeather(data);
    console.log(data);
    setSearch('');
  }
  
  const enterSearch = (e) => {
    console.log(e);
    if (e.charCode === 13) {
      doSearch(search);
    }
  }
  return (
    <Container className={classes.root} maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center"> Aplicatie Meteo </Typography>
      </AppBar>
        <Grow in>
          <Box display="flex" bgcolor="warning.main" justifyContent="center" margin="normal">
            <TextField 
              id="outlined-basic" 
              placeholder="Introduceti locatia"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => enterSearch(e)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={() => doSearch(search)}
            >
              Cauta
            </Button>
          </Box>
        </Grow>
        <Grid
          container
          justify="center"
          alignItems="center"
          margin={5}
        >
       {weather.main && (
          <Box width={400}>
            <Card>
              <CardContent >
                <Typography
                  variant="h5"
                  component="h5"
                  color="primary"
                  display="block"
                >
                  <span>{weather.name}</span>
                  <sup>{weather.sys.country}</sup>
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                >
                  <span>{Math.floor(weather.main.temp)}</span>
                  <sup>&deg;C</sup>
                </Typography>
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <Typography component="p"> {weather.weather[0].description} </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Grid>
    </Container> 
  )
}

export default App;
