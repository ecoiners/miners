import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function TabsLayout() {
	const { isSignedIn } = useAuth();
	
	if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />
	
	return (
		
	);
};