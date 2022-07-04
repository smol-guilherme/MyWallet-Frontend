import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import styled from "styled-components";

const URL = "https://git.heroku.com/back-proj-mywallet.git";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  function userSignup(e) {
    e.preventDefault();

    const data = {
      name: name,
      email: email.toLowerCase(),
      password: password,
    };
    const promise = axios.post(`${URL}/signup`, data);
    promise.then((res) => navigate("/"));
    promise.catch((err) => window.alert(err.response.data));
    return;
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>MyWallet</Header>
        <FormWrapper onSubmit={userSignup}>
          <FormInput
            value={name}
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            type={"text"}
            required
          />
          <FormInput
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
            required
          />
          <FormInput
            value={password}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            required
          />
          <FormInput
            value={passwordRepeat}
            placeholder="Confirme a senha"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            type={"password"}
            required
          />
          <FormButton type={"submit"}>ENTRAR</FormButton>
        </FormWrapper>
        <LinkWrapper>
          <Link to="/">Já tem uma conta? Entre agora!</Link>
        </LinkWrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  background-color: transparent;
`;

const Header = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
`;

const LinkWrapper = styled.div`
  text-align: center;
  min-height: 30px;
  margin-top: 30px;
  width: 100%;

  a {
    font-family: "Raleway", sans-serif;
    text-decoration: none;
    margin-top: 25px;
    color: #ffffff;
    size: 15px;
  }
`;

const FormWrapper = styled.form`
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 40px;
  height: 50vh;
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
