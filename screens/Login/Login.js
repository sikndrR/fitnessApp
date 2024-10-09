import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Pressable, View, Text} from 'react-native';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import style from './style';
import {Routes} from '../../navigation/Routes';
import {loginUser} from '../../API/user';
import {useDispatch} from 'react-redux';
import {logIn} from '../../redux/reducers/User';
import globalStyle from '../../assets/styles/globalstyle';

// Login Component
/**
 * NAME
 *
 * Login - A screen component that allows users to log into their account.
 *
 * SYNOPSIS
 *
 * Login({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides a form for users to enter their credentials (email and password) to log in.
 * If the login credentials are correct, the user is redirected to their account. In case of incorrect credentials, an error is displayed.
 * Users can also navigate to the registration screen if they do not have an account.
 *
 * RETURNS
 *
 *  JSX element representing the Login screen, including input fields for email and password and a button to log in.
 */
const Login = ({navigation}) => {
  // State variables to store email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      {/* Main container with scroll view */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        {/* Header Section */}
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Welcome Back'} />
        </View>

        {/* Email Input Section */}
        <View style={globalStyle.marginBottom24}>
          <Input
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'Enter your email...'}
            onChangeText={value => setEmail(value)}
          />
        </View>

        {/* Password Input Section */}
        <View style={globalStyle.marginBottom24}>
          <Input
            secureTextEntry={true}
            label={'Password'}
            placeholder={'******'}
            onChangeText={value => setPassword(value)}
          />
        </View>

        {/* Display error message if login fails */}
        {error.length > 0 && <Text style={style.error}> {error} </Text>}

        {/* Login Button Section */}
        <View style={globalStyle.marginBottom24}>
          <Button
            onPress={async () => {
              // Attempt to log in the user
              let user = await loginUser(email, password);
              if (!user.status) {
                setError(user.error); // Set error message if login fails
              } else {
                setError(''); // Clear error if login succeeds
                dispatch(logIn(user.data)); // Dispatch login action to Redux store
              }
            }}
            title={'Login'}
            isDisabled={email.length < 5 || password.length < 8} // Disable button if input is invalid
          />
        </View>

        {/* Registration Button Section */}
        <Pressable
          style={style.registrationButton}
          onPress={() => navigation.navigate(Routes.Registration)} // Navigate to Registration screen
        >
          <Header color={'#156CF7'} type={3} title={"Don't have an account?"} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the Login component for use in navigation
export default Login;
