import { Box } from '@mui/material';
import ResponsiveCard from '../componnets/cards';

function Cards() {
  return (
    <Box sx={{ width: 400, height: 300 }}>
      <ResponsiveCard 
        imageUrl="your-image-url.jpg"
        onClick={() => console.log('Card clicked!')}
      />
    </Box>
  );
}

export default Cards