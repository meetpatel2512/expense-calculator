"use client";

import { FormDataType } from "@/types/form";
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ReturnsForm from "./ReturnsForm";
import React, { useMemo } from "react";
import { PencilIcon } from "lucide-react";

const DialogDemo = ({
  id,
  setResetKey,
}: {
  id: string | number;
  setResetKey: (key: number) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<FormDataType>({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const old = useMemo(
    () =>
      open &&
      JSON.parse(
        JSON.parse(localStorage.getItem("userData") || "{}")[id] ||
          localStorage.getItem("staticData")
      ),
    [open]
  );

  const saveData = () => {
    const oldData = localStorage.getItem("userData");

    if (oldData) {
      const parsedData = JSON.parse(oldData);
      parsedData[id] = JSON.stringify(data);
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem(
        "userData",
        JSON.stringify({ [id]: JSON.stringify(data) })
      );
    }
    setResetKey(Math.random());
    handleClose();
  };

  return (
    <>
      <Button
        size="small"
        variant="text"
        sx={{
          minWidth: "auto",
        }}
        onClick={handleClickOpen}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogContent sx={{ p: 0 }}>
            <ReturnsForm
              disabledForm={false}
              onChange={(data) => {
                setData(data);
              }}
              defaultData={old}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={saveData}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DialogDemo;
