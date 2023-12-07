import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../pages/auth/context';
import { logout } from '../pages/auth/service';

import '../styles/components.css';

function Header(){
    const { isLogged, onLogout } = useContext(AuthContext);
    const navigate= useNavigate();
    const location = useLocation();
    const isOnNewAdvertPage = location.pathname === '/adverts/new';
   
    const handleLogOut = async ()=> {
        await logout();  // viene de service.js, elimina el token de localstorage y de axios cliente
        onLogout(); // cambiamos el estado isLogged a false
        navigate('/login');
    }

    return <header>
        <div>
            <nav className = 'navbar'>
                <Link to='/adverts' className="navbarContent">NodePop</Link>
                <div className='options'>
                    {isLogged && !isOnNewAdvertPage && ( // Muestra botón si estálogado y no está en /adverts/new
                        <Link to='/adverts/new' className="submit">Crear anuncio</Link>
                    )}
                    {isLogged && (
                        <button onClick={handleLogOut} className="submit" disabled={false}>Log Out</button> // Muestra el botón si está logado
                    )}
                </div>
            </nav>
        </div>
    </header>
}

export default Header;