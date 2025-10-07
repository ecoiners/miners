import { TypoProps } from "@/types";
import {
	Text
} from "react-native";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

export default function Typo({
	size,
	color=colors.text,
	fontWeight="400",
	children,
	style,
	textProps={}
}: TypoProps) {
	const textStyle: TextStyle = {
		fontSize: size ? verticalScale(size): verticalScale(18),
		color,
		fontWeight,
		
	};
	
	return (
		<Text style={[textStyle, style]} {...textProps}>
		  {children}
		</Text>
	);
};