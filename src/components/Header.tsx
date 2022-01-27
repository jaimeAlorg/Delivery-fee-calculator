import React from 'react';
import {
    Heading,
    Container,
    Flex,
    Spacer,
    Icon,
    useColorMode,
} from '@chakra-ui/react';
import { BiSun, BiMoon } from 'react-icons/bi';

export const Header: React.FC<{}> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Container maxW={'4xl'}>
                <Flex py={{ base: 10, md: 20 }} px={{ base: 5, md: 5 }}>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={{ base: '60%', sm: '60%', md: '50%' }}
                        color={'blue.600'}
                    >
                        Delivery Fee Calculator
                    </Heading>
                    <Spacer />
                    <Icon
                        as={colorMode === 'light' ? BiMoon : BiSun}
                        w={{ base: '5', sm: '7', md: '10' }}
                        h={{ base: '5', sm: '7', md: '10' }}
                        onClick={toggleColorMode}
                        _hover={{
                            color: 'blue.600',
                            fill: 'blue.600',
                        }}
                    />
                </Flex>
            </Container>
        </>
    );
};
