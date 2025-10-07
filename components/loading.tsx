import {
	View,
	ActivityIndicatorProps,
	ActivityIndicator
} from "react-native";
import { colors } from "@/constants/theme";

export default function Loading({
	size="large",
	color=colors.primary
}: ActivityIndicatorProps) {
	
	return (
		<View style={{
			flex:1,
			justifyContent:"center",
			alignItems: "center"
		}}>
		  <ActivityIndicator size={size} color={color} />
		</View>
	);
};