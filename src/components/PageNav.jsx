import { Box, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PageNav = () => {
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#E1F5FE"
      color="white"
      borderBottom="1px"
      borderColor="gray.400"
      width="100%"
    >
      <Flex
        align="center"
        mr={5}
        onClick={() => navigate("/app")}
        cursor="pointer"
      >
        {/* Your logo/image goes here */}
        <Image src="/logo.png" alt="Logo" boxSize="60px" />
        <Box ml={3} fontWeight="extrabold" fontSize="2xl" color={"black"}>
          Inovact
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageNav;
