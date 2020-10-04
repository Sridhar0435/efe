import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "../../css/footer.css";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small footer pt-4 ">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Let Us Know</h5>
            <p className="footerp">
              If you encounter any bugs, lack of functionality, delayed
              deliveries, billing errors or other problems on the beta website,
              please email us on <a href="sridhar.com">sridhar.com</a>
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="footer_title">Get To Know Us</h5>
            <ul className="ul_footer_1">
              <li className="list-unstyled">
                <a href="#!">About Us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Carrers</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Privacy policy</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">T&C</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="footer_title">Connect With Us</h5>
            <ul className="ul_footer_2">
              <li className="list-unstyled">
                <a href="#!">Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Instagram</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Youtube</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Twitter</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="#"> sridhar.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
