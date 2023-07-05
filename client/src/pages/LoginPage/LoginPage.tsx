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

function LoginPage() {
  const navigate = useNavigate();
  const methods = useForm();
  const submitForm = methods.handleSubmit((data) => {
    console.log(data);
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
              <Input label="Username" id="username" />
              <Input label="Password" id="password" type="password" />
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
