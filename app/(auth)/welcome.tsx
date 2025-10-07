import ScreenWrapper from "@/components/screen-wrapper";
import Typo from "@/components/typo";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image
} from "react-native";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY, radius } from "@/constants/theme";
import Animated, { FadeIn} from "react-native-reanimated";

export default function Welcome() {
	
	return (
		<ScreenWrapper>
		  <View style={styles.container}>
			
			  {/* login button and image START ✅*/}
				<View>
				  <TouchableOpacity style={styles.loginButton}>
					  <Typo fontWeight="500">
						  Sign In
						</Typo>
					</TouchableOpacity>
					
					<Animated.Image 
					  entering={FadeIn.duration(500)}
					  source={require("../../assets/images/welcome.png")}
						style={styles.welcomeImage}
						resizeMode="contain"
					/>
				</View>
				{/* login button and image END ❌*/}
				
				{/* footer start ✅ */}
				<View style={styles.footer}>
				  <Animated.View entering={FadeInDown.duration(1000).springify().damping(12)} style={{alignItems:"center"}}>
					
					  <Typo size={30} fontWeight="800">
						  A.L.I.E WALLET CRYPTO
						</Typo>
						<Typo size={30} fontWeight="800">
						  AND EARNING COINS ☢️
						</Typo>
						
					</Animated.View>
					
					<Animated.View entering={FadeInDown.duration(1000).delay(100).springify().damping(12)} style={{alignItems: "center", gap:2}}>
					  <Typo size={17} color={colors.textLight}>
						  alie adalah applikasi earning coin
						</Typo>
						<Typo size={17} color={colors.textLight}>
						  dan mendukung wallet alie jaringan blockchains.
						</Typo>
					</Animated.View>
					
					<Animated.View entering={FadeInDown.duration(1000).delay(200).springify().damping(12)} style={styles.buttonContainer}>
					  <Button>
						  <Typo size={22} color={color.neutral900} fontWeight="600">
							  Get Started
							</Typo>
						</Button>
					</Animated.View>
				</View>
				{/* footer end ❌ */}
				
			</View>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingTop: spacingY._7
	},
	welcomeImage: {
		width: "100%",
		height: verticalScale(300),
		alignSelf: "center",
		marginTop: verticalScale(100)
	},
	loginButton: {
		alignSelf: "flex-end",
		marginRight: spacingX._20
	},
	footer: {
		backgroundColor: colors.neutral900,
		alignItems: "center",
		paddingTop: verticalScale(30),
		paddingBottom: verticalScale(45),
		gap: spacingY._20,
		shadowColor: "white",
		shadowOffset: {width: 0, height: -10},
		elevation: 10,
		shadowRadius: 25,
		shadowOpacity: 0.15,
	},
	buttonContainer: {
		width: "100℅",
		paddingHorizontal: spacingX._25
	}
});