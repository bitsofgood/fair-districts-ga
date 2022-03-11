import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { AddIcon } from "@chakra-ui/icons";
import CampaignCard from "../components/Campaign/CampaignCard";
import CampaignModal from "../components/Campaign/CampaignModal";
import { getSession, useSession } from "next-auth/react";
import AccessDeniedPage from "../components/AccessDeniedPage";
import adminEmails from "./api/auth/adminEmails";
import axios from "axios";

const Campaign = ({specialUsers}) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!session) {
    return <AccessDeniedPage />
  } else {
    if (!adminEmails.includes(session.user.email)) {
      if (!specialUsers.includes(session.user.email)) {
        return <AccessDeniedPage />
      }
    }
  }

  return (
    <>
      <Flex direction="row">
        <NavBar session={session}/>
        <Box p={8} flex={1}>
          <Heading>Campaigns</Heading>
          <Center flexDir="column">
            <Button
              mb={10}
              rightIcon={<AddIcon />}
              colorScheme="brand"
              onClick={onOpen}
            >
              Create New Campaign
            </Button>
            <Stack
              direction="column"
              spacing={4}
              // h={650}
              overflowY="scroll"
              // display="flex"
              // flexDir="column"
              // flex={1}
            >
              {Array.from(Array(3)).map((i, j) => (
                <CampaignCard key={j} />
              ))}
            </Stack>
          </Center>
        </Box>
      </Flex>
      <CampaignModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export async function getServerSideProps(context) {
  const resSpecialUsers = await axios.get(
    `http://${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : "localhost:3000"
    }/api/specialUser`
  );
  const specialUsers = resSpecialUsers.data.map(u => u.email);
  return {
    props: {
      session: await getSession(context),
      specialUsers
    },
  };
}

export default Campaign;
