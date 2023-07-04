import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/Web/style.css';
function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className='d-flex w-100 justify-content-between'>
          <Navbar.Brand className={`${(localStorage.getItem('email_id') ? "w-20" : "w-75")}`} href="#">  <img src="assetsweb/img/logo@2x.png" alt="Esan Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={` ${(localStorage.getItem('email_id') ? "notLogin d-flex align-items-center justify-content-around" : " me-auto d-flex align-items-center justify-content-center")}`}>
              {!localStorage.getItem('email_id') && (
                <>
                  <Nav.Link> <Link to="/login">
                    <img
                      style={{ width: '234px' }}
                      src="assetsweb/img/sign_in@2x.png"
                      alt="Signin"
                    />
                  </Link></Nav.Link>
                </>
              )}
              {localStorage.getItem('email_id') && (
                <>
                  <Nav.Link className='d-flex align-items-center justify-content-center m-2 w-75 text-center' >  <h3>
                    Welcome to Izesan! &nbsp;
                    {
                      JSON.parse(localStorage.getItem('all_data'))[0].name.charAt(0).toUpperCase() && JSON.parse(localStorage.getItem('all_data'))[0].name.slice(1) ?
                        (
                          <>
                            {JSON.parse(localStorage.getItem('all_data'))[0].name.charAt(0).toUpperCase() +
                              JSON.parse(localStorage.getItem('all_data'))[0].name.slice(1)}
                          </>

                        ) : (
                          <></>
                        )
                    }

                  </h3></Nav.Link>
                </>
              )}
              {localStorage.getItem('email_id') && (
                <>
                  <Nav.Link className='d-flex align-items-center justify-content-center '>
                    <button
                      onClick={() => navigate('/languages')}
                      style={{ width: '234px', height: '60px', borderRadius: '20px', color: 'white' }}
                      className="btn btn-warning">
                      <i className="fa fa-home"></i>
                      <span style={{ paddingLeft: '10px' }}>Home</span>
                    </button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
