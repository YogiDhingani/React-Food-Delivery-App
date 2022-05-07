import { ROUTES } from "../util/constants";
import Home from "../components/Home/Home.component";
import SignIn from "../components/SignIn";

const ALL_ROUTES = [
    {
        path: ROUTES.HOME,
        component: Home,
        name: 'Home',
    },
    {
        path: ROUTES.SIGN_IN,
        component: SignIn,
        name: 'SignIn',
    },
];

export default ALL_ROUTES;