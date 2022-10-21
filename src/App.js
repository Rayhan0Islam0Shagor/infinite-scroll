/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback } from "react";
import axios from "./apis/axios";
import "./App.css";
import useAxios from "./hooks/useAxios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 40, // offset (in px) from the original trigger point
  delay: 50, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: "ease-in-out", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

function App() {
  // const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();

  const [response, error, loading, hasMore] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/posts",
    requestConfig: {
      params: {
        _page: pageNumber,
      },
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  const lastBookElementRef = useCallback((node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="App position-relative d-flex align-items-center justify-content-start bg-dark text-white">
      <div className="container my-2">
        <h1 className="text-center my-4 uppercase text-white">
          Infinite Scroll
        </h1>

        <p
          className="position-fixed top-0 end-0"
          style={{
            fontSize: "0.8rem",
            color: "black",
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            margin: "0.5rem",
          }}
        >
          {response.length}
        </p>

        <Row>
          {response?.map((title, index) => {
            if (response.length === index + 1) {
              return (
                <Col
                  key={title}
                  xs={12}
                  className="mb-2"
                  ref={lastBookElementRef}
                  data-aos="flip-up"
                >
                  <div className="card px-4 py-2">
                    <h5 className="text-dark">{title}</h5>
                  </div>
                </Col>
              );
            }

            return (
              <Col key={title} xs={12} className="mb-2" data-aos="flip-up">
                <div className="card px-4 py-2">
                  <h5 className="text-dark">{title}</h5>
                </div>
              </Col>
            );
          })}
        </Row>

        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <div>{error && "Error"}</div>
      </div>
    </div>
  );
}

export default App;
