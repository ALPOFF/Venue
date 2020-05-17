import React from 'react';
import {TextInput, View, Text} from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default function MyTextInput(props) {
    const {input, meta, ...inputProps} = props;

    const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
        'submitting', 'touched', 'valid', 'visited'];

    return (
        <>
            <TextInput
                {...inputProps}
                placeholder={'Email'}
                style={{
                    textAlign: 'center',
                    margin: 7,
                    width: '80%',
                    height: 40,
                    borderRadius: 3,
                    borderColor: '#543E85',
                    borderWidth: 1
                }}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
            />
            <Text>The {input.name} input is:</Text>
            {
                formStates.filter((state) => meta[state]).map((state) => {
                    return <Text key={state}> - {state}</Text>;
                })
            }
        </>
    );
}
