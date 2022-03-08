import { Text, Box, Divider, Flex, Button } from "@chakra-ui/react";

const CampaignAssignments = ({ setCurrentPage }) => {
  return (
    <>
      <Text>Assignments</Text>

      <Box mb={3}>
        <Divider color="gray.400" mb={4} />
        <Flex justifyContent="space-between">
          <Button colorScheme="gray" onClick={() => setCurrentPage(1)}>
            Back
          </Button>
          <Button colorScheme="brand">Submit</Button>
        </Flex>
      </Box>
    </>
  );
};

export default CampaignAssignments;