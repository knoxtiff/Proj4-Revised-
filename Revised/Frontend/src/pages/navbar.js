import { Link } from "react-router-dom";
//import './navbar.css';

const Navbar = () => {
    const handleLinkClick = () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show'); // Collapse navbar on link click
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-friends" style={{ color: '#d5bf86' }} to="/" onClick={handleLinkClick}>
                    FRIENDS Trivia
                </Link>
               
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={handleLinkClick}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" onClick={handleLinkClick}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
