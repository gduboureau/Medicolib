import { Link,useLocation} from "react-router-dom";

import './assets/publicHeader.css';
import Logo from './assets/logo.png';

const PublicHeader = () => {

    const location = useLocation();

    return (
        <header>
            <nav className="public-nav">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="logo-public"/> {/*https://www.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_18246203.htm#query=medical%20logo&position=7&from_view=keyword&track=ais%22%3EImage */}
                </Link>
                <ul>
                    <li>
                        <Link to={"/login"} state={{ prev: location.pathname }} className="Login">
                            Se connecter
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default PublicHeader;