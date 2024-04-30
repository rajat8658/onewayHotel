import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout()
  {
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            OneWay Hotel
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle ="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> <i class="fa-solid fa-bars fa-xl" style={{color:'black',marginTop:'5px'}}></i> </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-5">
              <li className="nav-item">
                <a className="nav-link " href="/about">
                  About Us
                </a>
              </li>
              {user ? (
                <>
                <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle ="dropdown" aria-expanded="false">
    <i className="fa fa-user"></i> Hi.. {user.data.name}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/profile">My Profile</a></li>
    <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
    
  </ul>
</div>
</>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
