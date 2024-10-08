import {  Box, Container, Button, FormControl, FormErrorMessage, FormLabel, Input, Grid, GridItem, VStack, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import React from 'react';
import Share from './Share';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return JSON.parse(localStorage.getItem('isSubmitted') || 'false');
  });
  const [isGenerated, setIsGenerated] = useState(() => {
    return JSON.parse(localStorage.getItem('isGenerated') || 'false');
  });
  const [markedButton, setMarkedButton] = useState<null | number>(() => {
    return JSON.parse(localStorage.getItem('markedButton') || 'null');
  });

  useEffect(() => {
    localStorage.setItem('isSubmitted', JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  useEffect(() => {
    localStorage.setItem('isGenerated', JSON.stringify(isGenerated));
  }, [isGenerated]);

  useEffect(() => {
    localStorage.setItem('markedButton', JSON.stringify(markedButton));
  }, [markedButton]);

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Name is required'
    } return error
  }

  function handleSubmit() {
    setIsSubmitted(true);
  }

  var arr = [];
    while(arr.length < 24){
      var r = Math.floor(Math.random() * 100) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
    }

  function handleGenerate() {
    setIsGenerated(!isGenerated);
  }

  function handleMark(index: number, event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setMarkedButton(index);
  }

  function Alert() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    function handleGenerateWithMarked() {
      setIsGenerated(!isGenerated);
      setMarkedButton(null);
    }
    return (
      <>
        <Button onClick={onOpen} colorScheme='blue'>Generate</Button>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to regenerate cards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button onClick={() => handleGenerateWithMarked()} colorScheme='red' ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <VStack
      spacing={4}
      align='center'
    >
      <Formik
          initialValues={{ name: '' }}
          onSubmit={() => handleSubmit()}
      >
        {() => (
          <Form>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Please enter your name</FormLabel>
                  <Input {...field} placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {isSubmitted &&
        <VStack
          spacing={4}
          align='stretch'
        >
          <Container maxW='md' bg='tomato' color='white'>
            <Box padding='4' color='tomato' maxW='md'>
              <Grid templateColumns='repeat(5, 1fr)' gap={2}>
                <GridItem fontSize='30px' w='100%' h='10' bg='tomato' color='white'>B</GridItem>
                <GridItem fontSize='30px' w='100%' h='10' bg='tomato' color='white'>I</GridItem>
                <GridItem fontSize='30px' w='100%' h='10' bg='tomato' color='white'>N</GridItem>
                <GridItem fontSize='30px' w='100%' h='10' bg='tomato' color='white'>G</GridItem>
                <GridItem fontSize='30px' w='100%' h='10' bg='tomato' color='white'>O</GridItem>
              </Grid>
              {isGenerated ?
                <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                  {arr.slice(0,12).map((index) =>
                    <GridItem key={index} w='100%' h='10' bg='white' >
                      <Button onClick={(e) => { handleMark(index, e) }} color={markedButton === index ? 'gray' : ''} border='0px' variant='ghost' fontSize='20px'>{index}</Button>
                    </GridItem>
                  )}
                  <GridItem w='100%' h='10' bg='white' color='tomato'>
                    <Button color='tomato' border='0px' variant='ghost' fontSize='10px'>FREE</Button>
                  </GridItem>
                  {arr.slice(12,24).map((index) =>
                    <GridItem key={index} w='100%' h='10' bg='white' >
                      <Button onClick={(e) => { handleMark(index, e) }} color={markedButton === index ? 'gray' : ''} border='0px' variant='ghost' fontSize='20px'>{index}</Button>
                    </GridItem>
                  )}
                </Grid>
                : <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' color='tomato'>
                    <Button color='tomato' border='0px' variant='ghost' fontSize='10px'>FREE</Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                  <GridItem w='100%' h='10' bg='white' >
                      <Button color='tomato' border='0px' variant='ghost' fontSize='20px'></Button>
                  </GridItem>
                </Grid>
              }
            </Box>
          </Container>
          {!!markedButton ? <Alert />
            : <Button onClick={() => handleGenerate()} colorScheme='blue'>Generate</Button>
          }
          <Share />
        </VStack>
      }
    </VStack>
  )
}

export default App
