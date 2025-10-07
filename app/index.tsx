import {
	View,
	Text,
	StyleSheet,
	Image
} from "react-native";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
	const router = useRouter();
	
	useEffect(() => {
		setTimeout(() => {
			router.push("/(auth)/welcome");
		}, 3000);
		
	}, []);
	
	return (
		<View style={styles.container}>
		  <Image 
			  style={styles.logo}
				resizeMode="contain"
				source={require("../assets/images/splashImage.png")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.neutral900
	},
	logo: {
		height: "20%",
		aspectRatio: 1
	}
});