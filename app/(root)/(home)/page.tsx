import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import { useTheme } from "@/context/ThemeProvider"

export default function Home() {
	// const { theme } = useTheme()
	// console.log(theme)
	return (
		<>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton afterSwitchSessionUrl="/"/>
			</SignedIn>
		</>
	)
}
