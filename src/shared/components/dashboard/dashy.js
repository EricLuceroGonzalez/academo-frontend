import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import theApi from "../../api";

function Dashy() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await theApi
        .getCourseDash(this.props.auth.user.id)
        .then((res) => {
          console.log(res.data);
          setPosts(response);
        })
        .catch((err) => console.log(`Error at get: ${err}`));
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}

Dashy.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashy);
