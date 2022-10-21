import "./App.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AOS from "aos";
import "aos/dist/aos.css";
import Posts from "./pages/Posts";
import Images from "./pages/Images";

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
  return (
    <div className="App position-relative d-flex align-items-center justify-content-start bg-dark text-white">
      <div className="container my-2">
        <h1 className="text-center my-4 uppercase text-white">
          Infinite Scroll
        </h1>

        <Tabs
          defaultActiveKey="posts"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="posts" title="Posts">
            <Posts />
          </Tab>
          <Tab eventKey="images" title="Images">
            <Images />
          </Tab>
        </Tabs>

        {/* {page === "posts" ? <Posts /> : <Images />} */}
      </div>
    </div>
  );
}

export default App;
