"use client";
import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import Dropzone from "@/components/Dropzone";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";

const App = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;


  if (!user || error) {
    return <a href="/api/auth/login">Login</a>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Set to 100% of the viewport height
      }}
    >
      <Box
        className="navbar"
        display="flex"
        padding={1}
        position="absolute"
        top={0}
        height="2rem"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        width="100%"
      >
        <Box p={1} display="flex" alignItems="center" >
          {user.picture && (
            <Box mr={1}>
              <Image src={user.picture} alt="user-profile-photo" width={30} height={30} />
            </Box>
          )}
          <Box>
            <Link href="/api/auth/logout">Logout</Link>
          </Box>
        </Box>
      </Box>
      <Dropzone />
    </Box>
  );
};

export default App;
