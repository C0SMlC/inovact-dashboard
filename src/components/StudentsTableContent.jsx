import PropTypes from "prop-types";
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import UserDetailsRow from "./UserDetailsRow";

const StudentsTableContent = ({ students }) => (
  <Box overflowX="auto" w="100%">
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
          <UserDetailsRow key={index} student={student} index={index} />
        ))}
      </Tbody>
    </Table>
  </Box>
);

StudentsTableContent.propTypes = {
  students: PropTypes.array.isRequired,
};

export default StudentsTableContent;
