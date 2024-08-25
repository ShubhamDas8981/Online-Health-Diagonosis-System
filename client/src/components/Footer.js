import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="d-flex align-items-center justify-content-center">
              <img src="/images/linkedin.png" alt="LinkedIn" width="30" height="30" className="me-2" />
             
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.linkedin.com/in/monalisa-tarafdar-015230281/" className="text-dark">Monalisa Tarafdar</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shubham-das-471966240/" className="text-dark">Shubham Das</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/yash-mukhopadhyay-286183225/" className="text-dark">Yash Mukhopadhyay</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/debjit-dey-164592232/" className="text-dark">Debjit Dey</a>
              </li>
              <li>
                <a href="https://github.com/thirdgithubprofile" className="text-dark">Sresthangshu Chatterjee</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="d-flex align-items-center justify-content-center">
              <img src="/images/github-logo.png" alt="GitHub" width="30" height="30" className="me-2" />
              
            </h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="https://github.com/mynmelisa" className="text-dark">mynmelisa</a>
              </li>
              <li>
                <a href="https://github.com/ShubhamDas8981" className="text-dark">ShubhamDas8981</a>
              </li>
              <li>
                <a href="https://github.com/yash2870" className="text-dark">yash2870</a>
              </li>
              <li>
                <a href="https://github.com/DebjitDey12345" className="text-dark">DebjitDey12345</a>
              </li>
              <li>
                <a href="https://github.com/Shresthangsu" className="text-dark">Shresthangsu</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="d-flex align-items-center justify-content-center">
              <img src="/images/gmail.png" alt="Email" width="30" height="30" className="me-2" />
              
            </h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="mailto:tarafdarmonalisa@gmail.com" className="text-dark">tarafdarmonalisa@gmail.com</a>
              </li>
              <li>
                <a href="mailto:codingshubham.in@gmail.com" className="text-dark">codingshubham.in@gmail.com</a>
              </li>
              <li>
                <a href="mailto:yashmukherjee62@gmail.com" className="text-dark">yashmukherjee62@gmail.com</a>
              </li>
              <li>
                <a href="mailto:debjitdey2021@gmail.com" className="text-dark">debjitdey2021@gmail.com</a>
              </li>
              <li>
                <a href="mailto:chatterjeeshresthangsu@gmail.com" className="text-dark">chatterjeeshresthangsu@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2024 Copyright:
        <a className="text-dark" href="https://yourwebsite.com/">YourWebsite.com</a>
      </div>
    </footer>
  );
};

export default Footer;
