import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
	View,
	Text,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	TouchableOpacity
} from "react-native";
import {authStyles} from "@/assets/styles/auth.styles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen() {
	const router = useRouter();
	const {signIn, setActive, isLoaded} = useSignIn();
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	
	const handleSignIn = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please bro, masukan semua data");
		}
		
		if (!isLoaded) return;
		
		setLoading(true);
		
		try {
			const user = await signIn.create({
				identifier: email,
				password: password
			});
			
			if (user.status === "complete") {
				await setActive({session: user.createdSessionId})
			} else {
				Alert.alert("Error", "Login failed, please try agains.");
				console.error(JSON.stringify(user, null, 2));
			}
			
		} catch (error) {
			Alert.alert("Error", error.errors?.[0]?.message || "Login failed");
			console.error(JSON.stringify(error, null, 2));
		} finally {
			setLoading(false);
		}
		
	};
	
	return (
		<View style={authStyles.container}>
		  <KeyboardAvoidingView
			  style={authStyles.keyboardView}
				behavior={Platform.OS === "ios" ? "padding": "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64:0}
			>
			  <ScrollView
				  contentContainerStyle={authStyles.scrollContent}
					showVerticalScrollIndicator={false}
				>
				  
					<View style={authStyles.imageContainer}>
					  <Image 
						  source={require("../../assets/images/i1.png")}
							style={authStyles.image}
							contentFit="contain"
						/>
						<Text style={authStyles.title}>Welcome Back</Text>
						
						{/* Form CONTAINER */}
						<View style={authStyles.formContainer}>
						  <{/* email input */}
							<View style={authStyles.inputContainer}>
							  <TextInput
								  style={authStyles.textInput}
									placeholder="Enter Email"
									placeholderTextColor="#66D9D9"
									value={email}
									onChangeText={setEmail}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</View>
							
							{/* PASSWORD INPUT */}
							<View style={authStyles.inputContainer}>
							  <TextInput 
								  style={authStyles.textInput}
									placeholder="Enter Password"
									placeholderTextColor="#66D9D9"
									value={password}
									onChangeText={setPassword}
									secureTextEntry={!showPassword}
									autoCapitalize="none"
								/>
								
								<TouchableOpacity
								  style={authStyles.eyeButton}
									onPress={() => setShowPassword(!showPassword)}
								>
								  <Ionicons 
									  name={showPassword ? "eye-outline": "eye-off-outline"}
										size={20}
										color="#66D9D9"
									/>
								</TouchableOpacity>
							</View>
							
							{/* button login */}
							<TouchableOpacity
							  style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
								onPress={handleSignIn}
								disabled={loading}
								activeOpacity={0.8}
							>
							  <Text style={authStyles.buttonText}>
								  {loading ? "loading..." : "Login Account"}
								</Text>
							</TouchableOpacity>
							
							{/* sign up link */}
							<TouchableOpacity
							  style={authStyles.linkContainer}
								onPress={() => router.push("/(auth)/sign-up")}
							>
							  <Text style={authStyles.linkText}>
								  belum punya account? 
									<Text style={authStyles.link}>Daftar</Text>
								</Text>
							</TouchableOpacity>
						</View>
						
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};