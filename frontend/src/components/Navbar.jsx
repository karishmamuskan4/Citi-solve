
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <div className="navbar  public-navbar">
      <div className="navbar-left">
      <span>🏛️</span>
       <span className="brand">CitiSolve</span>
      </div>
      <div className="navbar-right">
       <Link to="/login"><button className='navbtn'>login</button></Link> 
       <Link to="/register"> <button className='navbtn'>register</button></Link>
      </div>
    </div>
  )
}

export default Navbar
