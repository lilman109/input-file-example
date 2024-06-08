import { ChangeEvent, useCallback, useRef, useState } from "react";
import "./App.css";
import { Box, FormLabel, Icon, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useConfirmModal } from "./useConfirmModal";

function App() {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const { isOpen, Modal, openModal, closeModal, selectedImage } =
    useConfirmModal();

  const addImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !e.target.files.length) {
        return;
      }
      const file = e.target.files[0];
      const image = new Image();
      image.src = URL.createObjectURL(file);
      setFilePreviews([...filePreviews, image.src]);
    },
    [filePreviews, setFilePreviews],
  );

  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100vh"
      spacing={4}
    >
      <VStack spacing={4} alignItems="center">
        {filePreviews.map((preview, index) => (
          <Box key={index} w="100%" display="flex" flexDir="column">
            <img src={preview} alt="preview" style={{ maxWidth: "100%" }} />
            <Icon
              alignSelf="flex-end"
              as={DeleteIcon}
              color="red.500"
              cursor="pointer"
              onClick={() => {
                openModal(preview);
              }}
            />
          </Box>
        ))}
      </VStack>
      <Box display="flex" justifyContent="center" w="100%">
        <FormLabel htmlFor="input-file" m={0} display="flex">
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            w="200px"
            h="40px"
            px={4}
            bg="blue.500"
            border="1px solid"
            borderColor="blue.500"
            borderRadius="base"
            color="white"
            cursor="pointer"
            textAlign="center"
          >
            Upload / Capture
          </Box>
        </FormLabel>
      </Box>
      <input
        ref={fileRef}
        id="input-file"
        type="file"
        accept="image/*"
        /* capture="user" or "environemnt"  モバイルカメラ*/
        style={{ display: "none" }}
        onChange={(e) => {
          addImage(e);
          // 同じファイルを追加したい場合
          /* if (fileRef.current) { */
          /*   console.log(fileRef.current); */
          /* } */
        }}
      />
      {isOpen && (
        <Modal
          title="確認"
          confirmButtonLabel="削除"
          handleConfirm={() => {
            setFilePreviews(
              filePreviews.filter(
                (imageUrl) => imageUrl !== selectedImage?.current,
              ),
            );
            //削除したばかりのファイルを追加したい場合
            /* if (fileRef.current) { */
            /*   fileRef.current.value = ""; */
            /* } */
            closeModal();
          }}
        />
      )}
    </VStack>
  );
}

export default App;
