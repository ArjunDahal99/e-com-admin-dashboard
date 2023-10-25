"use client";
import { StoreModal } from "@/components/modals/store-model";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/user-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);
  return null;
};

export default SetupPage;
