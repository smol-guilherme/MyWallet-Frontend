import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import styled from 'styled-components';

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");

    function userSignup(e) {
        e.preventDefault();
        console.log("bzz")
    
        // const promise = axios.post(`${URL}:${PORT}/`)
        // promise.then((res) => console.log(res.data))
        // promise.catch((err) => err.response.status);
    
        return;
    }

	return (
		<Container>
			<ContentWrapper>
				<Header>MyWallet</Header>
				<FormWrapper onSubmit={userSignup}>
                    <FormInput
						value={name}
						placeholder='Nome'
						onChange={(e) => setName(e.target.value)}
						type={'text'}
						required
					/>
                    <FormInput
						value={email}
						placeholder='E-mail'
						onChange={(e) => setEmail(e.target.value)}
						type={'email'}
						required
					/>
					<FormInput
						value={password}
						placeholder='Senha'
						onChange={(e) => setPassword(e.target.value)}
						type={'password'}
						required
					/>
                    <FormInput
						value={passwordRepeat}
						placeholder='Confirme a senha'
						onChange={(e) => setPasswordRepeat(e.target.value)}
						type={'password'}
						required
					/>
					<FormButton type={'submit'}>ENTRAR</FormButton>
				</FormWrapper>
				<LinkWrapper><Link to="/" >Já tem uma conta? Entre agora!</Link></LinkWrapper>
			</ContentWrapper>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #8C11BE;
	justify-content: center;
	align-items: center;
`;

const ContentWrapper = styled.div`
	width: 100%;
	height: 50vh;
	background-color: transparent;
`;

const Header = styled.h1`
	font-family: 'Saira Stencil One', cursive;
	font-size: 32px;
	color: #FFFFFF;
	text-align: center;
`;

const LinkWrapper = styled.div`
	text-align: center;
	
	a {
		font-family: 'Raleway', sans-serif;
		text-decoration: none;
		margin-top: 25px;
		color: #FFFFFF;
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
	background-color: #FFFFFF;
	border: none;
	margin: 5px 0;
	border-radius: 5px;
	padding: 2px 10px;
	box-sizing: border-box;

	::placeholder {
		font-family: 'Raleway', sans-serif;
		color: #000000;
		size: 20px;
	}
`;

const FormButton = styled.button`
	font-family: 'Raleway', sans-serif;
	background-color: #A328D6;
	border-radius: 5px;
	font-weight: bold;
	margin: 5px 0;
	border: none;
	min-height: 40px;
	width: 88%;
	color: #FFFFFF;
	size: 20px;
`;