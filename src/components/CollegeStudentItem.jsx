import { Tr, Td } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CollegeStudentItem({ student, index }) {
  return (
    <>
      {student === undefined ? (
        <Tr>
          <Td textAlign="center">No Students Found</Td>
        </Tr>
      ) : (
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
            {student?.user_interests && student?.user_interests.length > 0
              ? student.user_interests
                  .map((interest) => interest.area_of_interest.interest)
                  .join(", ")
              : "No Interests"}
          </Td>
          <Td textAlign="center">
            {student?.user_skills && student?.user_skills.length > 0
              ? student?.user_skills
                  .map((skillObject) => skillObject.skill)
                  .join(", ")
              : "Not Updated"}
          </Td>
          <Td textAlign="center">{student.numProjects}</Td>
        </Tr>
      )}
    </>
  );
}

CollegeStudentItem.propTypes = {
  student: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

CollegeStudentItem.defaultProps = {
  student: null,
};
export default CollegeStudentItem;
