import React from "react";
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
	usernameValidation
 } from "./validations";
import { useUserContext } from "../../contexts/UserContext";

function LoginPage() {
  const { login, usernameExists } = useUserContext();
  const navigate = useNavigate();
  const methods = useForm();
  
  const submitForm = methods.handleSubmit(async (data) => {
      const exists = await usernameExists(data.username);
      if (!exists) {
        methods.setError('username', { 
          type: 'server', 
          message: 'Username doesn\'t exist!'
        });
        return;
      }

      const user = await login(data.username, data.password, data.stayLoggedIn);
      if (user === null) {
        methods.setError('password', { 
          type: 'server', 
          message: 'Invalid password'
        });
        return;
      } else if (user.ownedRestoId){
        navigate(`/owner/${user.ownedRestoId}`);
      }else{
        navigate("/home");
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
                  labelSize={'19px'}
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
