import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/UserContext";
import DataContext from "./context/DataContext";

import axios from "axios";
import styled from "styled-components";

const URL = "https://back-proj-mywallet.herokuapp.com/";
const PORT = "5000";

function Entry({ data, submitDelete, navigate }) {
  const valueSign = data.value > 0 ? "#03AC00" : "#C70000";
  const op = data.value > 0 ? true : false;
  const valueToCurrencyString = data.value
    .toFixed(2)
    .toString()
    .replace(".", ",");
  return (
    <EntryBox iid={data.id}>
      <EntryItem>
        <Date>{data.date}</Date>
        <Description
          onClick={() =>
            navigate("/submit", {
              state: { operation: op, edit: true, data: data },
            })
          }
        >
          {data.description}
        </Description>
      </EntryItem>
      <EntryItem>
        <EntryValue valueSign={valueSign}>{valueToCurrencyString}</EntryValue>
        <ion-icon
          onClick={() => submitDelete(data.id)}
          name="close-outline"
        ></ion-icon>
      </EntryItem>
    </EntryBox>
  );
}

function Footer({ total }) {
  const valueSign = total > 0 ? "#03AC00" : "#C70000";
  const valueToCurrencyString = total.toString().replace(".", ",");
  return (
    <FooterBox>
      <Label>SALDO</Label>
      <ValueLabel valueSign={valueSign}>{valueToCurrencyString}</ValueLabel>
    </FooterBox>
  );
}

export default function Entries() {
  const navigate = useNavigate();
  const { userSession } = useContext(UserContext);
  const { userData } = useContext(DataContext);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(undefined);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(userSession);
    if (userSession === undefined) {
      navigate("/");
    }
    if (userData.length > 0) {
      setData(userData.data);
    }
    getEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession, navigate]);

  function getEntries() {
    const requisitionHeader = {
      headers: {
        Authorization: `Bearer ${userSession.token}`,
      },
    };
    const promise = axios.get(`${URL}:${PORT}/data`, requisitionHeader);
    promise.then((res) => {
      const entries = res.data;
      setTotal(entries.total);
      setData(entries.data);
    });
    promise.catch((err) => {
      window.alert(err.response.data);
    });
  }

  function submitDelete(itemId) {
    if (!window.confirm("Tem certeza que deseja deletar este item?")) {
      return;
    }
    const requisitionHeader = {
      headers: {
        Authorization: `Bearer ${userSession.token}`,
      },
    };
    const promise = axios.delete(
      `${URL}:${PORT}/data/${itemId}`,
      requisitionHeader
    );
    promise.then((res) => {
      const entries = res.data;
      setTotal(entries.total);
      setData(entries.data);
    });
    promise.catch((err) => {
      window.alert(err.response.data);
    });
  }

  function logOff() {
    localStorage.clear();
    navigate("/");
  }

  const Data = () => {
    if (data === undefined || data.length === 0) {
      return <Load>Não há registros de entrada ou saída</Load>;
    }
    return (
      <>
        {data.map((item, index) => (
          <Entry
            key={index}
            submitDelete={submitDelete}
            navigate={navigate}
            data={item}
          />
        ))}
      </>
    );
  };

  const Dropdown = () => {
    if (display) {
      return (
        <>
          <ArrowUp />
          <ExitButton onClick={logOff}>Sair</ExitButton>
        </>
      );
    } else {
      return (
        <ExitIcon>
          <ion-icon name="exit-outline"></ion-icon>
        </ExitIcon>
      );
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header>Olá, {userSession && userSession.name}</Header>
        <Dropdown onClick={() => setDisplay(!display)} />
      </HeaderWrapper>
      <ContentWrapper>
        <DataWrapper>{<Data />}</DataWrapper>
        <Footer total={total} />
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          onClick={() =>
            navigate("/submit", { state: { operation: true, edit: false } })
          }
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>
            Nova
            <br />
            entrada
          </p>
        </Button>
        <Button
          onClick={() =>
            navigate("/submit", { state: { operation: false, edit: false } })
          }
        >
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>
            Nova
            <br />
            saida
          </p>
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

const Load = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  color: #868686;
  height: 100%;
  width: 100%;
  padding: 0 50px;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 90%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  color: #868686;
  text-align: center;
  margin: 15px 0;
  padding: 8px 0;
  border-radius: 8px;
  box-sizing: border-box;
`;

const DataWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 4px 8px;
  box-sizing: border-box;

  div {
    padding-top: 8px;
    padding: 0 4px;
  }
`;

const EntryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 22px;
  padding: 4px 8px;
  box-sizing: border-box;

  div {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding: 0 4px;
  }
`;

const EntryItem = styled.div`
  font-family: "Raleway", sans-serif;
  height: 20px;
  color: #c6c6c6;
`;

const Date = styled.p`
  display: flex;
  width: 52px;
`;

const Description = styled.p`
  max-width: 22vh;
  color: #000000;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const EntryValue = styled.div`
  font-family: "Raleway", sans-serif;
  color: ${({ valueSign }) => valueSign};
  display: flex;
  max-width: 80px;
  justify-content: right;
`;

const Label = styled.h1`
  font-family: "Raleway", sans-serif;
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

const ValueLabel = styled.h1`
  font-family: "Raleway", sans-serif;
  color: ${({ valueSign }) => valueSign};
  font-weight: 400;
  font-size: 17px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 20vh;
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
  padding: 12px;
  font-size: 24px;
  border-radius: 5px;
  box-sizing: border-box;

  p {
    font-family: "Raleway", sans-serif;
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 0.1ch;
    line-height: 20px;
  }
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #a328d6;
  position: absolute;
  bottom: -5px;
  right: 20px;
  z-index: 1;
`;

const ExitIcon = styled.div`
  position: relative;
`;

const ExitButton = styled.div`
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a328d6;
  color: #ffffff;
  box-shadow: 0 1px -2px 2px #66666640;
  border-radius: 4px;
  position: absolute;
  bottom: -34px;
  right: 17px;
`;
