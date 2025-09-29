import { Text, View, Image, StyleSheet } from "react-native";
import colors from "./../constants/colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
				backgroundColor: colors.black
      }}
    >
      <Image source={require("./../assets/images/landing.png")} 
			  style={{
					width: "100%",
					height: 300,
					marginTop: 70,
				}}
			/>
			
			<View style={{
				padding: 25,
				backgroundColor: colors.primaryDark,
				height: "100%",
				borderTopLeftRadius: 35,
				borderTopRightRadius: 35,
			}}>
			  <Text style={{
					fontSize: 30,
					fontWeight: "bold",
					textAligns: "center",
					color: colors.white
				}}>
				  Welcome to Darline Guru
				</Text>
				
				<Text style={{
					fontSize: 20,
					color: colors.white,
					marginTop: 20,
					textAligns: "center",
				}}>
				  Transform your ideas into engaging educationals content effortlessly with AI. 📚
				</Text>
				
				<View style={styles.button}>
				  <Text style={styles.buttonText}>Get Started</Text>
				</View>
				<View style={styles.button}>
				  <Text style={styles.buttonText}>Already have an accounts?</Text>
				</View>
			</View>
			
    </View>
  );
};

const styles = StyleSheet.create({
	button: {
		padding: 15,
		backgroundColor: colors.primary,
		marginTop: 20,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		textAligns: "center",
		color: colors.white,
	},
});