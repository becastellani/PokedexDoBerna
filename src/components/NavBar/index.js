import Logo from '../assets/img/pokedexicon.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar(){
        return(
            <div>
                <nav className='navbar bg-body-tertiary text-bg-dark p-4 '>
                  <div className='container-fluid d-flex justify-content-center'>
                    
                <a className='navbar-brand text-white' href="#"> <img src={Logo} width={ 150 } alt='pokedex'/></a>
                
                </div>
                </nav>
            </div>
        )

}