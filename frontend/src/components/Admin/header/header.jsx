import logo1 from './images/Gov_sl.png';
import logo2 from './images/panadura_mn.png';
import './header.css'; 


function Header() {
    
    return (
        <header className="hdr-wrapper-uniqueee">
        <div className="bar-green-uniqueee">
        <nav>
  <ul className="nav-uniqueee">
    <li><a href="/AdminDashboard" className="nav-link-uniqueee">Admin Dashboard</a></li>
  </ul>
</nav>
            <div className="council-head-uniqueee">
                <h2>PANADURA</h2>
                <h3>MUNICIPAL COUNCIL</h3>
            </div>
        </div>
        <div className="logo-container-uniqueee">
            <img src={logo1} alt="Logo 1" className="logo-uniqueee" />
            <img src={logo2} alt="Logo 2" className="logo-uniqueee" />
        </div>
        <hr className="divider-uniqueee" />
    </header>
    );
}

export default Header;
