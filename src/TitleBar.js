import { Link } from "react-router-dom";

function TitleBar() {
    return(
    <div className="home">
      <div className="titleBar">
        <div className="title">
          <p> Amplify </p>{" "}
        </div>
        <div className="barButtons">
          <Link className="bar_button" to="/">
            Home
          </Link>
          <Link className="bar_button" to="/about">
            About
          </Link>
        </div>
      </div>
      </div>
    );
}

export default TitleBar;