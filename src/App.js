import * as React from "react";
import { Stack } from "@mui/material";
import Profile from "./components/Profile";
import Description from "./components/Description";
import ContactForm from "./components/ContactForm";
import SomeComponent from "./components/SomeComponent";

export default function App() {
  return (
    <Stack maxWidth="sm" direction="column" spacing={2} margin="auto" p={2}>
      <Profile />
      <Description />
      <SomeComponent />
      <ContactForm />
    </Stack>
  );
}
