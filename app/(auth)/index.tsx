import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";

export default function Index() {
	const isLoading = false;
	
	return (
		<View className="flex-1 bg-black">
		  <View className="flex-1 px-8 justify-between">
			  <View className="flex-1 justify-center">
				  
					{/* demo image */}
					<View className="items-center">
					  <Image 
						  source={require("../../assets/images/auth2.png")}
							resizeMode="contain"
							className="size-96"
						/>
					</View>
					
					{/* button start ✅*/}
					<View className="flex-col gap-2">
					  <TouchableOpacity 
						  className="flex-row items-center justify-center py-3 px-6 rounded-xl bg-yellow-600 text-white"
						  onPress={() => }
							disabled={isLoading}
							style={{
								shadowColor: "#fff",
								shadowOffset: {width: 0, height: 1},
								shadowOpacity: 0.1,
								shadowRadius: 2,
								evelation: 2
							}}
						>
						  {isLoading ? (
								<ActivityIndicator size="small" color="#fff" />
							) : (
								<View className="flex-row items-center justify-center">
									<Image source={require("../../assets/images/google.png")} resizeMode="contain" className="size-10 mr-3"/>
								  <Text className="text-white font-medium text-base">
										Continue With Google
								  </Text>
							  </View>
							)}
						</TouchableOpacity>
						
						<TouchableOpacity 
						  className="flex-row items-center justify-center py-3 px-6 rounded-xl bg-yellow-600 text-white"
						  onPress={() => }
							disabled={isLoading}
							style={{
								shadowColor: "#fff",
								shadowOffset: {width: 0, height: 1},
								shadowOpacity: 0.1,
								shadowRadius: 2,
								evelation: 2
							}}
						>
						  { isLoading ? (
								<ActivityIndicator size="small" color="#fff" />
							) : (
								<View className="flex-row items-center justify-center">
									<Image source={require("../../assets/images/apple.png")} resizeMode="contain" className="size-8 mr-3"/>
								  <Text className="text-white font-medium text-base">
										Continue With Apple
								  </Text>
							  </View>
							)}
						</TouchableOpacity>
					</View>
					{/* button end ❌*/}
					
					{/* Term and Policy start ✅*/}
					<Text className="text-center text-gray-500 leading-4 mt-6 px-2 text-xs">
					  By signing up, you agree to our 
						<Text className="text-green-500">Terms</Text>
						{","}
						<Text>Privacy Policy</Text>
						{", and "}
						<Text className="text-green-500">Cookie Use</Text>
					</Text>
					{/* Term and Policy end ❌*/}
					
				</View>
			</View>
		</View>
	);
};