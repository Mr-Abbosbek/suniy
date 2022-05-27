import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { BiArrowBack } from "react-icons/bi";
// import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
// import { useFetching } from "./hooks/useFetching";
import {
  removeSelectedCounter,
  selectedCounter,
} from "../redux/actions/counterActions";
import PostServerApi from "./../API/PostServiceApi";
import Loader from "react-spinners/BarLoader";
import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  RouteButton,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";

function SingleBlog() {
  const allCounter = useSelector((state) => state.allCounters.counter);
  const counter = useSelector((state) => state.counter);

  console.log(counter);

  let urlName = useParams();
  const dispatch = useDispatch();

  // const [isLoading, postError] = useFetching(async () => {
  //   await PostServerApi.getSinglePost(urlName.name).catch((e) =>
  //     console.log("Error", e.message)
  //   );
  // });

  // const fetchAndRemove = (urlName) => {
  //   if (urlName && urlName.length !== 0) {
  //     return fetchPost()
  //   }
  //   return ()=> dispatch(removeSelectedCounter());
  // }

  useEffect(() => {
    if (urlName && urlName.length !== 0) {
      PostServerApi.getSinglePost(urlName.name)
        .then((res) => {
          dispatch(selectedCounter(res[0]));
        })
        .catch((e) => console.log("Error", e.message));
    }
    return () => dispatch(removeSelectedCounter());
  }, [urlName, dispatch]);

  let [loading] = useState(true);
  let [color] = useState("#36D7B7");

  if (urlName.name.length) {
    document.querySelector(".body").classList.add("singleBlog");
  } else {
    document.querySelector(".body").classList.remove("singleBlog");
  }

  const {
    name,
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
    latlng,
  } = counter;

  let arr = [];
  if (languages) {
    languages.map((l) => {
      arr.push(l.name);
      arr.push(", ");
      return arr;
    });
  }
  arr.pop();

  return (
    <div className="pt-5 pb-lg-5 singleBlogs">
      <div className="blog-container singleBlog-blogs">
        <Row className="all-row mx-0 back-button-blog">
          <Col className="mt-3 mx-0">
            <Link
              to="/"
              className="mt-5 btn back-button shadow d-inline-flex align-items-center px-4 py-2"
            >
              <BiArrowBack />
              <p className="my-0 pl-5">Back</p>
            </Link>
          </Col>
        </Row>
      </div>

      <div className="pb-lg-3 pb-md-3 pb-sm-3 pb-0 blog-container singleBlog-blogs">
        {Object.keys(counter).length === 0 ? (
          <Row className="spinner spinner-blog m-0">
            <Col className="p-0 d-flex justify-content-center">
              <Loader width={"100%"} color={color} loading={loading} />
            </Col>
          </Row>
        ) : (
          <div className="pb-lg-3 pb-md-3 pb-sm-3 pb-0 blog-container singleBlog-blogs">
            <Row className="all-row d-flex flex-wrap pb-5 m-0 px-lg-0 px-md-0 px-sm-0 px-0">
              <Col className="image-height m-0 col-lg-5 col-md-6 col-sm-12 col-12">
                <Image src={flag} className="img-fluid p-0 w-100" />
              </Col>
              <Col className="px-lg-5 px-md-3  py-lg-0 py-md-0 py-sm-5 py-0 col-lg-7 col-md-6 col-sm-12 col-12">
                <h2 className="px-lg-4 fw-bold">{name}</h2>

                <Row className="px-lg-4 m-0 d-flex justify-content-end">
                  <Col className="col-lg-6 col-md-12 col-sm-6 col-12 p-0">
                    <p className="fw-bold">
                      Native name:{" "}
                      <span className="fw-light">{nativeName}</span>
                    </p>
                    <p className="fw-bold">
                      Population: <span className="fw-light">{population}</span>
                    </p>
                    <p className="fw-bold">
                      Region: <span className="fw-light">{region}</span>
                    </p>
                    <p className="fw-bold">
                      Sub Region: <span className="fw-light">{subregion}</span>
                    </p>
                    <p className="fw-bold">
                      Capital: <span className="fw-light">{capital}</span>
                    </p>
                  </Col>
                  <Col className="col-lg-6 col-md-12 col-sm-6 col-12 p-0">
                    <p className="fw-bold">
                      Top Level Domain:{" "}
                      <span className="fw-light">{topLevelDomain}</span>
                    </p>
                    <p className="fw-bold">
                      Currencies:{" "}
                      {currencies ? (
                        <>
                          {currencies.map((cur, id) => (
                            <span className="fw-light" key={id}>
                              {cur.name}
                            </span>
                          ))}
                        </>
                      ) : null}
                    </p>
                    <p className="fw-bold">
                      Languages:{" "}
                      {arr ? (
                        <>
                          {arr.map((language, id) => (
                            <span className="fw-light" key={id}>
                              {language}
                            </span>
                          ))}
                        </>
                      ) : null}
                    </p>
                  </Col>
                </Row>

                <Row className="px-lg-4 d-flex align-items-center m-0">
                  <Col className="p-0">
                    <Row className="d-flex py-5 m-0">
                      <Col className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 p-0">
                        <h5 className="pt-2 fw-bold">Border Countries:</h5>
                      </Col>
                      <Col className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 p-0">
                        {borders ? (
                          <ul className="d-flex flex-wrap p-0 m-0 justify-content-start border-region">
                            {borders.map((bor, id) => {
                              return (
                                <div key={id}>
                                  {allCounter.map((border, id) => {
                                    if (bor === border.cioc) {
                                      return (
                                        <Link
                                          className="text-black text-decoration-none border_link"
                                          to={`/name/${border.name}`}
                                          key={id}
                                        >
                                          <li className="px-3 py-1 w-auto shadow-sm">
                                            {bor}
                                          </li>
                                        </Link>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              );
                            })}
                          </ul>
                        ) : null}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="border m-0 pb-5">
              <Col className="p-0" style={{ height: "400px" }}>
                <YMaps className="w-100">
                  <Map
                    defaultState={{
                      center: latlng,
                      boundsColor: "red",
                      zoom: 5,
                    }}
                    className="w-100"
                    style={{ height: "400px" }}
                    options={{ borderColor: "red" }}
                  >
                    <Placemark
                      geometry={latlng}
                      options={{ iconColor: "red" }}
                    />
                    <FullscreenControl />
                    <GeolocationControl options={{ float: "left" }} />
                    <RouteButton options={{ float: "right" }} />
                    <TypeSelector options={{ float: "right" }} />
                    <ZoomControl options={{ float: "right" }} />
                  </Map>
                </YMaps>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleBlog;
