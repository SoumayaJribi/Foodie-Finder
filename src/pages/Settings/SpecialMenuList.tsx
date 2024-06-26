/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import AddCat from "./AddCat";
import DeleteCat from "./DeleteCat";
import EditCat from "./EditCat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SpecialMenuList = ({ categoryId }: { categoryId: string }) => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  console.log(deleteId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleDeleteOpen = (id: any) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleChangePage = (_event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // waiting for backend fix
  const handleDeleteMenuItem = async (id: any) => {
    try {
      await axios.delete(
        `${BASE_URL}/restaurants/${categoryId}/${id}
`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRows((rows || [])?.filter((row: any) => row?.id !== id) || []);
    } catch (error) {
      console.log("error while deleting menuItem", error);
    }
  };

  const handleGetMenuItems = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${BASE_URL}/restaurants/${categoryId}/menu-Items
`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRows(response.data);
    } catch (error) {
      console.log("error while getting menuItems", error);
    }
  };

  useEffect(() => {
    handleGetMenuItems();
  }, [categoryId]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddCat closeEvent={handleClose} categoryId={categoryId} />
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleEditClose}>
        <Box sx={style}>
          <EditCat closeEvent={handleEditClose} />
        </Box>
      </Modal>

      <Modal open={deleteOpen} onClose={handleDeleteClose}>
        <Box sx={style}>
          <DeleteCat
            closeEvent={handleDeleteClose}
            deleteEvent={handleDeleteMenuItem}
            id={categoryId}
          />
        </Box>
      </Modal>

      {(rows || [])?.length > 0 && (
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
              Liste des éléments
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
          <TableContainer sx={{ maxHeight: 440 }}>
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
                    Prix
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
                {(rows || [])
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">
                        <img
                          src={row.image}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            sx={{
                              fontSize: "20px",
                              color: "black",
                              cursor: "pointer",
                            }}
                            onClick={handleEditOpen}
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
};

export default SpecialMenuList;
