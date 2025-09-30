import { Text, View, Image, StyleSheet, Platform, Dimensions} from "react-native";
import { colors } from "@/constants/theme";
//import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function Index() {
	//const router = useRouter();
	
	/*useEffect(() => {
		setTimeout(() => {
			router.push("/(auth)/welcome");
		}, 2000);
		
	}, []);*/
	
  return (
    <View style={styles.container}> 
		  <Image
			  style={styles.logo}
				source={require("../assets/images/alie.png")}
			/>
			
			<View>
			  <Text style={styles.welcome}>Welcome to A.L.I.E AI AGENT</Text>
				<Text style={styles.text1}>
				  Yout Ultimate AI Personal Agent to make life easer.
					Try it Today, Completely Free!
				</Text>
			</View>
			
			<View style={styles.button}>
			  <Text style={styles.buttonText}>
				  Get Started
				</Text>
			</View>
			
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: Platform.OS == "android" ? 30 : 40,
		justifyContent: "center",
		alignItems: "center"
	},
	logo: {
		witdh: Dimensions.get("screen").width * 0.85,
		height: 280,
		resizeMode: "contain",
		marginTop: 100,
	},
	welcome: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: colors.yellow500,
	},
	text1: {
		fontSize: 18,
		textAlign: "center",
		color: colors.gray300,
	},
	button: {
		width: "100%",
		backgroundColor: colors.yellow600,
		padding: 15,
		borderRadius: 12,
		marginTop: 50,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.gray300,
		
	}
});