import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript
} from "next/document";

class MyDocument extends Document {
	
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		
		return initialProps;
	};
	
	render() {
		return (
			<Html>
			  <Head>
				  <link rel="stylesheet" href="/asstes/logo.png" />
				</Head>
				
				<body>
				  <Main />
					<NextScript />
				</body>
				
			</Html>
		);
	};
}

export default MyDocument;