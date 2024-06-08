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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
//import axios from "axios";
//import { BASE_URL } from "../../../config";
//import { useNavigate } from "react-router-dom";

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
  {
    id: 1,
    orderNum: "",
    name: "",
    phone: "",
    adress: "",
    orderDetails: "",
    price: "",
    statut: "",
  },
  {
    id: 2,
    orderNum: "",
    name: "",
    phone: "",
    adress: "",
    orderDetails: "",
    price: "",
    statut: "",
  },
  {
    id: 3,
    orderNum: "",
    name: "",
    phone: "",
    adress: "",
    orderDetails: "",
    price: "",
    statut: "",
  },
  // Add more mock data as needed
];
export default function DemandeList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(mockData);
  const [open, setOpen] = useState(false);
  //const [data, setData] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editopen, setEditOpen] = useState(false);
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
  //const navigate = useNavigate();
  const editData = (
    id: any,
    orderNum: any,
    name: any,
    phone: any,
    adress: any,
    orderDetails: any,
    price: any,
    statut: any
  ) => {
    const data = {
      id: id,
      orderNum: orderNum,
      name: name,
      address: adress,
      phoneNumber: phone,
      orderDetails: orderDetails,
      price: price,
      statut: statut,
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

  const deleteOrder = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  {
    /*const fetchRestaurantMenu = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${BASE_URL}/restaurants`, {
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
    fetchRestaurantMenu();
  }, []);
  console.log(data);*/
  }
  return (
    <>
      <div>
        <Modal
          open={editopen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditOrder closeEvent={handleEditClose} />
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
              <DeleteOrder
                id={deleteId}
                closeEvent={handleDeleteClose}
                deleteEvent={deleteOrder}
              />
            )}
          </Box>
        </Modal>
      </div>
      {rows.length > 0 && (
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
              Liste des commandes
            </Typography>
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
                    Numéro de commande
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
                    Détails de la commande
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Prix Total
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Statut de la commande
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      //onClick={() => {
                      //navigate(`/restaurants/${row?.id}`);
                      //}}
                      key={row?.id}
                    >
                      <TableCell align="left">{row?.orderNum}</TableCell>
                      <TableCell align="left">{row?.name}</TableCell>
                      <TableCell align="left">{row?.phone}</TableCell>
                      <TableCell align="left">{row?.adress}</TableCell>
                      <TableCell align="left">{row?.orderDetails}</TableCell>
                      <TableCell align="left">{row?.price}</TableCell>
                      <TableCell align="left">{row?.statut}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            sx={{
                              fontSize: "20px",
                              color: "black",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              editData(
                                row.id,
                                row.name,
                                row.orderDetails,
                                row.adress,
                                row.phone,
                                row.orderNum,
                                row.price,
                                row.statut
                              );
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
