import React, { useContext } from "react";
import {
  PageContainer,
  CenterContainer,
  Card,
  Title,
  Divider,
  SideText,
  Send,
} from "../styles/LoginPage.styled";
import { useNavigate } from "react-router-dom";
import { FlexRight } from "../../styles/Flex.styled";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import Checkbox from "../../components/Input/Checkbox";
import { 
	passwordValidation, 
	usernameValidation,
	validateUsername
 } from "./validations";
import { UserContext } from "../../contexts/UserContext";

function LoginPage() {
  const { login, validateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const methods = useForm();
  
  const submitForm = methods.handleSubmit(async (data) => {
    try {
	  const uname = await validateUsername(data.username);
	  if (typeof uname === "string") {
		methods.setError('username', { 
			type: 'server', 
			message: uname
		});
		return;
	  }
	  const user = await validateUser(data.username, data.password);
	  if (user === null) {
		methods.setError('password', { 
			type: 'server', 
			message: 'Invalid password'
		});
		return;
	  }
	  login(user);
	  navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  });

  return (
    <PageContainer>
      {" "}
      <CenterContainer>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
          >
            <Card>
              <Title>Log In</Title>
              <Divider />
              <Input
                label="Username"
                id="username"
                validation={usernameValidation}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                validation={passwordValidation}
              />
              <div>
                <Checkbox
                  id="stayLoggedIn"
                  tooltip="Stay logged in"
                  label="Remember me"
                  labelSize={19}
                />
                <FlexRight>
                  <SideText onClick={() => navigate("/signup")}>
                    Don't have an account?
                  </SideText>
                </FlexRight>
              </div>
              <Send onClick={submitForm}>Log In</Send>
            </Card>
          </form>
        </FormProvider>
      </CenterContainer>
    </PageContainer>
  );
}

export default LoginPage;
