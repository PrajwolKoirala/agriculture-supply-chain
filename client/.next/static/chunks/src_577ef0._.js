(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_577ef0._.js", {

"[project]/src/contexts/web3Context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// // src/contexts/Web3Context.tsx
// 'use client'
// import React, { createContext, useContext, useState, useEffect } from 'react'
// import { useAccount, useConnect, useDisconnect } from 'wagmi'
// import { injected } from 'wagmi/connectors' // Changed this line
// import Web3 from 'web3'
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/web3Config'
// interface Web3ContextType {
//   connect: () => Promise<void>
//   disconnect: () => void
//   contract: any | null
//   account: string | null
//   isActive: boolean
// }
// const Web3Context = createContext<Web3ContextType | null>(null)
// export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
//   const { connect } = useConnect({
//     connector: injected(), // Changed this line
//   })
//   const { disconnect } = useDisconnect()
//   const { address, isConnected } = useAccount()
//   const [contract, setContract] = useState<any | null>(null)
//   useEffect(() => {
//     if (window.ethereum && address) {
//       const web3 = new Web3(window.ethereum)
//       const newContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
//       setContract(newContract)
//     }
//   }, [address])
//   const handleConnect = async () => {
//     try {
//       await connect()
//     } catch (error) {
//       console.error('Error connecting:', error)
//     }
//   }
//   return (
//     <Web3Context.Provider
//       value={{
//         connect: handleConnect,
//         disconnect,
//         contract,
//         account: address || null,
//         isActive: isConnected,
//       }}
//     >
//       {children}
//     </Web3Context.Provider>
//   )
// }
// export const useWeb3 = () => {
//   const context = useContext(Web3Context)
//   if (!context) {
//     throw new Error('useWeb3 must be used within a Web3Provider')
//   }
//   return context
// }
__turbopack_esm__({
    "Web3Provider": (()=>Web3Provider),
    "useWeb3": (()=>useWeb3)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$web3$40$4$2e$16$2e$0_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$24$2e$1$2f$node_modules$2f$web3$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/web3@4.16.0_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.24.1/node_modules/web3/lib/esm/index.js [app-client] (ecmascript) <module evaluation>");
(()=>{
    const e = new Error("Cannot find module '../contracts/AgriSupplyChain.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$web3$40$4$2e$16$2e$0_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$24$2e$1$2f$node_modules$2f$web3$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/web3@4.16.0_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.24.1/node_modules/web3/lib/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
;
;
;
const Web3Context = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'; // Replace with actual address
const Web3Provider = ({ children })=>{
    _s();
    const [web3, setWeb3] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isActive, setIsActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contract, setContract] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Web3Provider.useEffect": ()=>{
            if (window.ethereum) {
                const web3Instance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$web3$40$4$2e$16$2e$0_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$24$2e$1$2f$node_modules$2f$web3$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](window.ethereum);
                setWeb3(web3Instance);
                // Initialize contract
                try {
                    const contractInstance = new web3Instance.eth.Contract(AgriSupplyChainABI.abi, CONTRACT_ADDRESS);
                    setContract(contractInstance);
                } catch (err) {
                    setError('Failed to initialize contract');
                }
            }
        }
    }["Web3Provider.useEffect"], []);
    const connect = async ()=>{
        if (!web3) {
            setError('Web3 not initialized');
            return;
        }
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            setAccount(accounts[0]);
            setIsActive(true);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };
    const disconnect = ()=>{
        setAccount(null);
        setIsActive(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Web3Provider.useEffect": ()=>{
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', {
                    "Web3Provider.useEffect": (accounts)=>{
                        setAccount(accounts[0] || null);
                    }
                }["Web3Provider.useEffect"]);
                window.ethereum.on('disconnect', {
                    "Web3Provider.useEffect": ()=>{
                        disconnect();
                    }
                }["Web3Provider.useEffect"]);
            }
        }
    }["Web3Provider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Web3Context.Provider, {
        value: {
            web3,
            connect,
            disconnect,
            account,
            isActive,
            contract,
            error
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/web3Context.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
};
_s(Web3Provider, "P2xzhzoxjpRgmI37is+sEBw9Hyo=");
_c = Web3Provider;
const useWeb3 = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};
_s1(useWeb3, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "Web3Provider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/providers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/app/providers.tsx
__turbopack_esm__({
    "Providers": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$web3Context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/contexts/web3Context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$64$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@tanstack+query-core@5.64.0/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$64$2e$0_$40$types$2b$react$40$19$2e$0$2e$6_react$40$19$2e$0$2e$0_typescript$40$5$2e$_kfiku25gpkbyeq77f2embowl54$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@wagmi+core@2.16.3_@tanstack+query-core@5.64.0_@types+react@19.0.6_react@19.0.0_typescript@5._kfiku25gpkbyeq77f2embowl54/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$22$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$24$2e$1$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/viem@2.22.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.24.1/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$64$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@tanstack+react-query@5.64.0_react@19.0.0/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$14$2e$7_$40$tanstack$2b$query$2d$core$40$5$2e$64$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$64$2e$0_react$40$19$2e$0$2e$0_$5f40$types$2b$re_iogs5nkw2juifdsbjt5wwxuh5i$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__WagmiProvider__as__WagmiConfig$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/wagmi@2.14.7_@tanstack+query-core@5.64.0_@tanstack+react-query@5.64.0_react@19.0.0__@types+re_iogs5nkw2juifdsbjt5wwxuh5i/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript) <export WagmiProvider as WagmiConfig>");
"use client";
;
;
;
;
;
// Create a client
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$64$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]();
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$3_$40$tanstack$2b$query$2d$core$40$5$2e$64$2e$0_$40$types$2b$react$40$19$2e$0$2e$6_react$40$19$2e$0$2e$0_typescript$40$5$2e$_kfiku25gpkbyeq77f2embowl54$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        {
            id: 1337,
            name: "Ganache",
            network: "ganache",
            nativeCurrency: {
                decimals: 18,
                name: "Ethereum",
                symbol: "ETH"
            },
            rpcUrls: {
                default: {
                    http: [
                        "http://127.0.0.1:7545"
                    ]
                },
                public: {
                    http: [
                        "http://127.0.0.1:7545"
                    ]
                }
            }
        }
    ],
    transports: {
        1337: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$22$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$24$2e$1$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])("http://127.0.0.1:7545")
    }
});
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$64$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$14$2e$7_$40$tanstack$2b$query$2d$core$40$5$2e$64$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$64$2e$0_react$40$19$2e$0$2e$0_$5f40$types$2b$re_iogs5nkw2juifdsbjt5wwxuh5i$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__WagmiProvider__as__WagmiConfig$3e$__["WagmiConfig"], {
            config: config,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$4_$40$babel$2b$core$40$7$2e$26$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$web3Context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Web3Provider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/providers.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/providers.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_refresh__.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_577ef0._.js.map