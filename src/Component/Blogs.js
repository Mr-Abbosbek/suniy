import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "react-spinners/BarLoader";
// import Error from "./Error";

function Blogs({posts}) {
  
  let urlName = useParams();

  if (!urlName.name === "undefined") {
    document.querySelector(".body").classList.add("singleBlog");
  } else {
    document.querySelector(".body").classList.remove("singleBlog");
  }

  let [loading] = useState(true);
  let [color] = useState("#36D7B7");

  return (
    <>
      {/* <div className="d-flex justify-content-center blog-container">
        <Row className="all-row pb-3 m-0">
          <Col className="col-12">
            {postError && <Error />}
          </Col>
        </Row>
      </div> */}
      <div className="d-flex justify-content-center blog-container">
        { Object.keys(posts).length === 0 ? (
          <Row className="spinner spinner-blog m-0">
            <Col className="p-0 d-flex justify-content-center">
              <Loader width={"100%"} color={color} loading={loading} />
            </Col>
          </Row>
        ) : (
          <Row className="all-row pb-3">
            <div className="all-div pb-5">
              {posts.map((count, index) => (
                <div className="card" key={index}>
                  <Link to={`/name/${count.name}`} className="Link">
                    <div className="flag-div">
                      <Image src={count.flags.png} />
                    </div>
                    <div className="Card-text text-black p-4">
                      <h5 className="fw-bold">{count.name}</h5>
                      <div className="pt-2 text_p">
                        Population: <span>{count.population}</span>
                      </div>
                      <div className="pt-1 text_p">
                        Region: <span>{count.region}</span>
                      </div>
                      <div className="pt-1 text_p capital-text">
                        Capital: <span>{count.capital}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Row>
        )}
      </div>
    </>
  );
}

export default Blogs;
