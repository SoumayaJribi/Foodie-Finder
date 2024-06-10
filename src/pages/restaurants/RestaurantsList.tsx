import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddRestaurants from "./AddRestaurants";
import EditRestaurants from "./EditRestaurants";
import DeleteRestaurants from "./DeleteRestaurants";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

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

export default function restaurantsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editopen, setEditOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteOpen = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const deleteRestaurant = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/restaurants/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error while deleting restaurent menu:", error);
    }
  };

  const fetchRestaurantMenu = async () => {
    const api =
      role === "Admin"
        ? `${BASE_URL}/restaurants/AllRestaurants`
        : `${BASE_URL}/restaurants`;

    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRows(response.data);
    } catch (error) {
      console.error("Error fetching restaurent menu:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantMenu();
  }, []);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddRestaurants closeEvent={handleClose} />
          </Box>
        </Modal>

        <Modal
          open={editopen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditRestaurants closeEvent={handleEditClose} />
          </Box>
        </Modal>

        <Modal
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {deleteId !== null && (
              <DeleteRestaurants
                id={deleteId}
                closeEvent={handleDeleteClose}
                deleteEvent={deleteRestaurant}
              />
            )}
          </Box>
        </Modal>
      </div>

      {rows?.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Liste des restaurants
            </Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#e0b828",
                  color: "#000000",
                },
              }}
            >
              Ajouter
            </Button>
          </Box>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Image
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Téléphone
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Adresse
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Type de cuisine
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Heures d'ouverture
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Statut
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rows as any)?.map((row: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      <img
                        src={row?.imageUrl || ""}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.phoneNumber}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.address}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.email}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.cuisineType}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.openingHours}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/restaurants/${row?.id}`)}
                    >
                      {row?.status}
                    </TableCell>

                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          sx={{
                            fontSize: "20px",
                            color: "black",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditOpen()}
                        />
                        {/* <DeleteIcon
                          sx={{
                            fontSize: "20px",
                            color: "#e0b828",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteOpen(row.id)}
                        /> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
