import React, { useState } from "react";
import {
  Alert,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Stack,
} from "@mui/material";
import HCaptcha from "@hcaptcha/react-hcaptcha";

function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    "h-captcha-response": "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [loading, setLoading] = useState(false);

  const onHCaptchaChange = (token) => {
    setFormData((prev) => ({
      ...prev,
      "h-captcha-response": token,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "53fc192e-32f8-43ff-a7b3-ddbc1443939f", // Get your access key from https://web3forms.com/
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSnackbarMessage(
          "Din melding har blitt sendt! Takk for at du kontaktet oss."
        );
        setSnackbarType("success");
        setFormData({ email: "", message: "" });
      } else {
        setSnackbarMessage("Noe gikk galt. Prøv igjen senere.");
        setSnackbarType("error");
      }
    } catch (error) {
      setSnackbarMessage("Noe gikk galt. Prøv igjen senere.");
      setSnackbarType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={5} bgcolor="#ffffff" borderRadius={3} boxShadow={3} mt={4} px={3}>
      <Typography variant="h6" gutterBottom color="#3f51b5">
        Kontakt Meg
      </Typography>

      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <TextField
          label="Din e-post"
          variant="filled"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          type="email"
        />
        <TextField
          label="Melding"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
          type="text"
        />
        <HCaptcha
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          onVerify={onHCaptchaChange}
        />
        <Stack justifyContent="flex-end" alignItems="flex-end">
          <Button
            type="submit"
            variant="filled"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage("")}
      >
        <Alert
          onClose={() => setSnackbarMessage("")}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactForm;
