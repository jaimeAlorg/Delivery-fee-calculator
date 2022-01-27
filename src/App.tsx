import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Form } from './components/Form';

const App: React.FC = () => {
    return (
        <div>
            <ChakraProvider>
                <Form />
            </ChakraProvider>
        </div>
    );
};
export default App;
