import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  Box,
  Text,
  Link,
  Spinner, // Import the Spinner component
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import PageNav from "./PageNav";
import useAuth from "../hooks/useAuth";

const StudentsTable = ({ selectedCollege }) => {
  const authUser = useAuth();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfPosts, setNumberOfPosts] = useState(0);

  useEffect(() => {
    // Make a POST request to fetch student data based on the selectedCollege
    const fetchData = async () => {
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

        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Set loading to false once the data is fetched (whether successful or not)
        setIsLoading(false);
      }
    };

    const fetchNumberOfPosts = async () => {
      try {
        const response = await axios.post(
          "https://xe1zqr4z18.execute-api.ap-south-1.amazonaws.com/production/Inovact_userPostAggregate",
          {
            userId: numberOfPosts,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setNumberOfPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // fetchNumberOfPosts();
  }, [selectedCollege, numberOfPosts]);

  return (
    <>
      <PageNav />
      {authUser ? (
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
            <Heading size="xl" mb={10}>
              Data
            </Heading>
            <Box overflowX="auto" w="100%">
              {isLoading ? (
                // Display a loading spinner while data is being fetched
                <Spinner size="xl" />
              ) : (
                <Table variant="simple">
                  <Thead>
                    <Tr bgColor="#E1F5FE" color="black" fontWeight="extrabold">
                      <Th textAlign="center">SL no</Th>
                      <Th textAlign="center">Name</Th>
                      <Th textAlign="center">Profile type</Th>
                      <Th textAlign="center">Email-id</Th>
                      <Th textAlign="center">Github Link</Th>
                      <Th textAlign="center">Website Link</Th>
                      <Th textAlign="center">Area of Interest</Th>
                      <Th textAlign="center">Skills</Th>
                      <Th textAlign="center">No. of Projects/Ideas/Thoughts</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {students.map((student, index) => (
                      <Tr key={index}>
                        <Td textAlign="center">{index + 1}</Td>
                        <Td textAlign="center">
                          {student.first_name + " " + student.last_name}
                        </Td>
                        <Td textAlign="center">{student.role}</Td>
                        <Td textAlign="center">{student.email_id}</Td>
                        <Td textAlign="center">
                          <a
                            href={student.github_profile || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {student.github_profile || "Not Updated"}
                          </a>
                        </Td>
                        <Td textAlign="center">
                          <a
                            href={student.website || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {student.website || "Not Updated"}
                          </a>
                        </Td>
                        <Td textAlign="center">
                          {student.user_interests
                            .map(
                              (interest) => interest.area_of_interest.interest
                            )
                            .join(", ")}
                        </Td>
                        <Td textAlign="center">
                          {student.user_skills
                            .map((skillObject) => skillObject.skill)
                            .join(", ") || "Not Updated"}
                        </Td>
                        <Td textAlign="center">{student.numProjects}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
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
          <Text fontSize="xl">
            <Link as={RouterLink} to="/login" color="blue.500">
              Sign in
            </Link>{" "}
            to view this page
          </Text>
        </Box>
      )}
    </>
  );
};

StudentsTable.propTypes = {
  selectedCollege: PropTypes.string,
};

export default StudentsTable;
