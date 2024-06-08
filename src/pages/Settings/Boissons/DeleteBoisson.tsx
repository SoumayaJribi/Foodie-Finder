import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteBoissonProps {
  id: number;
  closeEvent: () => void;
  deleteEvent: (id: number) => void;
}

const DeleteBoisson: React.FC<DeleteBoissonProps> = ({
  id,
  closeEvent,
  deleteEvent,
}) => {
  const handleDelete = () => {
    deleteEvent(id);
    closeEvent();
  };

  return (
    <Modal
      open={true}
      onClose={closeEvent}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirmation de suppression
        </Typography>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Êtes-vous sûr de vouloir supprimer cet élément ?
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDelete}
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#e0b828",
                color: "#000000",
              },
            }}
          >
            Oui
          </Button>
          <Button
            variant="outlined"
            onClick={closeEvent}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Non
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteBoisson;
