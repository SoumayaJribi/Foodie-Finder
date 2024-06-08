import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

type FoodPreferenceFormValues = {
  tastePreference: "salé" | "sucré";
  favoriteDish: string;
  diet: "végétarien(ne)" | "vegan" | "Pescétarien" | "none";
  hasAllergies: "oui" | "non";
  allergies: string;
  favoriteCuisine: string;
  avoidedFoods: string;
};

const FoodPreferenceForm: React.FC = () => {
  const { handleSubmit, control, watch } = useForm<FoodPreferenceFormValues>();
  const hasAllergies = watch("hasAllergies", "non");

  const onSubmit = (data: FoodPreferenceFormValues) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Préférences Alimentaires
      </Typography>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">
          Préférez-vous les plats salés ou sucrés ?
        </FormLabel>
        <Controller
          name="tastePreference"
          control={control}
          defaultValue="salé"
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="salé" control={<Radio />} label="Salé" />
              <FormControlLabel
                value="sucré"
                control={<Radio />}
                label="Sucré"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Quel est votre plat préféré ?</FormLabel>
        <Controller
          name="favoriteDish"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} variant="outlined" />}
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">
          Avez-vous des préférences spécifiques concernant les types de repas ?
        </FormLabel>
        <Controller
          name="diet"
          control={control}
          defaultValue="none"
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value="végétarien(ne)"
                control={<Radio />}
                label="Végétarien(ne)"
              />
              <FormControlLabel
                value="vegan"
                control={<Radio />}
                label="Vegan"
              />
              <FormControlLabel
                value="Pescétarien"
                control={<Radio />}
                label="Pescétarien"
              />
              <FormControlLabel
                value="none"
                control={<Radio />}
                label="Aucun"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">
          Souffrez-vous d'allergies alimentaires ?
        </FormLabel>
        <Controller
          name="hasAllergies"
          control={control}
          defaultValue="non"
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="oui" control={<Radio />} label="Oui" />
              <FormControlLabel value="non" control={<Radio />} label="Non" />
            </RadioGroup>
          )}
        />
      </FormControl>

      {hasAllergies === "oui" && (
        <FormControl fullWidth margin="normal">
          <FormLabel>Veuillez préciser vos allergies :</FormLabel>
          <Controller
            name="allergies"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} variant="outlined" />}
          />
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormLabel>
          Quelle est votre cuisine préférée (italienne, chinoise, mexicaine,
          etc.) ?
        </FormLabel>
        <Controller
          name="favoriteCuisine"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} variant="outlined" />}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>
          Y a-t-il des aliments que vous évitez de manger pour des raisons de
          santé ?
        </FormLabel>
        <Controller
          name="avoidedFoods"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} variant="outlined" />}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Soumettre
      </Button>
    </Box>
  );
};

export default FoodPreferenceForm;
