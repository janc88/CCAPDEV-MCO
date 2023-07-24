import React from "react";
import {
  CenterContainer,
  PageContainer,
  Card,
  Title,
  Divider,
} from "../styles/LoginPage.styled";

function NotAllowedPage() {
  return (
    <PageContainer>
      <CenterContainer>
        <Card>
          <Title>You do not have permission to view this page or this page does not exist</Title>
          <Divider />
        </Card>
      </CenterContainer>
    </PageContainer>
  );
}

export default NotAllowedPage;
