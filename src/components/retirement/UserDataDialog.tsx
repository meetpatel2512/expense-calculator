"use client";

import { FormDataType } from "@/types/form";
import { PencilIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import ReturnsForm from "./ReturnsForm";

const DialogDemo = ({
  id,
  setResetKey,
}: {
  id: string | number;
  setResetKey: (key: number) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<FormDataType>({});

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
      <Dialog open={open} onOpenChange={() => setOpen(true)}>
        <DialogTrigger asChild>
          <PencilIcon className="h-4 w-4 m-2" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="hidden" />
          </DialogHeader>
          <ReturnsForm
            disabledForm={false}
            onChange={(data) => {
              setData(data);
            }}
            defaultData={old}
            className="p-0 shadow-none"
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={saveData}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogDemo;
