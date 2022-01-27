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
import React, { useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

interface Cart {
    cartValue: number | null;
    distance: number | null;
    nItems: number | null;
    date: any | null | Date;
}

function feeCalc(
    cartValue: number,
    distance: number,
    nItems: number,
    date: Date
): number | string {
    let totalFee: number = 0;
    let extraItems: number;
    let extraDistance: number;

    //SEPARATES TIME AND DAY
    var today = new Date(date);
    var nDay = today.getDay();
    var time = today.getHours();

    if (cartValue < 10) {
        totalFee = 10 - cartValue;
    } else if (cartValue >= 100) {
        return totalFee;
    }

    if (distance < 1000) {
        totalFee += 1;
    } else if (distance > 1000) {
        extraDistance = distance - 1000;

        totalFee += 2 + Math.ceil(extraDistance / 500);
    }

    if (nItems > 4) {
        extraItems = nItems - 4;
        totalFee += extraItems * 0.5;
    }

    if (nDay === 5 && time >= 15 && time <= 19) {
        totalFee *= 1.1;
    }

    if (totalFee > 15) {
        totalFee = 15;
    }

    return totalFee.toFixed(2);
}

export const Form: React.FC<{}> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    let [myCart, setMyCart] = useState<Cart>({
        cartValue: null,
        distance: null,
        nItems: null,
        date: new Date(),
    });
    let [feeValue, setFeeValue] = useState<number | string>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMyCart({ ...myCart, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFeeValue(
            feeCalc(
                myCart.cartValue!,
                myCart.distance!,
                myCart.nItems!,
                myCart.date!
            )
        );
    };

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
                            <form
                                autoComplete='off'
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <FormControl id='cartValue' isRequired>
                                    <FormLabel>Cart value</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type='number'
                                            name='cartValue'
                                            value={myCart.cartValue || ''}
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

                                <FormControl id='distance' isRequired>
                                    <FormLabel>Delivery distance</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type='number'
                                            name='distance'
                                            value={myCart.distance || ''}
                                            onChange={handleChange}
                                        />
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

                                <FormControl id='nItems' isRequired>
                                    <FormLabel>Amount of items</FormLabel>
                                    <Input
                                        type='number'
                                        name='nItems'
                                        value={myCart.nItems || ''}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl id='date' isRequired>
                                    <FormLabel>Date and Time</FormLabel>
                                    <Input
                                        type='datetime-local'
                                        name='date'
                                        value={myCart.date || ''}
                                        onChange={handleChange}
                                    ></Input>
                                </FormControl>

                                <HStack pt={2}>
                                    <Button
                                        type='submit'
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
                                        Delivery price: {feeValue}€
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
