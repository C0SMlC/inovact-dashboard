import PropTypes from "prop-types";
import { Tr, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCount from "./PostCount";

const UserProfileLink = ({ href, text }) => (
  <a href={href || "#"} target="_blank" rel="noopener noreferrer">
    {text || "Not Updated"}
  </a>
);

UserProfileLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
};

const UserDetailsRow = ({ student, index }) => {
  const [numberOfPosts, setNumberOfPosts] = useState(null);

  useEffect(() => {
    const fetchNumberOfPosts = async () => {
      try {
        console.log(student.id);
        const response = await axios.post(
          "https://xe1zqr4z18.execute-api.ap-south-1.amazonaws.com/production/Inovact_userPostAggregate",
          {
            userId: student.id,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setNumberOfPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNumberOfPosts();
  }, [setNumberOfPosts, student.id]);

  return (
    <Tr key={index}>
      <Td textAlign="center">{index + 1}</Td>
      <Td textAlign="center">{`${student.first_name} ${student.last_name}`}</Td>
      <Td textAlign="center">{student.role}</Td>
      <Td textAlign="center">{student.email_id}</Td>
      <Td textAlign="center">
        <UserProfileLink
          href={student.github_profile}
          text={student.github_profile}
        />
      </Td>
      <Td textAlign="center">
        <UserProfileLink href={student.website} text={student.website} />
      </Td>
      <Td textAlign="center">
        {student.user_interests.length !== 0
          ? student.user_interests
              .map((interest) => interest.area_of_interest.interest)
              .join(", ")
          : "Not Updated"}
      </Td>
      <Td textAlign="center">
        {student.user_skills
          .map((skillObject) => skillObject.skill)
          .join(", ") || "Not Updated"}
      </Td>
      <>
        {numberOfPosts ? (
          <PostCount numberOfPosts={numberOfPosts} />
        ) : (
          <Td textAlign="center" colSpan={3}>
            Fetching data...
          </Td>
        )}
      </>
    </Tr>
  );
};

UserDetailsRow.propTypes = {
  student: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default UserDetailsRow;
