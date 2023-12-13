import PropTypes from "prop-types";
import { Tr, Td } from "@chakra-ui/react";

function PostCount({ numberOfPosts }) {
  return (
    <Td>
      <Tr>
        <Td>Projects: {numberOfPosts.projects_aggregate.aggregate.count}</Td>
      </Tr>
      <Tr>
        <Td>Ideas: {numberOfPosts.ideas_aggregate.aggregate.count}</Td>
      </Tr>
      <Tr>
        <Td>Thoughts: {numberOfPosts.thoughts_aggregate.aggregate.count}</Td>
      </Tr>
    </Td>
  );
}

PostCount.propTypes = {
  numberOfPosts: PropTypes.object.isRequired,
};
export default PostCount;
