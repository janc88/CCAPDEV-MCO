import React, { useContext } from "react";
import {
  PageContainer,
  CenterContainer,
  Card,
  Title,
  Divider,
  Send,
} from "../styles/LoginPage.styled";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { useUserContext } from "../../contexts/UserContext";
import { passwordValidation, confirmPwdValidation } from "./validations";

function EditPasswordPage() {
  const { updatePassword} = useUserContext();
  const navigate = useNavigate();
  const form = useForm();
  
  const submitForm = form.handleSubmit(async (data) => {
    try {
	  await updatePassword(data.old_password, data.new_password);
	  navigate("/home");
    } catch (error) {
	  form.setError('old_password', { 
		type: 'server', 
		message: error.message
	  });
      console.error("Error logging in:", error);
    }
  });

  return (
    <PageContainer>
      {" "}
      <CenterContainer>
        <FormProvider {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off">
            <Card>
              <Title>Change Password</Title>
              <Divider />
              <Input
                label="Old Password"
                id="old_password"
                type="password"
                validation={passwordValidation} />

			  <Input
                label="New Password"
                id="new_password"
                type="password"
                validation={passwordValidation} />

			  <Input
				label="Confirm New Password"
				id="confirm_password"
				type="password"
				validation={confirmPwdValidation(form)} />

              <Send onClick={submitForm}>Change Password</Send>
            </Card>
          </form>
        </FormProvider>
      </CenterContainer>
    </PageContainer>
  );
}

export default EditPasswordPage;
