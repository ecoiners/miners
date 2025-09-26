"use client";

import {
	SignInButton,
	SignUpButton,
	UserButton
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
	Unauthenticated,
	Authenticated
} from "convex/react";

export default function Header() {
	
	return (
		<div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4">
		  <div className="backdrop-blur-md bg-white/10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 gap-2 border border-white/20 rounded-full">
			  <Unauthenticated>
					<SignInButton />
				  <SignUpButton>
						<Button >
							Login
					  </Button>
				  </SignUpButton>
			  </Unauthenticated>
			  
			  <Authenticated>
					<UserButton />
			  </Authenticated>
			</div>	
		</div>
	);
};