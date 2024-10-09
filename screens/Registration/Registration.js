import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import BackButton from '../../components/BackButton/BackButton';
import style from './style';
import globalStyle from '../../assets/styles/globalstyle';
import {createUser} from '../../API/user';
import {Routes} from '../../navigation/Routes';

// Registration Component
/**
 * NAME
 *
 * Registration - A screen component that allows users to create a new account.
 *
 * SYNOPSIS
 *
 * Registration({ navigation })
 *  navigation      --> Object to navigate between screens.
 *
 * DESCRIPTION
 *
 * This functional component provides a form for users to enter their information (name, email, and password) to register.
 * If the registration is successful, the user is redirected to set their goals.
 * In case of an error (e.g., invalid email, password too short), an error message is displayed.
 *
 * RETURNS
 *
 *  JSX element representing the Registration screen, including input fields for name, email, password, and a button to register.
 */
const Registration = ({navigation}) => {
  // State variables to store user inputs and feedback messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      {/* Back Button Section */}
      <View style={style.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      {/* Main Content Container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        {/* Header Section */}
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Create an account!'} />
        </View>

        {/* Full Name Input Section */}
        <View style={globalStyle.marginBottom24}>
          <Input
            keyboardType={'default'}
            label={'First & Last Name'}
            placeholder={'Enter your full name...'}
            onChangeText={value => setFullname(value)}
          />
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

        {/* Display error message if registration fails */}
        {error.length > 0 && <Text style={style.error}> {error} </Text>}

        {/* Display success message if registration succeeds */}
        {success.length > 0 && <Text style={style.success}> {success} </Text>}

        {/* Registration Button Section */}
        <View style={globalStyle.marginBottom24}>
          <Button
            isDisabled={
              fullname.length <= 2 || email.length <= 5 || password.length <= 8
            } // Disable button if inputs are invalid
            title={'Register'}
            onPress={async () => {
              let user = await createUser(fullname, email, password); // Create user using API function
              if (user.error) {
                setError(user.error); // Set error message if registration fails
              } else {
                setError(''); // Clear error if registration succeeds
                setSuccess('You have successfully registered'); // Set success message
                setTimeout(() => {
                  // After 3 seconds, navigate to the Goals screen
                  navigation.navigate(Routes.Goals, {email: email}); // Pass email as a parameter to Goals screen
                }, 3000);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the Registration component for use in navigation
export default Registration;
