import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Images = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevY, setPrevY] = useState(0);
  let photosRef = useRef({});

  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  let pageRef = useRef({});
  photosRef.current = photos;
  pageRef.current = page;

  prevYRef.current = prevY;

  useEffect(() => {
    getPhotos();
    setPage(pageRef.current + 1);

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
  }, []);

  const handleObserver = (entities, observer) => {
    console.log("time to get more photos");

    const y = entities[0].boundingClientRect.y;

    if (prevYRef.current > y) {
      console.log("actually getting photos.");
      getPhotos();
      setPage(pageRef.current + 1);
    } else {
      console.log("conditional is false");
    }
    console.log("currenty: ", y, "prevY: ", prevY);
    setPrevY(y);
  };

  const getPhotos = async () => {
    try {
      setLoading(true);
      let photosRetrieved = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${pageRef.current}&_limit=10`
      );
      if (photosRetrieved) {
        setPhotos([...photosRef.current, ...photosRetrieved.data]);
        setLoading(false);
      }
    } catch (error) {
      console.log("ERROR GETTING PHOTOS");
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Row>
          {photos.map((photo) => (
            <Col xs={12} sm={6} md={4} lg={3} key={uuidv4()} data-aos="flip-up">
              <h4>id: {photo.id}</h4>
              <img src={photo.url} height="150px" width="200px" />
            </Col>
          ))}
        </Row>
      </div>

      <div
        ref={loadingRef}
        className="spinner-border text-light mt-4 yoHello"
        role="status"
      >
        <span
          className="visually-hidden"
          style={{ display: loading ? "block" : "none" }}
        >
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Images;
