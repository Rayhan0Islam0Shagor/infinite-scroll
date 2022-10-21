/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../apis/axios";
import useAxios from "../hooks/useAxios";

const Posts = () => {
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
    <>
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
    </>
  );
};

export default Posts;
