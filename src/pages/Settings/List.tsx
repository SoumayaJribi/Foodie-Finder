import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SpecialMenuList from "./SpecialMenuList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#e0b828",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#141414",
  fontweight: "400",
  "&.Mui-selected": {
    color: "#e0b828",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#30c1d1",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function List({ idMenu }: { idMenu: string }) {
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState([]); // Initial state is an empty array
  const [newTabLabel, setNewTabLabel] = React.useState<string>("");
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editLabel, setEditLabel] = React.useState<string>("");
  const [isNewTabDialogOpen, setIsNewTabDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [tabToDelete, setTabToDelete] = React.useState<number | null>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenNewTabDialog = () => {
    setNewTabLabel("");
    setIsNewTabDialogOpen(true);
  };

  const handleAddNewTab = () => {
    const newTab = {
      label: newTabLabel,
      component: <SpecialMenuList />,
    };

    setTabs([...tabs, newTab]);
    setValue(tabs.length);
    setIsNewTabDialogOpen(false);
  };

  const handleOpenDeleteDialog = (index: number) => {
    setTabToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTab = () => {
    if (tabToDelete !== null) {
      setTabs(tabs.filter((_, i) => i !== tabToDelete));
      if (value === tabToDelete && tabToDelete === tabs.length - 1) {
        setValue(tabToDelete - 1);
      } else if (value > tabToDelete) {
        setValue(value - 1);
      }
      setTabToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleOpenEditDialog = (index: number) => {
    setEditIndex(index);
    setEditLabel(tabs[index].label);
    setIsEditDialogOpen(true);
  };

  const handleEditTab = () => {
    if (editIndex !== null) {
      const updatedTabs = tabs.map((tab, index) =>
        index === editIndex ? { ...tab, label: editLabel } : tab
      );
      setTabs(updatedTabs);
      setEditIndex(null);
      setEditLabel("");
      setIsEditDialogOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setIsNewTabDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setEditIndex(null);
    setEditLabel("");
    setNewTabLabel("");
    setTabToDelete(null);
  };

  return (
    <Card sx={{ minHeight: 84 + "vh" }}>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabs.map((tab, index) => (
                <StyledTab
                  key={index}
                  label={tab.label}
                  {...a11yProps(index)}
                />
              ))}
            </StyledTabs>
            <Button
              variant="contained"
              onClick={handleOpenNewTabDialog}
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                marginLeft: "auto",
                "&:hover": {
                  backgroundColor: "#e0b828",
                  color: "#000000",
                },
              }}
            >
              Ajouter une catégorie
            </Button>
          </Box>
          {tabs.map((tab, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {tab.component}
                <Box>
                  <IconButton onClick={() => handleOpenEditDialog(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CustomTabPanel>
          ))}
        </Box>
      </CardContent>

      <Dialog open={isNewTabDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la catégorie"
            type="text"
            fullWidth
            value={newTabLabel}
            onChange={(e) => setNewTabLabel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleAddNewTab}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Modifier le nom de la catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la catégorie"
            type="text"
            fullWidth
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleEditTab}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet onglet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleDeleteTab}
            sx={{
              borderColor: "#000000",
              color: "#000000",
              "&:hover": {
                borderColor: "#e0b828",
                color: "#e0b828",
              },
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
