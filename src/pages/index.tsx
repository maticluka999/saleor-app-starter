import { Box, Text } from "@saleor/macaw-ui/next";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <Box padding={8}>
      <Text variant={"hero"}>Welcome to Saleor App Starter 🚀</Text>
    </Box>
  );
};

export default IndexPage;
