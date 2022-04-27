import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SelectButton } from '../components/Button';

function PlantDetail() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  });

  return <></>;
}
export default PlantDetail;
