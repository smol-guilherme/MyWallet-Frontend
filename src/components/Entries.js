import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./context/UserContext";

import axios from "axios";
import styled from "styled-components";

const URL = "http://localhost";
const PORT = "5000";

function Entry({ date, description, value }) {
  return (
    <>
      <EntryItem>
        {date} {description}
      </EntryItem>
      <EntryValue>{value}</EntryValue>
    </>
  );
}

export default function Entries() {
  const navigate = useNavigate();
  const location = useLocation();
  const dataFromResponse = location.state;
  console.log(dataFromResponse);
  const { userSession } = useContext(UserContext);

  useEffect(() => {
    console.log(userSession);
    if (userSession === undefined) {
      navigate("/");
    }
  }, []);

  const Data = () => {
    if (dataFromResponse && dataFromResponse.length === 0) {
      const requisitionHeader = {
        header: {
          Authorization: `Bearer ${userSession.token}`,
        },
      };
      const promise = axios.get(
        `${URL}:${PORT}/entries`,
        {},
        requisitionHeader
      );
      promise.then((res) => {
        const entries = res.data;
        const list = entries.map((item, index) => (
          <Entry key={index} data={item} />
        ));
        return list;
      });
      promise.catch((err) => {
        console.log(err);
        return <></>;
      });
    }
    return dataFromResponse.map((item, index) => (
      <Entry key={index} data={item} />
    ));
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header>Olá, {userSession && userSession.name}</Header>
        <ion-icon name="exit-outline"></ion-icon>
      </HeaderWrapper>
      <ContentWrapper>
        {/* <Data /> */}
        <ButtonWrapper></ButtonWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => navigate("/submit", { state: { operation: true } })}
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Nova entrada</p>
        </Button>
        <Button
          onClick={() => navigate("/submit", { state: { operation: false } })}
        >
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>Nova saida</p>
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #8c11be;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  font-size: 26px;
  text-align: center;
  color: #ffffff;
  justify-content: space-between;
  padding: 16px 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  width: 100%;
  font-family: "Raleway", sans-serif;
  color: #ffffff;
  text-align: center;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

const ContentWrapper = styled.div`
  width: 90%;
  height: 60vh;
  background-color: #FFFFFF;
  margin: 15px 0;
  border-radius: 8px;
`;

const EntryItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const EntryValue = styled.div``;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  background-color: transparent;
`;

const Button = styled.div`
  height: 20vh;
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #a328d6;
  color: #ffffff;
  padding: 8px;
  border-radius: 5px;
  box-sizing: border-box;

  p {
    font-family: "Raleway", sans-serif;
    font-size: 17px;
    font-weight: bold;
  }
`;
