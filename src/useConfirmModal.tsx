import {
  Button,
  Center,
  HStack,
  Modal as ChakraModal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FC, PropsWithChildren, useCallback, useRef } from "react";

type Props = {
  title: string;
  cancelButtonLabel?: string;
  confirmButtonLabel: string;
  handleConfirm: () => void;
};

export const useConfirmModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedImage = useRef<string | null>(null);

  const openModal = useCallback(
    (imageUrl: string) => {
      selectedImage.current = imageUrl; // どの画像のモーダルかを判別するために画像のURLを保持
      onOpen();
    },
    [onOpen],
  );

  const closeModal = useCallback(() => {
    selectedImage.current = null;
    onClose();
  }, [onClose]);

  const Modal: FC<PropsWithChildren<Props>> = ({
    title,
    cancelButtonLabel = "キャンセル",
    confirmButtonLabel,
    handleConfirm,
    children,
    ...props
  }) => (
    <ChakraModal
      {...props}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={"sm"}
    >
      <ModalOverlay />
      <ModalContent px={5} py={6}>
        <VStack spacing={4}>
          <ModalHeader p={0} fontSize={"md"}>
            <Center>{title}</Center>
          </ModalHeader>
          <ModalFooter p={0}>
            <HStack justifyContent={"center"} w={"100%"} spacing={4}>
              <Button
                w={144}
                onClick={onClose}
                type="button"
                variant="outline"
                color={"blue.500"}
              >
                {cancelButtonLabel}
              </Button>
              <Button
                w={144}
                onClick={handleConfirm}
                type="button"
                variant={"solid"}
                colorScheme="red"
                bg={"red.500"}
                color={"white"}
              >
                {confirmButtonLabel}
              </Button>
            </HStack>
          </ModalFooter>
        </VStack>
      </ModalContent>
    </ChakraModal>
  );

  return {
    isOpen,
    Modal,
    openModal,
    closeModal,
    selectedImage,
  };
};
