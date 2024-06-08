import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Rating } from '@mui/material';
import { styled } from '@mui/system';

const CardWrapper = styled(Card)({
  maxWidth: 345,
  margin: '20px',
});

const Media = styled(CardMedia)({
  height: 140,
});

const restaurants = [
  { id: 1, name: 'Restaurant A', image: './src/assets/restaurantA.jpg', rating: 4.5 },
  { id: 2, name: 'Restaurant B', image: './src/assets/restaurantB.jpg', rating: 4.0 },
  { id: 3, name: 'Restaurant C', image: './src/assets/restaurantC.jpg', rating: 3.5 },
  { id: 4, name: 'Restaurant D', image: './src/assets/restaurantD.jpg', rating: 5.0 },
  { id: 5, name: 'Restaurant E', image: './src/assets/restaurantE.jpg', rating: 4.2 },
  { id: 6, name: 'Restaurant F', image: './src/assets/restaurantF.jpg', rating: 3.8 },
  { id: 7, name: 'Restaurant G', image: './src/assets/restaurantG.jpg', rating: 4.7 },
  { id: 8, name: 'Restaurant H', image: './src/assets/restaurantH.jpg', rating: 4.1 },
  { id: 9, name: 'Restaurant I', image: './src/assets/restaurantI.jpg', rating: 4.4 },
  { id: 10, name: 'Restaurant J', image: './src/assets/restaurantJ.jpg', rating: 3.9 },
];

const RestaurantsPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Choisissez un restaurant
      </Typography>
      <Grid container justifyContent="center">
        {restaurants.map((restaurant) => (
          <CardWrapper key={restaurant.id}>
            <CardActionArea component={Link} to={`/restaurant/${restaurant.id}`}>
              <Media image={restaurant.image} title={restaurant.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {restaurant.name}
                </Typography>
                <Rating value={restaurant.rating} readOnly />
              </CardContent>
            </CardActionArea>
          </CardWrapper>
        ))}
      </Grid>
    </div>
  );
};

export default RestaurantsPage;
