
import React, { FC, useCallback, useState, Dispatch, SetStateAction } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "../../context/NetworkConfigurationProvider";
import { AiOutlineClose } from "react-icons/ai";
import Branding from "../../components/Branding";
import InputView from "../input";

interface CreateViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

const CreateView: FC<CreateViewProps> = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  // Upload metadata ke Pinata
  const uploadMetadata = async (token: any): Promise<string> => {
    const { name, symbol, description, image } = token;
    //if (!name || !symbol || !description || !image) {
		//	notify({ type: "error", message: "Lengkapi semua data token!" });
 //   }
		
    setIsLoading(true);
    try {
      const data = JSON.stringify({ name, symbol, description, image });
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch {
      notify({ type: "error", message: "Gagal upload metadata ke IPFS 😭" });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImagePinata = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch {
      notify({ type: "error", message: "Upload gambar gagal 😭" });
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imgUrl = await uploadImagePinata(file);
    if (imgUrl) setToken({ ...token, image: imgUrl });
  };

  // Fungsi utama buat token
  const createToken = useCallback(async (token: any) => {
    if (!publicKey) return notify({ type: "error", message: "Hubungkan wallet Anda!" });

    setIsLoading(true);
    try {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

      const metadataUrl = await uploadMetadata(token);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      )[0];

      const createMetadataIx = createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: mintKeypair.publicKey,
          mintAuthority: publicKey,
          payer: publicKey,
          updateAuthority: publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: token.name,
              symbol: token.symbol,
              uri: metadataUrl,
              creators: null,
              sellerFeeBasisPoints: 0,
              uses: null,
              collection: null,
            },
            isMutable: false,
            collectionDetails: null,
          },
        }
      );

      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(token.decimals),
          publicKey,
          publicKey
        ),
        createAssociatedTokenAccountInstruction(
          publicKey,
          tokenATA,
          publicKey,
          mintKeypair.publicKey
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey,
          Number(token.amount) * Math.pow(10, Number(token.decimals))
        ),
        createMetadataIx
      );

      const signature = await sendTransaction(tx, connection, { signers: [mintKeypair] });
      setTokenMintAddress(mintKeypair.publicKey.toString());

      notify({
        type: "success",
        message: "Token berhasil dibuat 🎉",
        txid: signature,
      });
    } catch {
      notify({ type: "error", message: "Gagal membuat token 😭" });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-8 mx-4 max-w-sm w-full border border-slate-700">
            <div className="flex flex-col items-center">
              <ClipLoader size={40} color="#10b981" />
              <p className="mt-4 text-white font-semibold">Membuat token...</p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Mohon tunggu dan jangan tutup halaman
              </p>
            </div>
          </div>
        </div>
      )}

      {!tokenMintAddress ? (
        <section className="flex w-full items-center py-6 px-4 lg:p-10 lg:h-screen">
          <div className="container mx-auto max-w-5xl bg-slate-800/50 backdrop-blur-2xl rounded-2xl overflow-hidden">
            <div className="grid gap-10 lg:grid-cols-2">

              <div className="flex flex-col p-8 lg:p-10">
                <h4 className="mb-4 text-2xl font-bold text-white">
                  ECROP 100 - Buat Token
                </h4>
                <p className="text-gray-300 mb-8 text-sm">
                  Lengkapi detail token di bawah ini untuk mulai membuat token baru.
                </p>

                <InputView
                  name="Nama Token"
                  placeholder="contoh: Joni Strong"
                  clickHandle={(e) => handleFormFieldChange("name", e)}
                />
                <InputView
                  name="Symbol"
                  placeholder="contoh:JOS"
                  clickHandle={(e) => handleFormFieldChange("symbol", e)}
                />
                <InputView
                  name="Decimals"
                  placeholder="contoh: 9"
                  clickHandle={(e) => handleFormFieldChange("decimals", e)}
                />
                <InputView
                  name="Total Supply"
                  placeholder="contoh: 1000000000"
                  clickHandle={(e) => handleFormFieldChange("amount", e)}
                />

                <div className="my-3">
                  <label className="text-gray-300 font-semibold block mb-2">
                    Gambar Token
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-transparent focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => createToken(token)}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    Buat Token Sekarang
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setOpenCreateModal(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition"
                  >
                    <AiOutlineClose className="text-white text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
				// setela berhasil buat token
				<section className="flex w-full items-center py-6 px-4 lg:h-screen lg:p-10 ">
          
            <div className="container bg-slate-800/50 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl shadow-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* === BRANDING === */}
                <Branding
                  image="/assets/branding.png"
                  title="Token Berhasil Dibuat 🎉"
                  message="Selamat! Token Anda telah dibuat dan siap digunakan di jaringan Solana. Lihat detail token di bawah ini."
                />
        
                {/* === KONTEN HASIL === */}
                <div className="flex flex-col justify-center p-8 lg:p-10 text-center">
                  {/* Logo 
                  <div className="pb-6 flex justify-center">
                    <img src="/assets/logo.png" alt="logo" className="h-12" />
                  </div>*/}
        
                  {/* Judul */}
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    ECROP 100 - Token Created
                  </h4>
        
                  <p className="text-gray-300 mx-auto mb-6 max-w-sm text-sm">
                      Token Anda berhasil dibuat di jaringan Solana. Salin alamat token atau buka di
                      Solana Explorer untuk melihat detailnya.
                  </p>
        
                  {/* Gambar token */}
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src={token.image || "/assets/logo.png"}
                      alt="token"
                      className="h-32 w-32 rounded-full border-1 border-green-500 shadow-lg object-cover"
                    />
                  </div>
        
                  {/* Alamat Token */}
                  <div className="bg-slate-900/60 rounded-lg p-3 mb-4">
                    <p className="text-green-400 font-mono text-xs sm:text-sm break-all">
                      {tokenMintAddress}
                    </p>
                  </div>
        
                  {/* Tombol Copy */}
                  <button
                    onClick={() => navigator.clipboard.writeText(tokenMintAddress)}
                    className="text-sm font-semibold text-teal-400 hover:text-green-400 mb-6 transition"
                  >
                    Salin Alamat
                  </button>
        
                  {/* Tombol Explorer */}
                  <a
                    href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition px-6 py-2 rounded-lg text-white font-semibold w-full inline-flex justify-center items-center"
                  >
                    Lihat di Solana Explorer
                  </a>
        
                  {/* Tombol Tutup */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setOpenCreateModal(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition"
                    >
                      <AiOutlineClose className="text-white text-xl" />
                    </button>
                  </div>
									
                </div>
              </div>
            </div>
          
        </section>
      )}
    </>
  );
};

export default CreateView;

/* V 1

versi simpel branding
        <section className="flex w-full items-center py-6 px-4 lg:p-10">
          <div className="container mx-auto max-w-4xl bg-slate-800/50 backdrop-blur-2xl rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              ECROP 100 - Token Berhasil Dibuat 🎉
            </h3>
            <p className="text-gray-300 mb-6 text-sm">
              Berikut adalah alamat token Anda di jaringan {networkConfiguration}.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <p className="text-green-400 font-mono text-sm break-all">
                {tokenMintAddress}
              </p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(tokenMintAddress)}
              className="text-sm font-semibold text-teal-400 hover:text-green-400 mb-6"
            >
              Salin Alamat
            </button>

            <div className="flex flex-col gap-3 items-center">
              <a
                href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg text-white font-semibold"
              >
                Lihat di Solana Explorer
              </a>
            </div>
          </div>
        </section>
				

import React, { FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	Keypair,
	PublicKey,
	SystemProgram,
	Transaction
} from "@solana/web3.js";
import {
	MINT_SIZE,
	TOKEN_PROGRAM_ID,
	createInitializeMintInstruction,
	getMinimumBalanceForRentExamptMint,
	getAssociatedTokenAddress,
	createMintToInstruction,
	createAssociatedTokenAccountInstruction
} from "@solana/spl-token";
import { 
	PROGRAM_ID,
	createCreateMetadataAccountV3Instruction,
	createCreateMatadataAccountInstruction
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "../../context/NetworkConfigurationProvider";

import { AiOutlineClose } from "react-icons/ai";
import CreateSVG from "../../components/SVG/CreateSVG";
import BrandingView from "../../components/Branding";
import InputView from "../input/index";

interface CreateViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

const CreateView: FC<CreateViewProps> = ({setOpenCreateModal}) => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet;
	const { networkConfiguration } = useNetworkConfiguration();
	
	const [tokenUri, setTokenUri] = useState("");
	const [tokenMintAddress, setTokenMintAddress] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	
	const [token, setToken] = useState({
		name: "",
		symbol: "",
		decimals: "",
		amount: "",
		image: "",
		description: ""
	});
	
	const handleFormFieldChange = (fieldName, e) => {
		setToken({...token, [fieldName]: e.target.value});
	};
	
	const createToken = useCallback(
		async (token) => {
			const lamports = await getMinimumBalanceForRentExamptMint(connection);
			const mintKeypair = Keypair.generate();
			const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);
			
			try {
				const metadataUrl = await uploadMetadata(token);
				// console.log(metadataUrl);
				
				const createMatadataInstruction = createCreateMetadataAccountV3Instruction(
					{
						metadata: PublicKey.findProgramAddressSync(
							[
								Buffer.from("metadata"),
								PROGRAM_ID.toBuffer(),
								mintKeypair.publicKey.toBuffer()
							],
							PROGRAM_ID
						)[0],
						mint: mintKeypair.publicKey,
						mintAuthority: publicKey,
						payer: publicKey,
						updateAuthority: publicKey
					},
					{
						createMatadataAccountArgsV3: {
							data: {
								name: token.name,
								symbol: token.symbol,
								uri: metadataUrl,
								creators: null,
								sellerFeeBasisPoints: 0,
								uses: null,
								collection: null,
							},
							isMutable: false,
							collectionDetails: null,
						},
					}
				);
				
				const createNewTokenTransaction = new Transaction().add(
					SystemProgram.createAccount({
						fromPubKey: publicKey,
						newAccountPubKey: mintKeypair.publicKey,
						space: MINT_SIZE,
						lamports: lamports,
						programId: TOKEN_PROGRAM_ID
					}),
				  createInitializeMintInstruction(
						mintKeypair.publicKey,
						Number(token.decimals),
						publicKey,
						publicKey,
						TOKEN_PROGRAM_ID
					),
					createAssociatedTokenAccountInstruction(
						publicKey,
						tokenATA,
						publicKey,
						mintKeypair.publicKey
					),
					createMintToInstruction(
						mintKeypair.publicKey,
						tokenATA,
						publicKey,
						Number(token.amount) * Math.pow(10, Number(token.decimals))
					),
					createMatadataInstruction
				);
				
				const signature = await sendTransaction(
					createNewTokenTransaction,
					connection,
					{
						signers: [mintKeypair]
					}
				);
				
				setTokenMintAddress(mintKeypair.publicKey.toString());
				notify({
					type: "success",
					message: "Token create successfully🥳✅",
					txid: signature
				})
			} catch (error: any) {
				notify({type: "error", message: "Token create failed😭❌"});
			}
			setIsLoading(false);
		},
		[publicKey, connection, sendTransaction]
	);
	
	// image upload ipfs
	const handleImageChange = async (event) => {
		const file = event.target.files[0];
		
		if (file) {
			const imgUrl = await uploadImagePinata(file);
			setToken({...token, image: imgUrl });
		}
	};
	
	const uploadImagePinata = async (file) => {
		if (file) {
			try {
				const formData = new FormData();
				formData.append("file", file);
				
				const response = await axios({
					method: "post",
					url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
					data: formData,
					headers: {
						pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
						pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY ,
						"Content-Type": "multipart/form-data"
					},
				});
				
				const imgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
				
				return imgHash;
			} catch (error: any) {
				notify({type: "error", message: "Upload image failed😭😭"});
			}
			
			setIsLoading(false);
		}
	};
	
	const uploadMetadata = async (token) => {
		setIsLoading(true);
		
		const {name, symbol, description, image} = token;
		
		if (!name || !symbol || !description || !image) return notify({type: "error", message: "Data is missing"});
		
		const data = JSON.stringify({
			name: name,
			symbol: symbol,
			description: description,
			image: image
		});
		
		try {
			  const response = await axios({
					method: "POST",
					url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
					data: data,
					headers: {
						pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
						pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY ,
						"Content-Type": "application/json"
					},
				});
				
				const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
				return url;
				
		} catch (error: any) {
			notify({type: "error", message: "Upload to pinata Json failed😭"});
		}
		
		setIsLoading(false);
	};
	
	return (
		<>
		  {isLoading && (
				<div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-slate-900/70 backdrop-blur-[10px]">
				  <ClipLoader />
				</div>
			)}
			
			{tokenMintAddress ? (
				<section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
				  <div className="container">
					  <div className="bg-slate-500/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
						  <div className="grid gap-10 lg:grid-cols-2">
							  <div className="ps-4 hidden py-4 pt-10 lg:block">
								  <div className="upload relative w-full overflow-hidden rounded-xl">
									  {
											token.image ? (
												<img src={token.image} alt="token" className="w-2/5" />
											) : (
												<label htmlFor="file" className="custum-file-upload">
												  <div className="icon">
													  <CreateSVG />
													</div>
													<div className="text">
													  <span>
														  Click to upload image
														</span>
													</div>
													<input 
													  type="file"
														id="file"
														onChange={handleImageChange}
													/>
												</label>
											)
										}
									</div>
									
									<textarea 
									  rows="6" 
										placeholder="description token you..."
									  className="border-gray-200 relative mt-48 block w-full rounded bg-transparent py-1.5 px-3 text-white focud:border-gray-100 focus:ring-transparent"
									  onChange={(e) => handleFormFieldChange("description", e)}
									>
									
									</textarea>
								</div>
								
								<div className="lg:ps-0 flex flex-col p-10">
								  <div className="pb-6 my-auto">
									  <h4 className="mb-4 text-2xl font-bold text-white">
											Solana Token Creator
										</h4>
										<p className="text-gray-300 max-w-sm mb-8">
										  kindly provide all the details about your token.
										</p>
										
										<div className="text-start">
										  <InputView
											  name="Name"
												placeholder="name"
												clickHandle={(e) => handleFormFieldChange("name", e)}
											/>
											<InputView
											  name="Symbol"
												placeholder="symbol"
												clickHandle={(e) => handleFormFieldChange("symbol", e)}
											/>
											<InputView
											  name="Decimals"
												placeholder="decimals"
												clickHandle={(e) => handleFormFieldChange("decimals", e)}
											/>
											<InputView
											  name="Amount"
												placeholder="amount"
												clickHandle={(e) => handleFormFieldChange("amount", e)}
											/>
											
											<div className="mb-6 text-center ">
											  <button
													type="submit"
												  onClick={() => createToken(token)}
													className="mt-5 group bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-500 w-full inline-flex items-center justify-center rounded-lg px-6 py-2 backdrop-blur-2xl font-bold"
												>
												  Buat Token
												</button>
											</div>
										</div>
									</div>
									
									<div >
									  <div className="text-center">
										  <ul className="flex flex-wrap items-center justify-center gap-2">
											  <li>
												  <a onClick={() => setOpenCreateModal(false)} className="inline-flex h-10 w-10 group items-center justify-center rounded-lg bg-slate-300/20 backdrop-blur-2xl transitipn-all duration-500 hover:bg-slate-200">
													  <i className="text-white text-2xl group-hover:text-white">
														  <AiOutlineClose />
														</i>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</section>
			) : (
				<section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
				  <div className="container">
					  <div className="bg-slate-500/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
						
						  <div className="grid gap-10 lg:grid-cols-2">
								<Branding
									image="auth-img"
								  title="Build token solana ands!"
								  message="description"
							  />
							  
							  <div className="lg:ps-0 h-full flex flex-col p-10">
									<div className="pb-10">
										<a className="flex ">
											<img src="/assets/logo.png" alt="logo" className="h-10" />
									  </a>
								  </div>
								  
								  <div className="pb-6 my-auto text-center" >
										<h4 className="mb-4 text-2xl font-bold text-white">
											Link yo your new token 
									  </h4>
									  
									  <p className="text-gray-300 mx-auto mb-5 max-w-sm">
											Your solana token is successfully created, Check now explorer
									  </p>
									  
									  <div className="flex items-start justify-center">
											<img src={token.image || "/assets/logo.png"} alt="logo token" className="h-40"/>
									  </div>
									  
									  <div className="mt-5 w-full text-center">
											<p className="text-gray-300 text-base leading-6 font-medium">
												<InputView 
													name="Token Address"
												  placeholder={tokenMintAddress}
											  />
											  <span className="cursor-pointer " onClick={() => navigator.clipboard.writeText(tokenMintAddress)}>
													Copy
											  </span>
										  </p>
										  
										  <div className="mb-6 text-center ">
												<a href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`} target="_blank" rel="noreferrer" className="bg-blue-400 hover:bg-blue-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 transition-all duration-500 backdrop-blur-2xl text-white font-bold">
													View on solana
											  </a>
										  </div>
									  </div>
								  </div>
							  </div>
							</div>
							
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CreateView;
*/