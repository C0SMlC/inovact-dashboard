import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
  Text,
  HStack,
  Link,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import PageNav from "./PageNav";
import useAuth from "../hooks/useAuth";

import { auth } from "../firebase/firebase";

const SearchCollegeComponent = ({ onCollegeSelection }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const authUser = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    function getColleges() {
      axios
        .get(
          "https://xe1zqr4z18.execute-api.ap-south-1.amazonaws.com/production/Inovact_getUserColleges",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          // Filter out duplicate entries based on the college name
          const uniqueColleges = response.data.reduce((acc, college) => {
            const existingCollege = acc.find(
              (c) => c.university === college.university
            );
            if (!existingCollege && college.university.length >= 2) {
              acc.push(college);
            }
            return acc;
          }, []);

          setColleges(uniqueColleges);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getColleges();
    // Set authChecked to true after checking authentication
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const filteredResults = colleges.filter((college) =>
      college.university.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredColleges(filteredResults);
  }, [searchQuery, colleges]);

  const handleCollegeSelection = (selectedCollege) => {
    console.log("Selected College:", selectedCollege);
    setSearchQuery(selectedCollege.university);
    navigate(`/app/college`);
    onCollegeSelection(selectedCollege.university);
    setFilteredColleges([]);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  // Wait for authentication check before rendering content
  if (!authChecked) {
    return null; // or a loading spinner, etc.
  }

  return (
    <>
      <PageNav />
      {authUser ? (
        <Box w="full" h="100vh" bg="#FFFFFF" p={4} mt={8}>
          {/* Your search bar */}
          <HStack
            display={"flex"}
            justifyContent={"space-between"}
            mb={20}
            px={10}
          >
            <p>Signed in as {authUser.email} </p>
            <Button
              onClick={handleLogout}
              colorScheme="blue"
              variant="outline"
              mt={4}
            >
              Log Out
            </Button>
          </HStack>

          <InputGroup w="65%" mx="auto" mt={8}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for colleges"
              borderRadius="lg"
              size="lg"
              borderColor={"gray.900"}
              focusBorderColor="blue.100"
              bg={"gray.100"}
            />
          </InputGroup>

          {/* Dropdown menu */}
          {filteredColleges.length === 0 ? (
            <Text fontSize="xl" textAlign="center" mt={8}>
              Loading...
            </Text>
          ) : (
            <Stack
              w="65%"
              mx="auto"
              mt={4}
              maxH="40vh"
              overflowY="auto"
              spacing={2}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
            >
              {filteredColleges.map((college, index) => (
                <Text
                  key={index}
                  onClick={() => handleCollegeSelection(college)}
                  p={4}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  {college.university}
                </Text>
              ))}
            </Stack>
          )}
        </Box>
      ) : (
        <Box
          w="full"
          bg="#FFFFFF"
          minH={"75vh"}
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

SearchCollegeComponent.propTypes = {
  onCollegeSelection: PropTypes.func.isRequired,
};

export default SearchCollegeComponent;
