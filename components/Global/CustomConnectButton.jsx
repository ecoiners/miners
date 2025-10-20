import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RiWallet3Line } from "react-icons/ri";

/**
 * CustomConnectButton - Komponen kustom untuk tombol koneksi wallet
 * Menggunakan RainbowKit untuk integrasi wallet dengan UI yang dikustomisasi
 * 
 * @param {boolean} active - Menentukan apakah tombol chain network ditampilkan
 * @param {string} childStyle - Class CSS tambahan untuk kustomisasi styling
 * 
 * @returns {JSX.Element} Komponen tombol koneksi wallet yang sudah dikustomisasi
 */
export default function CustomConnectButton({ active = false, childStyle = "" }) {
  
  return (
    /**
     * ConnectButton.Custom - Komponen dari RainbowKit yang memungkinkan kustomisasi penuh
     * Memberikan akses ke state dan function melalui children render prop
     */
    <ConnectButton.Custom>
      {/**
       * Render Prop Function - Mendapatkan state dan function dari RainbowKit
       * 
       * @param {Object} params - Parameter yang diberikan RainbowKit
       * @param {Object} params.account - Data akun wallet yang terhubung
       * @param {Object} params.chain - Data chain/network yang aktif
       * @param {Function} params.openAccountModal - Function untuk membuka modal akun
       * @param {Function} params.openChainModal - Function untuk membuka modal chain
       * @param {Function} params.openConnectModal - Function untuk membuka modal koneksi
       * @param {boolean} params.mounted - Status apakah komponen sudah siap/mounted
       * 
       * @returns {JSX.Element} UI yang dirender berdasarkan state wallet
       */}
      {({ 
        account, 
        chain, 
        openAccountModal, 
        openChainModal, 
        openConnectModal, 
        mounted 
      }) => {
        
        // ==============================
        // VARIABLE STATE CHECK
        // ==============================
        /**
         * ready - Menandakan apakah komponen sudah siap untuk interaksi
         * mounted dari RainbowKit menandakan komponen sudah ter-render
         */
        const ready = mounted;
        
        /**
         * connected - Menandakan apakah wallet sudah terhubung
         * Wallet dianggap terhubung jika komponen ready DAN ada account DAN ada chain
         */
        const connected = ready && account && chain;
        
        // ==============================
        // RENDER UTAMA
        // ==============================
        return (
          /**
           * Container utama dengan handling untuk state tidak ready
           * Jika komponen belum ready, tambahkan properti aksesibilitas dan styling
           */
          <div 
            {...(!ready && {
              "aria-hidden": true,                    // Sembunyikan dari screen reader
              style: {
                opacity: 0,                          // Buat transparan
                pointerEvents: "none",               // Non-aktifkan interaksi
                userSelect: "none",                  // Non-aktifkan seleksi teks
              }
            })}
          >
            {/**
             * IIFE (Immediately Invoked Function Expression)
             * Digunakan untuk conditional rendering berdasarkan state wallet
             */}
            {(() => {
              // ==============================
              // STATE 1: WALLET BELUM TERHUBUNG
              // ==============================
              if (!connected) {
                return (
                  /**
                   * Tombol Connect Wallet - Ditampilkan ketika wallet belum terhubung
                   * Memanggil openConnectModal saat diklik untuk membuka modal pilihan wallet
                   */
                  <button
                    onClick={openConnectModal}        // Buka modal pilih wallet
                    className={`
                      flex items-center 
                      bg-gradient-to-r from-fuchsia-500 to-purple-600 
                      hover:from-fuchsia-600 hover:to-purple-700 
                      text-white px-4 py-2 rounded-md 
                      transition-colors 
                      ${childStyle}                   
                    `}
                    aria-label="Connect Wallet"       // Label aksesibilitas
                  >
                    {/* Icon Wallet */}
                    <RiWallet3Line className="mr-2" size={20} />
                    {/* Teks Tombol */}
                    CONNECT WALLET
                  </button>
                );
              }
              
              // ==============================
              // STATE 2: CHAIN TIDAK SUPPORTED
              // ==============================
              if (chain.unsupported) {
                return (
                  /**
                   * Tombol Wrong Network - Ditampilkan ketika chain tidak didukung
                   * Memanggil openChainModal untuk ganti network
                   */
                  <button 
                    onClick={openChainModal}          // Buka modal ganti network
                    className="
                      bg-red-500 hover:bg-red-600     // Warna merah untuk peringatan
                      text-white px-6 py-2 rounded-lg
                      transition-colors
                    "
                    aria-label="Wrong Network, Switch Network"
                  >
                    Wrong network
                  </button>
                );
              }
              
              // ==============================
              // STATE 3: WALLET TERHUBUNG & VALID
              // ==============================
              return (
                /**
                 * Container untuk state wallet terhubung
                 * Menampilkan informasi chain dan account
                 */
                <div className="flex items-center gap-4">
                  
                  {/**
                   * Tombol Network/Chain - Hanya ditampilkan jika active=true
                   * Menampilkan informasi network yang sedang aktif
                   */}
                  {active && (
                    <button 
                      onClick={openChainModal}        // Buka modal ganti network
                      className="
                        bg-gradient-to-r from-fuchsia-500 to-purple-600 
                        hover:from-fuchsia-600 hover:to-purple-700 
                        text-white px-4 py-2 rounded-lg 
                        flex items-center gap-2
                        transition-colors
                      "
                      aria-label={`Current network: ${chain.name}, Switch network`}
                    >
                      {/* Icon Network */}
                      {chain.hasIcon && (
                        <div className="h-5 w-5">
                          {chain.iconUrl && (
                            <img 
                              src={chain.iconUrl} 
                              alt={chain.name ?? "chain icon"} 
                              className="h-5 w-5"    // Fixed size untuk icon
                            />
                          )}
                        </div>
                      )}
                      
                      {/* Nama Network */}
                      {chain.name}
                    </button>
                  )}
                  
                  {/**
                   * Tombol Account Info - Menampilkan informasi akun
                   * Memanggil openAccountModal untuk melihat detail akun
                   */}
                  <button 
                    onClick={openAccountModal}        // Buka modal detail akun
                    className="
                      bg-gradient-to-r from-fuchsia-500 to-purple-600 
                      hover:from-fuchsia-600 hover:to-purple-700 
                      text-white px-4 py-2 rounded-lg 
                      flex items-center gap-2
                      transition-colors
                    "
                    aria-label="Account details"
                  >
                    {/* Nama Display Akun (biasanya truncated address) */}
                    {account.displayName}
                    
                    {/* Balance Akun (jika tersedia) */}
                    {account.displayBalance && ` (${account.displayBalance})`}
                  </button>
                </div>
              );
              
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}




/* ###### VERSI NO DOC
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RiWallet3Line } from "react-icons/ri";

export default function CustomConnectButton({active, childStyle}) {
	
	return (
		<ConnectButton.Custom
		  
		>
		  {
				({account, chain, openAccountModal, openChainModal, openConnectModal, mounted}) => {
					const ready = mounted;
					const connected = ready && account && chain;
					
					return (
						<div {...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
								
							}
						})}>
						  {(() => {
								if (!connected) {
									return (
										<button
										  onClick={openConnectModal}
											className={`flex items-center bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white px-4 py-2 rounded-md transition-colors ${childStyle}`}
										>
										  <RiWallet3Line className="mr-2" size={20} />
											CONNECT WALLET
										</button>
									);
								}
								
								if (chain.unsupported) {
									return (
										<button 
										  onClick={openChainModal}
											className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
										>
										  Wrong network
										</button>
									);
								}
								
								return (
									<div className="flex items-center gap-4">
									  {active && (
											<button 
											  onClick={openChainModal}
												className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purpler-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
											>
											  {chain.hashIcon && (
													<div className="h-5 w-5">
													  {chain.iconUrl && (
															<img src={chain.iconUrl} alt={chain.name ?? "chain icon"} className=" h-5 w-"/>
														)}
													</div>
												)}
												
												{chain.name}
											</button>
										)}
										
										<button 
										  onClick={openAccountModal}
											className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
										>
										  {account.displayName}
											{account.displayBalance && `(${account.displayBalance})`}
										</button>
									</div>
								);
								
							})}
						</div>
					);
				}
			}
		</ConnectButton.Custom>
	);
};
*/