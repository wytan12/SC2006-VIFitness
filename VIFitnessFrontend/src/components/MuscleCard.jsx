import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ExerciseCard from './ExerciseCard';
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import APIDataService from "../services/APIDataService";
import { useState } from "react";
import ExerciseService from "../services/ExerciseService";
import { IndeterminateCheckBoxRounded } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 3,
  px: 3,
  pb: 3,
};

export default function MuscleCard({ img, title, description }) {
  const [workoutData, setWorkoutData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const musclecardhandleOpen = async () => {
    try {
      const response = await ExerciseService.queryWorkout(title);
      console.log(response.data);
      setWorkoutData(response.data);

    } catch (error) {
      console.log(error);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card sx={{ width: 200, height: 400 }} onClick={musclecardhandleOpen}>
        <CardActionArea>
          <CardMedia sx={{ maxWidth: 350, height: 350 }}
            component="img"
            image={img}
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div" className='text-center'>
              {title}
            </Typography>
            <Typography variant="h5" color="text.secondary" className='text-center'>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800, height: 650 }}>
          <Typography variant="h1" className="text-center">
            Exercises
          </Typography>
          <div className="flex-grow pb-8">
            <div className="grid grid-cols-3 grid-rows-2 gap-x-0 gap-y-8 overflow-y-auto">

              {workoutData.slice(0,6).map((item, index) => {
                return (
                  <div key={item.instructions}>
                    <div className="flex justify-center">
                      <ExerciseCard
                        img= {`/exerciseImage/${item.name}.jpg`} // Match name of image with title
                        title={item.name} // Use the item name as the title
                        description={item.difficulty} // Use the item difficulty
                        instruction={item.instructions} // Passing in the instruction
                        equipment={item.equipment} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}





