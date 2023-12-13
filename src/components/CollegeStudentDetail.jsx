import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  VStack,
  Box,
  Text,
  Link,
  Alert,
  AlertIcon,
  CloseButton,
  Button,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import PageNav from "./PageNav";
import useAuth from "../hooks/useAuth";
import StudentsTableContent from "./StudentsTableContent";

const LoadingSpinner = () => <Text>fetching users...</Text>;

const StudentsTable = ({ selectedCollege }) => {
  const authUser = useAuth();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCollege) {
        return;
      }
      try {
        const response = await axios.post(
          "https://xe1zqr4z18.execute-api.ap-south-1.amazonaws.com/production/Inovact_getUsersBasedOnCollege",
          {
            university: selectedCollege,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up a warning message when the user tries to refresh
    const handleBeforeUnload = (event) => {
      const message =
        "Are you sure you want to leave? Your changes may not be saved.";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedCollege]);

  return (
    <>
      <PageNav />
      <Button
        as={RouterLink}
        to="/app"
        mt={8}
        size="lg"
        ml={8}
        colorScheme="blue"
        leftIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      {selectedCollege ? (
        authUser ? (
          <Box
            w="full"
            minH="100vh"
            bg="#FFFFFF"
            p={4}
            mt={8}
            mx="auto"
            display="flex"
            flexDirection="column"
            align="center"
            justify="center"
          >
            <VStack spacing={6} align="center" mt={8}>
              <Text fontSize="2xl" mb={10}>
                Users From <Text fontWeight={700}>{selectedCollege}</Text>
              </Text>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <StudentsTableContent students={students} />
              )}
            </VStack>
          </Box>
        ) : (
          <Box
            w="full"
            bg="#FFFFFF"
            p={4}
            mt={8}
            mx="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Alert status="warning" mb={4}>
              <AlertIcon />
              Refreshing is disabled.{" "}
              <Link as={RouterLink} to="/search-college" color="blue.500">
                Click here to search for a college.
              </Link>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
            <Text fontSize="xl">
              <Link as={RouterLink} to="/login" color="blue.500">
                Sign in
              </Link>{" "}
              to view this page
            </Text>
          </Box>
        )
      ) : (
        <Text
          fontSize="xl"
          mt={8}
          align="center"
          color="red.500"
          fontWeight="bold"
        >
          Something went wrong,{" "}
          <Text as={RouterLink} to="/app" color="blue.500">
            Click here to search college
          </Text>
        </Text>
      )}
    </>
  );
};

StudentsTable.propTypes = {
  selectedCollege: PropTypes.string,
};

export default StudentsTable;
