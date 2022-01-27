import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { CardActionArea } from '@mui/material';
import React, { useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

interface ICart {
    cartValue: number | undefined;
    distance: number | undefined;
    nItems: number | undefined;
}

export const Form: React.FC<ICart> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const myCart: ICart = {
        cartValue: undefined,
        distance: undefined,
        nItems: undefined,
    };

    // const [myCart, setMyCart] = useState<ICart>({
    //     cartValue: undefined,
    //     distance: undefined,
    //     nItems: undefined,
    // });

    //let patata;

    // const hadleChangeCart = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     myCart.cartValue = e.target.value;
    // };

    //Aqui rellenamos la variable
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.target.name = e.target.value;
    // };

    //Hacemos un console log y la logica
    // const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {};

    // };

    let feeValue: number;
    feeValue = 0;

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack mx={'auto'} maxW={'lg'}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'xl'}
                        p={8}
                    >
                        <Stack spacing={4} maxW={'lg'}>
                            <HStack>
                                <Heading
                                    fontWeight={600}
                                    fontSize={{
                                        base: '2xl',
                                        sm: '3xl',
                                        md: '3xl',
                                    }}
                                    color={'blue.600'}
                                >
                                    Delivery Fee Calculator
                                </Heading>
                                <Spacer />
                                <Box pt={'10px'}>
                                    <Icon
                                        as={
                                            colorMode === 'light'
                                                ? BiMoon
                                                : BiSun
                                        }
                                        w={{ base: '5', sm: '7', md: '7' }}
                                        h={{ base: '5', sm: '7', md: '7' }}
                                        onClick={toggleColorMode}
                                        _hover={{
                                            color: 'blue.600',
                                            fill: 'blue.600',
                                        }}
                                        cursor='pointer'
                                    />
                                </Box>
                            </HStack>
                            <form autoComplete='off' noValidate>
                                <Box>
                                    <FormControl id='cartValue' isRequired>
                                        <FormLabel>Cart value</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type='number'
                                                value={patata}
                                                onChange={handleChange}
                                            />
                                            <InputRightElement
                                                pointerEvents='none'
                                                color={useColorModeValue(
                                                    'black',
                                                    'gray.200'
                                                )}
                                                fontSize='1.2em'
                                                children='€'
                                                pr={'16px'}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id='distance' isRequired>
                                        <FormLabel>Delivery distance</FormLabel>
                                        <InputGroup>
                                            <Input type='number' />
                                            <InputRightElement
                                                pointerEvents='none'
                                                color={useColorModeValue(
                                                    'black',
                                                    'gray.200'
                                                )}
                                                fontSize='1.2em'
                                                children='m'
                                                pr={'16px'}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>

                                <FormControl id='nItems' isRequired>
                                    <FormLabel>Amount of items</FormLabel>
                                    <Input type='number' />
                                </FormControl>
                                <FormControl id='date' isRequired>
                                    <FormLabel>Date and Time</FormLabel>
                                    <Input type='datetime-local'></Input>
                                </FormControl>
                                <HStack pt={2}>
                                    <Button
                                        loadingText='Submitting'
                                        size='lg'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                    >
                                        Calculate
                                    </Button>
                                    <Spacer />
                                    <Text
                                        color='blue.500'
                                        fontSize={{
                                            base: 'md',
                                            sm: 'lg',
                                            md: 'lg',
                                        }}
                                        pr={'5px'}
                                    >
                                        Delivery price: 2€
                                    </Text>
                                </HStack>
                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};
