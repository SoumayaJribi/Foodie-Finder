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
import AddMenu from "./AddMenu";
import EditMenu from "./EditMenu";
import DeleteMenu from "./DeleteMenu";
import { BASE_URL } from "../../../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

const mockData = [
  { id: 1, name: "", description: "" },
  { id: 2, name: "", description: "" },
  { id: 3, name: "", description: "" },
  // Add more mock data as needed
];

export default function MenuList() {
  const { id } = useParams();
  console.log({ id });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
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
  const editData = (id: any, image: any, name: any, description: any) => {
    const data = {
      id: id,
      image: image,
      name: name,
      description: description,
    };
    //setMenuid(data);
    handleEditOpen();
  };

  const handleDeleteOpen = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };
  const navigate = useNavigate();

  const deleteMenu = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const fetchMenu = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${BASE_URL}/restaurants/${id}/menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, [id]);
  console.log(data);

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
            <AddMenu closeEvent={handleClose} />
          </Box>
        </Modal>

        <Modal
          open={editopen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditMenu closeEvent={handleEditClose} />
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
              <DeleteMenu
                id={deleteId}
                closeEvent={handleDeleteClose}
                deleteEvent={deleteMenu}
              />
            )}
          </Box>
        </Modal>
      </div>

      {rows.length > 0 && (
        <Paper
          style={{
            maxWidth: "1000px", // Vous pouvez ajuster cette valeur selon vos besoins
            margin: "0 auto", // Centre horizontalement
            padding: "20px", // Pour ajouter un peu d'espace intérieur
            backgroundColor: "rgba(255, 255, 255, 0.6)", // Pour un fond blanc avec 80% d'opacité
            borderRadius: "8px", // Pour arrondir les coins
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Pour ajouter une ombre légère
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Liste de Menu
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

          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Image
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Nom
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Description
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data as any)?.map((row: any) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => {
                      navigate(`/restaurants/${id}/menus/${row?.id}`);
                    }}
                  >
                    <TableCell align="left">
                      <img
                        src={row.image}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          sx={{
                            fontSize: "20px",
                            color: "black",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            editData(row.id, row.image, row.name, row.email);
                          }}
                        />
                        <DeleteIcon
                          sx={{
                            fontSize: "20px",
                            color: "#e0b828",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteOpen(row.id)}
                        />
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
            count={rows.length}
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
