import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/UserContext";

import axios from "axios";
import styled from "styled-components";

const URL = "http://localhost";
const PORT = "5000";

export default function Form() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const { userSession } = useContext(UserContext);

  useEffect(() => {
    if (userSession.token === "") {
      navigate("/");
    }
  }, [userSession]);

  function submitEntry(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <FormWrapper onSubmit={submitEntry}>
        <FormInput
          value={value}
          placeholder="Valor"
          onChange={(e) => setValue(e.target.value)}
          type={"number"}
          required
        />
        <FormInput
          value={value}
          placeholder="Valor"
          onChange={(e) => setValue(e.target.value)}
          type={"number"}
          required
        />
        <FormButton type={"submit"}>ENTRAR</FormButton>
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
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 40px;
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
