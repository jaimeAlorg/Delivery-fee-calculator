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
    orderTime: any | Date;
    valueError: boolean;
    distanceError: boolean;
    nItemsError: boolean;
    dateError: boolean;
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

    let today = new Date(date);
    let nDay = today.getUTCDay();
    let time = today.getUTCHours();

    if (cartValue < 10) {
        totalFee = 10 - cartValue;
    } else if (cartValue >= 100) {
        return totalFee;
    }

    if (distance < 1000) {
        totalFee += 1;
    } else if (distance >= 1000) {
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
        orderTime: '',
        valueError: false,
        distanceError: false,
        nItemsError: false,
        dateError: false,
    });
    let [feeValue, setFeeValue] = useState<number | string>(0);

    let valid: boolean = true;
    let today: Date = new Date();

    const validation = (
        cartValue: number,
        distance: number,
        nItems: number,
        orderTime: Date
    ): boolean => {
        let checkVal: boolean = false,
            checkDist: boolean = false,
            checkItems: boolean = false,
            checkDate: boolean = false,
            orderDate = new Date(orderTime);

        if (!cartValue || cartValue <= 0) {
            checkVal = true;
            valid = false;
        }

        if (!distance || distance <= 0) {
            checkDist = true;
            valid = false;
        }

        if (!nItems || nItems <= 0) {
            checkItems = true;
            valid = false;
        }

        if (!orderTime || orderDate.getTime() < today.getTime()) {
            checkDate = true;
            valid = false;
        }

        if (checkVal || checkDist || checkItems || checkDate) {
            setMyCart({
                ...myCart,
                valueError: checkVal,
                distanceError: checkDist,
                nItemsError: checkItems,
                dateError: checkDate,
            });
        }

        return valid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMyCart({ ...myCart, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        valid = validation(
            myCart.cartValue!,
            myCart.distance!,
            myCart.nItems!,
            myCart.orderTime!
        );

        if (valid) {
            setFeeValue(
                feeCalc(
                    myCart.cartValue!,
                    myCart.distance!,
                    myCart.nItems!,
                    myCart.orderTime!
                )
            );
            setMyCart({
                ...myCart,
                valueError: false,
                distanceError: false,
                nItemsError: false,
                dateError: false,
            });
        } else {
            setFeeValue(0);
        }
    };

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack mx={'auto'} maxW={'lg'} w={{ base: '93%' }}>
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
                                    color={useColorModeValue(
                                        'blue.600',
                                        'blue.400'
                                    )}
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
                                            color: 'blue.500',
                                            fill: 'blue.500',
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
                                <Box pb='10px'>
                                    <FormControl id='cartValue' isRequired>
                                        <FormLabel>Cart value</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type='number'
                                                name='cartValue'
                                                min='0'
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
                                        {!myCart.valueError ? (
                                            ''
                                        ) : (
                                            <Text color='red.500'>
                                                Invalid cart value
                                            </Text>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box pb='10px'>
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
                                        {!myCart.distanceError ? (
                                            ''
                                        ) : (
                                            <Text color='red.500'>
                                                Invalid distance
                                            </Text>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box pb='10px'>
                                    <FormControl id='nItems' isRequired>
                                        <FormLabel>Amount of items</FormLabel>
                                        <Input
                                            type='number'
                                            name='nItems'
                                            value={myCart.nItems || ''}
                                            onChange={handleChange}
                                        />
                                        {!myCart.nItemsError ? (
                                            ''
                                        ) : (
                                            <Text color='red.500'>
                                                Invalid amount
                                            </Text>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box pb='10px'>
                                    <FormControl id='date' isRequired>
                                        <FormLabel>Order time</FormLabel>
                                        <Input
                                            type='datetime-local'
                                            name='orderTime'
                                            value={myCart.orderTime || ''}
                                            onChange={handleChange}
                                        />
                                        {!myCart.dateError ? (
                                            ''
                                        ) : (
                                            <Text color='red.500'>
                                                Invalid order time
                                            </Text>
                                        )}
                                    </FormControl>
                                </Box>

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
                                        color={useColorModeValue(
                                            'blue.500',
                                            'blue.400'
                                        )}
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
