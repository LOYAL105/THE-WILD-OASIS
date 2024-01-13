import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LogoImage from "../data/img/logo-light.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CabinOutlinedIcon from "@mui/icons-material/CabinOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const drawerWidth = 240;
const LogoImg = styled("img")({
  height: "5.6rem",
  width: "auto",
});
const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#f4f4f4",
    "& .MuiListItemIcon-root, & .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
  },
}));

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon />,
      path: "/",
    },
    {
      text: "Bookings",
      icon: <CalendarMonthOutlinedIcon />,
      path: "/bookings",
    },
    {
      text: "Cabins",
      icon: <CabinOutlinedIcon />,
      path: "/cabins",
    },
    {
      text: "Users",
      icon: <PeopleOutlineOutlinedIcon />,
      path: "/users",
    },
    {
      text: "Settings",
      icon: <SettingsOutlinedIcon />,
      path: "/settings",
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "background.default",
          }}
          elevation={1}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ textAlign: "center", p: 4 }}>
            <LogoImg src={LogoImage} alt="logo" />
          </Box>
          <Divider />
          <List>
            {menuItems.map((menu) => (
              <ListItem
                key={menu.text}
                sx={{
                  backgroundColor:
                    location.pathname === menu.path ? "#f4f4f4" : "",
                }}
              >
                <CustomListItemButton onClick={() => navigate(menu.path)}>
                  <ListItemIcon sx={{ minWidth: "32px", paddingLeft: "20px" }}>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.text} />
                </CustomListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Container component="main" sx={{ bgcolor: "background.default", p: 3 ,maxWidth:"120rem"}}>
          <Toolbar />
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default AppLayout;
