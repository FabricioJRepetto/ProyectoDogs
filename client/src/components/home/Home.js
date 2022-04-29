import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { loadDogs, loadTemps, loadFiltered, loaded } from '../../slice-reducer/dogsSlice';
import { API_DOGS, API_TEMPS } from '../../constants';

import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';

const Home = () => {  
  const dogs = useSelector(state => state.dogs.main);
  const firstLoad = useSelector(state => state.dogs.firstLoad);
  const filtered = useSelector(state => state.dogs.filtered);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      let { data } = await axios.get(API_DOGS);
      let { data: temps } = await axios.get('http://localhost:3001/temperaments/');      
      dispatch(loadDogs(data))
      dispatch(loadFiltered(data))
      dispatch(loadTemps(temps))
      dispatch(loaded())
    };
    if (firstLoad) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])  

  return(
    <>
      <Filters />
      {dogs < 1 ? <p>/ LOADING . . . /</p> :
      <>
        <CardContainer />
        <Pages />   
      </>   
      }
    </>
  );
};

export default Home;