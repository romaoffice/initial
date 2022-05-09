import Hoppers from "layouts/hoppers";
import HopperUpdate from "layouts/hoppers/update";
import Tokensets from "layouts/tokensets";
import TokensetUpdate from "layouts/tokensets/update";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dynamic Hoppers",
    key: "hoppers",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hoppers",
    component: <Hoppers />,
  },
  {
    type: "route",
    name: "Hopper",
    key: "hopper",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hoppers/:id",
    component: <HopperUpdate />,
  },
  {
    type: "collapse",
    name: "Token Sets",
    key: "tokensets",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tokensets",
    component: <Tokensets />,
  },
  {
    type: "route",
    name: "Tokenset",
    key: "tokenset",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tokensets/:id",
    component: <TokensetUpdate />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
