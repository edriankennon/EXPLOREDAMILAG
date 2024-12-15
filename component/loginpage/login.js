import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Linking } from 'react-native';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../../src/config/firebase'; 

const auth = getAuth(app);

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        // Load saved credentials if 'Remember Me' was checked
        const loadCredentials = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('email');
                const savedPassword = await AsyncStorage.getItem('password');
                if (savedEmail && savedPassword) {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Failed to load credentials:', error);
            }
        };
        loadCredentials();
    }, []);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = () => {
        if (!email || !password) {
            alert("All fields must be completed.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
                alert("Login successful!");
                if (rememberMe) {
                    AsyncStorage.setItem('email', email);
                    AsyncStorage.setItem('password', password);
                } else {
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('password');
                }
                navigation.navigate('WelcomeScreen');
            })
            .catch((error) => {
                const errorCode = error.code;

                // Log the error to get more information during development
                console.error("Login error code:", errorCode);
                console.error("Login error message:", error.message);

                switch (errorCode) {
                    case 'auth/invalid-email':
                        alert("Please enter a valid email address.");
                        break;
                    case 'auth/user-not-found':
                        alert("No user found with this email. Please check or sign up if you do not have an account.");
                        break;
                    case 'auth/wrong-password':
                        alert("The password you entered is incorrect. Please try again.");
                        break;
                    case 'auth/invalid-credential':
                        alert("Invalid credentials. Please double-check your email and password.");
                        break;
                    default:
                        alert(`Unexpected error: ${error.message}`);
                        break;
                }
            });
    };

    const handleSignUp = () => {
        navigation.navigate('SignUpScreen');
    };

    const handleForgotPassword = () => {
        alert('A link to reset your password will be sent to your email. (This feature is currently under development)');
    };

    const handleBusinessOwner = () => {
        alert('If you are a business owner, please click here to know more about our services. (This feature is currently under development)');
    };

    const handleOpenSocialMedia = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    alert('Unable to open this link.');
                }
            })
            .catch((err) => console.error('Error opening link:', err));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to!</Text>
            <Image source={require('../../assets/Exploredamilag.png')} style={styles.logo} />

            <View style={styles.inputGroup}>
                <FontAwesome name="envelope" size={20} color="green" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputGroup}>
                <FontAwesome5 name="lock" size={20} color="green" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePassword}>
                    <FontAwesome5 name={isPasswordVisible ? "eye-slash" : "eye"} size={20} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={styles.rememberMeContainerLeft}>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                    <FontAwesome
                        name={rememberMe ? "check-square" : "square-o"}
                        size={20}
                        color="green"
                    />
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBusinessOwner}>
                <Text style={styles.link}>If you are a business owner, Click Here!</Text>
            </TouchableOpacity>

            <View style={styles.socialLoginContainer}>
                <Text style={styles.socialLoginText}>Or Connect with</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity onPress={() => handleOpenSocialMedia('https://www.facebook.com')}>
                        <FontAwesome name="facebook" size={32} color="#4267B2" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpenSocialMedia('https://www.google.com')}>
                        <AntDesign name="google" size={32} color="#DB4437" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpenSocialMedia('https://www.instagram.com')}>
                        <FontAwesome name="instagram" size={32} color="#E4405F" style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        position: 'relative',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        height: 50,
        paddingLeft: 40,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 40,
        color: '#000',
    },
    icon: {
        position: 'absolute',
        left: 10,
    },
    togglePassword: {
        position: 'absolute',
        right: 10,
    },
    rememberMeContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    rememberMeText: {
        marginLeft: 10,
    },
    loginButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#28a745',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    signUpButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#28a745',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    socialLoginContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    socialLoginText: {
        marginBottom: 10,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialIcon: {
        marginHorizontal: 10,
    },
});
