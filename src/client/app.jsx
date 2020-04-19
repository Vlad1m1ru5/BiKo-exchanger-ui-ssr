import React, { useState } from "react";
import styled from "styled-components"
import actions from "../store/actions";
import { connect } from "react-redux";

const Centered = styled.div`
  margin: auto;
  width: max-content;
`;

const App = ({ userName, setUserName }) => {
  const [click, setClick] = useState(0);

  const onClick = () => {
    setClick(click + 1)
    setUserName(click)
  };

  return (<>
    <Centered onClick={onClick}>Text{click}</Centered>
    {userName && <Centered>{userName}</Centered>}
  </>);
};

const mapStateToProps = (store) => ({
  userName: store.userName
});

const mapDispatchToProps = {
  setUserName: actions.setUserName
};

export default connect(mapStateToProps, mapDispatchToProps)(App);