import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./context/UserContext";
import DataContext from "./context/DataContext";

import axios from "axios";
import styled from "styled-components";

const URL = "http://localhost";
const PORT = "5000";

export default function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const [operation] = useState(location.state.operation);
  const [edit] = useState(location.state.edit);
  const [cashPattern] = useState("[0-9]{1,9},[0-9]{1,2}");
  const [data] = useState(location.state.data || "");
  const [value, setValue] = useState(initValue);
  const [description, setDescription] = useState(initDescription);
  const { userSession } = useContext(UserContext);
  const { setUserData } = useContext(DataContext);

  useEffect(() => {
    if (userSession === undefined) {
      navigate("/");
    }
  }, [userSession, navigate]);

  function initValue() {
    if(location.state && location.state.data !== undefined) {
      return location.state.data.value
    }
    return ""
  }

  function initDescription() {
    if(location.state && location.state.data !== undefined) {
      return location.state.data.description
    }
    return ""
  }

  function submitEntry(e) {
    e.preventDefault();
    const valueToCurrency = value.replace(",",".")
    const signedValue = operation ? valueToCurrency : -valueToCurrency;
    const submitData = {
      value: parseFloat(signedValue).toFixed(2),
      description: description,
    };

    const requisitionHeader = {
      headers: {
        Authorization: `Bearer ${userSession.token}`,
      },
    };
    if (edit) {
      const promise = axios.put(
        `${URL}:${PORT}/data/${data.id}`,
        submitData,
        requisitionHeader
      );
      promise.then((res) => {
        setUserData(res.data)
        navigate("/entries");
      });
      promise.catch((err) => window.alert(err.response.data));
    } else {
      const promise = axios.post(
        `${URL}:${PORT}/data`,
        submitData,
        requisitionHeader
      );
      promise.then((res) => {
        setUserData(res.data)
        navigate("/entries");
      });
      promise.catch((err) => window.alert(err.response.data));
    }
  }

  return (
    <Container>
      <Header>
        {edit ? "Editar " : "Nova "} {operation ? "entrada" : "saida"}
      </Header>
      <FormWrapper onSubmit={submitEntry}>
        <FormInput
          value={value}
          placeholder="Valor"
          onChange={(e) => setValue(e.target.value)}
          type={"text"}
          pattern={cashPattern}
          title={"Insira um numero no formato 'reais,centavos'."}
          required
        />
        <FormInput
          value={description}
          placeholder="Descrição"
          onChange={(e) => setDescription(e.target.value)}
          type={"text"}
          required
        />
        <FormButton type={"submit"}>
          {edit ? "Atualizar " : "Salvar "} {operation ? "entrada" : "saída"}
        </FormButton>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #8c11be;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.h1`
  font-family: "Raleway", sans-serif;
  text-align: center;
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

const FormWrapper = styled.form`
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 20px;
  height: 30vh;
  width: 100%;
`;

const FormInput = styled.input`
  min-height: 40px;
  width: 88%;
  background-color: #ffffff;
  border: none;
  margin: 5px 0;
  border-radius: 5px;
  padding: 2px 10px;
  box-sizing: border-box;

  ::placeholder {
    font-family: "Raleway", sans-serif;
    color: #000000;
    size: 20px;
  }
`;

const FormButton = styled.button`
  font-family: "Raleway", sans-serif;
  background-color: #a328d6;
  border-radius: 5px;
  font-weight: bold;
  margin: 5px 0;
  border: none;
  min-height: 40px;
  width: 88%;
  color: #ffffff;
  size: 20px;
`;
