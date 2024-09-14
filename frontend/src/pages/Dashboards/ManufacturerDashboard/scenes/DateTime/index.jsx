import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

const TimeCard = () => {
  const [time, setTime] = useState(new Date());
  const isMobile = useMediaQuery('(max-width:600px)');
  const isDayTime = time.getHours() > 6 && time.getHours() < 18;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDay = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  const period = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <Box
      sx={{
        width: isMobile ? 220 : 280,
        height: 150,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        color: 'white',
        padding: 2,
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontFamily: `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`,
          }}
        >
          {formattedTime}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginLeft: 1,
            fontSize: 15,
          }}
        >
          {period}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          marginLeft: 2,
          marginTop: 1,
          fontWeight: 500,
          fontSize: 18,
          fontFamily: `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`,
        }}
      >
        {formattedDay}
      </Typography>
    </Box>
  );
};

export default TimeCard;
