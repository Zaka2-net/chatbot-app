import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import styles from "./index.module.css"; // Import the CSS module

interface Props {
  message: string;
}

const ErrorBanner: React.FC<Props> = ({ message }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <div className={styles.errorBannerContainer}>
      <Collapse in={open}>
        <Alert
          className={styles.errorBanner}
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default ErrorBanner;
