import { CustomButtonProps } from "@/types";
import {
	StyleSheet,
	View,
	TouchableOpacity
} from "react-native";
import { colors, radius} from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Loading from "./loading";

export default function Button({
	style,
	onPress,
	loading=false,
	children
}: CustomButtonProps) {
	
	if (loading) {
		return (
			<View style={[styles.button, style, {backgroundColor: "transparent"}]}>
			  <Loading />
			</View>
		);
	}
	
	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
		  {children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: radius._17,
		borderCurve: "continuous",
		height: verticalScale(52)
	}
});