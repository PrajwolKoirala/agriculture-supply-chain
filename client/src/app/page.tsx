// 'use client';

// import { useWeb3 } from "@/contexts/web3Context";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useState, useEffect } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import UserRegistration from "./registration/page";
// import TransactionHistory from "./transaction-history/page";
// import Web3 from "web3";

// export default function Home() {
//   const { connect, disconnect, account, isActive, contract, error } = useWeb3();
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productId, setProductId] = useState("");
//   const [connectionStatus, setConnectionStatus] = useState("");

//   const handleConnection = async () => {
//     try {
//       setConnectionStatus("Connecting...");
//       // First request account access
//       if (window.ethereum) {
//         await window.ethereum.request({
//           method: 'eth_requestAccounts'
//         });
//         await connect();
//       } else {
//         setConnectionStatus("Please install MetaMask!");
//       }
//     } catch (err: any) {
//       console.error(err);
//       setConnectionStatus(err.message || "Failed to connect");
//     }
//   };

//   const createProduct = async () => {
//     if (!contract || !account) {
//       setConnectionStatus("Please connect your wallet first");
//       return;
//     }
//     try {
//       await contract.methods
//         .createProduct(productName, productPrice)
//         .send({ from: account });
//       alert("Product created successfully!");
//       console.log("🚀 ~ file: page.tsx:151 ~ Home ~ productId:", productId);
//     } catch (error: any) {
//       console.error("Error creating product:", error);
//       setConnectionStatus(error.message);
//     }
//   };

//   const handleRoleAction = async (action: string) => {
//     if (!contract || !account) {
//       setConnectionStatus("Please connect your wallet first");
//       return;
//     }
//     try {
//       switch (action) {
//         case "collect":
//           await contract.methods.collectProduct(productId).send({ from: account });
//           break;
//         case "transport":
//           await contract.methods.transportProduct(productId).send({ from: account });
//           break;
//         case "distribute":
//           await contract.methods.distributeProduct(productId).send({ from: account });
//           break;
//         case "retail":
//           await contract.methods.sendToRetailer(productId).send({ from: account });
//           break;
//         case "purchase":
//           await contract.methods.purchaseProduct(productId).send({ from: account });
//           break;
//       }
//       alert("Action completed successfully!");
//     } catch (error: any) {
//       console.error("Error performing action:", error);
//       setConnectionStatus(error.message);
//     }
//   };

//   // Check for MetaMask on component mount
//   useEffect(() => {
//     if (!window.ethereum) {
//       setConnectionStatus("MetaMask is not installed. Please install MetaMask to use this application.");
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>AgriSupplyChain Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {connectionStatus && (
//             <Alert className="mb-4">
//               <AlertDescription>{connectionStatus}</AlertDescription>
//             </Alert>
//           )}

//           {error && (
//             <Alert className="mb-4" variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {!isActive ? (
//             <div className="space-y-4">
//               <p className="text-sm text-gray-500 mb-2">
//                 Connect your MetaMask wallet to interact with the supply chain.
//               </p>
//               <Button
//                 onClick={handleConnection}
//                 className="w-full sm:w-auto"
//               >
//                 Connect MetaMask
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <p className="text-sm">Connected Account: {account}</p>
//               <Button onClick={disconnect} variant="outline">
//                 Disconnect
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {isActive && (
//         <>
//         <UserRegistration contract={contract} account={account} />
//         <TransactionHistory
//       web3={new Web3(window.ethereum)}
//       contract={contract}
//       account={account}
//     />
//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle>Create New Product</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Input
//                 placeholder="Product Name"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//               />
//               <Input
//                 placeholder="Product Price"
//                 type="number"
//                 value={productPrice}
//                 onChange={(e) => setProductPrice(e.target.value)}
//               />
//               <Button onClick={createProduct}>Create Product</Button>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Product Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Input
//                 placeholder="Product ID"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//               />
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <Button onClick={() => handleRoleAction("collect")}>
//                   Collect Product
//                 </Button>
//                 <Button onClick={() => handleRoleAction("transport")}>
//                   Transport Product
//                 </Button>
//                 <Button onClick={() => handleRoleAction("distribute")}>
//                   Distribute Product
//                 </Button>
//                 <Button onClick={() => handleRoleAction("retail")}>
//                   Send to Retailer
//                 </Button>
//                 <Button onClick={() => handleRoleAction("purchase")}>
//                   Purchase Product
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// "use client"
// import React, { useState, useEffect } from 'react';
// import { useWeb3 } from "@/contexts/web3Context";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   History,
//   User,
//   Wheat,
//   Box,
//   Truck,
//   Store,
//   ShoppingBag,
//   LogOut,
// } from "lucide-react";
// import UserRegistration from './registration/page';

// // const UserRegistration = ({ contract, account, onComplete }) => {
// //   const [role, setRole] = useState("");
// //   const [error, setError] = useState("");

// //   const registerUser = async () => {
// //     try {
// //       await contract.methods.registerUser(account, role).send({ from: account });
// //       onComplete();
// //     } catch (error) {
// //       setError(error.message);
// //     }
// //   };

// //   return (
// //     <Card className="max-w-md mx-auto mt-8">
// //       <CardHeader>
// //         <CardTitle className="flex items-center gap-2">
// //           <User className="w-5 h-5" />
// //           User Registration
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-4">
// //         {error && (
// //           <Alert variant="destructive">
// //             <AlertDescription>{error}</AlertDescription>
// //           </Alert>
// //         )}
// //         <div className="space-y-2">
// //           <label className="text-sm font-medium">Select Role</label>
// //           <select
// //             className="w-full p-2 border rounded-md"
// //             value={role}
// //             onChange={(e) => setRole(e.target.value)}
// //           >
// //             <option value="">Select a role</option>
// //             <option value="FARMER">Farmer</option>
// //             <option value="COLLECTOR">Collector</option>
// //             <option value="TRANSPORTER">Transporter</option>
// //             <option value="DISTRIBUTOR">Distributor</option>
// //             <option value="RETAILER">Retailer</option>
// //           </select>
// //         </div>
// //         <Button onClick={registerUser} className="w-full">
// //           Register
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// const ProductCard = ({ product }) => {
//   const stateColors = {
//     Created: "bg-blue-100 text-blue-800",
//     CollectedByCollector: "bg-purple-100 text-purple-800",
//     WithTransporter: "bg-yellow-100 text-yellow-800",
//     WithDistributor: "bg-green-100 text-green-800",
//     WithRetailer: "bg-pink-100 text-pink-800",
//     Sold: "bg-gray-100 text-gray-800"
//   };

//   return (
//     <Card>
//       <CardContent className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-semibold">{product.name}</h3>
//           <Badge className={stateColors[product.state]}>
//             {product.state}
//           </Badge>
//         </div>
//         <p className="text-sm text-gray-500">ID: {product.id}</p>
//         <p className="text-sm text-gray-500">Price: {product.price} ETH</p>
//       </CardContent>
//     </Card>
//   );
// };

// const FarmerDashboard = ({ contract, account }) => {
//   const [products, setProducts] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [error, setError] = useState("");

//   const createProduct = async () => {
//     try {
//       await contract.methods
//         .createProduct(productName, productPrice)
//         .send({ from: account });
//       setProductName("");
//       setProductPrice("");
//       fetchProducts();
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const count = await contract.methods.productCount().call();
//       const fetchedProducts = [];
//       for (let i = 1; i <= count; i++) {
//         const product = await contract.methods.getProduct(i).call();
//         if (product.farmer === account) {
//           fetchedProducts.push({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             state: product.state
//           });
//         }
//       }
//       setProducts(fetchedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Wheat className="w-5 h-5" />
//             Create New Product
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <Input
//             placeholder="Product Name"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//           <Input
//             placeholder="Product Price (ETH)"
//             type="number"
//             value={productPrice}
//             onChange={(e) => setProductPrice(e.target.value)}
//           />
//           <Button onClick={createProduct} className="w-full">Create Product</Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>My Products</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const CollectorDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [error, setError] = useState("");

//   const collectProduct = async () => {
//     try {
//       await contract.methods.collectProduct(productId).send({ from: account });
//       setProductId("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Box className="w-5 h-5" />
//           Collect Products
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <Input
//           placeholder="Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//         />
//         <Button onClick={collectProduct} className="w-full">
//           Collect Product
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// const TransporterDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [error, setError] = useState("");

//   const transportProduct = async () => {
//     try {
//       await contract.methods.transportProduct(productId).send({ from: account });
//       setProductId("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Truck className="w-5 h-5" />
//           Transport Products
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <Input
//           placeholder="Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//         />
//         <Button onClick={transportProduct} className="w-full">
//           Transport Product
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// const DistributorDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [error, setError] = useState("");

//   const distributeProduct = async () => {
//     try {
//       await contract.methods.distributeProduct(productId).send({ from: account });
//       setProductId("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Store className="w-5 h-5" />
//           Distribute Products
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <Input
//           placeholder="Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//         />
//         <Button onClick={distributeProduct} className="w-full">
//           Distribute Product
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// const RetailerDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [error, setError] = useState("");

//   const sendToRetail = async () => {
//     try {
//       await contract.methods.sendToRetailer(productId).send({ from: account });
//       setProductId("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <ShoppingBag className="w-5 h-5" />
//           Retail Products
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <Input
//           placeholder="Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//         />
//         <Button onClick={sendToRetail} className="w-full">
//           Send to Retail
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// const TransactionHistory = ({ contract, account }) => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactionHistory = async () => {
//       try {
//         // Get past events
//         const events = await contract.getPastEvents('ProductStateChanged', {
//           fromBlock: 0,
//           toBlock: 'latest'
//         });
//         setTransactions(events);
//       } catch (error) {
//         console.error("Error fetching transaction history:", error);
//       }
//     };

//     fetchTransactionHistory();
//   }, [contract]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <History className="w-5 h-5" />
//           Transaction History
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {transactions.map((tx, index) => (
//             <Card key={index}>
//               <CardContent className="p-4">
//                 <p className="font-semibold">Product ID: {tx.returnValues.productId}</p>
//                 <p className="text-sm text-gray-500">New State: {tx.returnValues.newState}</p>
//                 <p className="text-xs text-gray-400">Transaction: {tx.transactionHash}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const DashboardLayout = ({ children, userRole, onDisconnect }) => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Wheat className="w-6 h-6" />
//               <h1 className="text-xl font-bold">AgriSupplyChain</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <Badge className="bg-green-100 text-green-800">
//                 Role: {userRole}
//               </Badge>
//               <Button
//                 variant="outline"
//                 className="flex items-center gap-2"
//                 onClick={onDisconnect}
//               >
//                 <LogOut className="w-4 h-4" />
//                 Disconnect
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <main className="container mx-auto px-4 py-8">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default function Home() {
//   const { connect, disconnect, account, isActive, contract, error } = useWeb3();
//   const [connectionStatus, setConnectionStatus] = useState("");
//   const [userRole, setUserRole] = useState(null);
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [registrationComplete, setRegistrationComplete] = useState(false);

//   const handleConnection = async () => {
//     try {
//       setConnectionStatus("Connecting...");
//       if (window.ethereum) {
//         await window.ethereum.request({
//           method: 'eth_requestAccounts'
//         });
//         await connect();
//         // After successful connection, immediately show registration
//         setShowRegistration(true);
//       } else {
//         setConnectionStatus("Please install MetaMask!");
//       }
//     } catch (err) {
//       console.error(err);
//       setConnectionStatus(err.message || "Failed to connect");
//     }
//   };

//   // Effect to check user role whenever registration might have completed
//   useEffect(() => {
//     const checkUserRole = async () => {
//       if (isActive && account && contract) {
//         try {
//           const role = await contract.methods.userRoles(account).call();
//           if (role && role !== "") {
//             setUserRole(role);
//             setShowRegistration(false);
//             setRegistrationComplete(true);
//           }
//         } catch (err) {
//           console.error("Error checking role:", err);
//         }
//       }
//     };

//     checkUserRole();
//   }, [isActive, account, contract, registrationComplete]);

//   // Check for MetaMask on component mount
//   useEffect(() => {
//     if (!window.ethereum) {
//       setConnectionStatus("MetaMask is not installed. Please install MetaMask to use this application.");
//     }
//   }, []);

//   const renderDashboard = () => {
//     switch (userRole) {
//       case "FARMER":
//         return <FarmerDashboard contract={contract} account={account} />;
//       case "COLLECTOR":
//         return <CollectorDashboard contract={contract} account={account} />;
//       case "TRANSPORTER":
//         return <TransporterDashboard contract={contract} account={account} />;
//       case "DISTRIBUTOR":
//         return <DistributorDashboard contract={contract} account={account} />;
//       case "RETAILER":
//         return <RetailerDashboard contract={contract} account={account} />;
//       default:
//         return (
//           <Card>
//             <CardContent>
//               <p className="text-center text-gray-500">Unknown role or role not assigned</p>
//             </CardContent>
//           </Card>
//         );
//     }
//   };

//   if (!isActive) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Wheat className="w-6 h-6" />
//               Welcome to AgriSupplyChain
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {connectionStatus && (
//               <Alert className="mb-4">
//                 <AlertDescription>{connectionStatus}</AlertDescription>
//               </Alert>
//             )}
//             {error && (
//               <Alert className="mb-4" variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <Button
//               onClick={handleConnection}
//               className="w-full"
//             >
//               Connect with MetaMask
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (showRegistration) {
//     return (
//       <div className="container mx-auto p-4">
//         <UserRegistration
//           contract={contract}
//           account={account}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Wheat className="w-6 h-6" />
//               <h1 className="text-xl font-bold">AgriSupplyChain</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <Badge className="bg-green-100 text-green-800">
//                 Role: {userRole}
//               </Badge>
//               <Button
//                 variant="outline"
//                 className="flex items-center gap-2"
//                 onClick={disconnect}
//               >
//                 <LogOut className="w-4 h-4" />
//                 Disconnect
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <main className="container mx-auto px-4 py-8">
//         <h2>Welcome, {userRole}!</h2>
//         <div className="mt-6">
//           <Tabs defaultValue="dashboard" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//               <TabsTrigger value="history">Transaction History</TabsTrigger>
//             </TabsList>

//             <TabsContent value="dashboard">
//               {renderDashboard()}
//             </TabsContent>

//             <TabsContent value="history">
//               <TransactionHistory
//                 contract={contract}
//                 account={account}
//               />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/web3Context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  History,
  User,
  Wheat,
  Box,
  Truck,
  Store,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import UserRegistration from "./registration/page";

const ProductCard = ({ product }) => {
  const stateColors = {
    Created: "bg-blue-100 text-blue-800",
    CollectedByCollector: "bg-purple-100 text-purple-800",
    WithTransporter: "bg-yellow-100 text-yellow-800",
    WithDistributor: "bg-green-100 text-green-800",
    WithRetailer: "bg-pink-100 text-pink-800",
    Sold: "bg-gray-100 text-gray-800",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{product.name}</h3>
          <Badge className={stateColors[product.state]}>{product.state}</Badge>
        </div>
        <p className="text-sm text-gray-500">ID: {product.id}</p>
        <p className="text-sm text-gray-500">Price: {product.price} ETH</p>
      </CardContent>
    </Card>
  );
};

const FarmerDashboard = ({ contract, account }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [error, setError] = useState("");
  const { web3 } = useWeb3();

  const createProduct = async () => {
    try {
      if (!web3) {
        setError("Web3 not initialized");
        return;
      }
      await contract.methods
        .createProduct(productName, web3.utils.toWei(basePrice, "ether"))
        .send({ from: account });

      setProductName("");
      setBasePrice("");
      await fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      if (!contract || !web3) {
        console.error("Contract or web3 not initialized");
        return;
      }

      const count = await contract.methods.productCount().call();
      const fetchedProducts = [];

      for (let i = 1; i <= count; i++) {
        try {
          // Call each method separately and access the returned object properties
          const basicInfo = await contract.methods
            .getProductBasicInfo(i)
            .call();
          const fees = await contract.methods.getProductFees(i).call();
          const actors = await contract.methods.getProductActors(i).call();

          if (
            basicInfo.isValid &&
            actors.farmer.toLowerCase() === account.toLowerCase()
          ) {
            fetchedProducts.push({
              id: basicInfo.id,
              name: basicInfo.name,
              price: web3.utils.fromWei(basicInfo.basePrice, "ether"),
              state: basicInfo.state,
              collectorFee: web3.utils.fromWei(fees.collectorFee, "ether"),
              transporterFee: web3.utils.fromWei(fees.transporterFee, "ether"),
              distributorFee: web3.utils.fromWei(fees.distributorFee, "ether"),
              retailerFee: web3.utils.fromWei(fees.retailerFee, "ether"),
            });
          }
        } catch (err) {
          console.error(`Error fetching product ${i}:`, err);
          continue;
        }
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchProducts();
    }
  }, [contract, account]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wheat className="w-5 h-5" />
            Create New Product
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            placeholder="Base Price (ETH)"
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <Button
            onClick={createProduct}
            className="w-full"
            disabled={!productName || !basePrice}
          >
            Create Product
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.length === 0 ? (
              <p className="text-gray-500 col-span-2 text-center py-4">
                No products found. Create your first product above.
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CollectorDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [collectorFee, setCollectorFee] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { web3 } = useWeb3();
  const [loading, setLoading] = useState(false);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching product:", id);
      const productInfo = await contract.methods.getProductBasicInfo(id).call();
      console.log("Product info:", productInfo);

      // Convert state to number for comparison
      const productState = Number(productInfo.state);
      console.log("Product state:", productState);

      if (!productInfo.isValid) {
        setError("Product does not exist");
        setProduct(null);
        return;
      }

      if (productState !== 0) {
        // CREATED state = 0
        setError("Product not in CREATED state");
        setProduct(null);
        return;
      }

      setProduct({
        id: productInfo.id,
        name: productInfo.name,
        basePrice: web3.utils.fromWei(productInfo.basePrice, "ether"),
        state: productState,
      });
      setError("");
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Error fetching product details");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const collectProduct = async () => {
    try {
      if (!product) {
        setError("Please fetch product details first");
        return;
      }

      const collectorFeeWei = web3.utils.toWei(collectorFee, "ether");
      const basePriceWei = web3.utils.toWei(product.basePrice, "ether");

      await contract.methods.collectProduct(productId, collectorFeeWei).send({
        from: account,
        value: basePriceWei,
      });

      setProductId("");
      setCollectorFee("");
      setProduct(null);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="w-5 h-5" />
            Collect Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-4">
            <Input
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={() => fetchProduct(productId)}>
              Fetch Details
            </Button>
          </div>

          {product && (
            <>
              <div className="p-4 border rounded-md bg-gray-50">
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Base Price:</strong> {product.basePrice} ETH
                </p>
                <p>
                  <strong>State:</strong>{" "}
                  {
                    [
                      "Created",
                      "Collected",
                      "In Transit",
                      "With Distributor",
                      "With Retailer",
                      "Sold",
                    ][product.state]
                  }
                </p>
              </div>

              <Input
                placeholder="Your Collection Fee (ETH)"
                type="number"
                value={collectorFee}
                onChange={(e) => setCollectorFee(e.target.value)}
              />
            </>
          )}

          <Button
            onClick={collectProduct}
            className="w-full"
            disabled={!product || !collectorFee}
          >
            Collect and Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const TransporterDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [transporterFee, setTransporterFee] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching product:", id);
      const productInfo = await contract.methods.getProductBasicInfo(id).call();
      console.log("Product info:", productInfo);

      // Convert state to number for comparison
      const productState = Number(productInfo.state);
      console.log("Product state:", productState);

      if (!productInfo.isValid) {
        setError("Product does not exist");
        setProduct(null);
        return;
      }

      // Check for COLLECTED state (1)
      if (productState !== 1) {
        setError(
          "Product not available for transport - must be in COLLECTED state"
        );
        setProduct(null);
        return;
      }

      // Get collector fee that needs to be paid
      const fees = await contract.methods.getProductFees(id).call();
      console.log("Product fees:", fees);

      setProduct({
        id: productInfo.id,
        name: productInfo.name,
        collectorFee: web3.utils.fromWei(fees.collectorFee, "ether"),
        state: productState,
      });
      setError("");
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Error fetching product details");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const transportProduct = async () => {
    try {
      if (!product) {
        setError("Please fetch product details first");
        return;
      }

      const transporterFeeWei = web3.utils.toWei(transporterFee, "ether");
      const collectorFeeWei = web3.utils.toWei(product.collectorFee, "ether");

      await contract.methods
        .transportProduct(productId, transporterFeeWei)
        .send({
          from: account,
          value: collectorFeeWei,
        });

      setProductId("");
      setTransporterFee("");
      setProduct(null);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Transport Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-4">
            <Input
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={() => fetchProduct(productId)}>
              Fetch Details
            </Button>
          </div>

          {product && (
            <>
              <div className="p-4 border rounded-md bg-gray-50">
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Collector Fee to Pay:</strong> {product.collectorFee}{" "}
                  ETH
                </p>
                <p>
                  <strong>State:</strong>{" "}
                  {
                    [
                      "Created",
                      "Collected",
                      "In Transit",
                      "With Distributor",
                      "With Retailer",
                      "Sold",
                    ][product.state]
                  }
                </p>
              </div>

              <Input
                placeholder="Your Transport Fee (ETH)"
                type="number"
                value={transporterFee}
                onChange={(e) => setTransporterFee(e.target.value)}
              />
            </>
          )}

          <Button
            onClick={transportProduct}
            className="w-full"
            disabled={!product || !transporterFee}
          >
            Transport and Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const DistributorDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [distributorFee, setDistributorFee] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching product:", id);
      const productInfo = await contract.methods.getProductBasicInfo(id).call();
      console.log("Product info:", productInfo);

      // Convert state to number for comparison
      const productState = Number(productInfo.state);
      console.log("Product state:", productState);

      if (!productInfo.isValid) {
        setError("Product does not exist");
        setProduct(null);
        return;
      }

      // Check for IN_TRANSIT state (2)
      if (productState !== 2) {
        setError(
          "Product not available for distribution - must be in IN_TRANSIT state"
        );
        setProduct(null);
        return;
      }

      const fees = await contract.methods.getProductFees(id).call();
      console.log("Product fees:", fees);

      setProduct({
        id: productInfo.id,
        name: productInfo.name,
        state: productState,
        transporterFee: web3.utils.fromWei(fees.transporterFee, "ether"),
      });
      setError("");
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Error fetching product details");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const distributeProduct = async () => {
    try {
      if (!product) {
        setError("Please fetch product details first");
        return;
      }

      const distributorFeeWei = web3.utils.toWei(distributorFee, "ether");
      const transporterFeeWei = web3.utils.toWei(
        product.transporterFee,
        "ether"
      );

      await contract.methods
        .distributeProduct(productId, distributorFeeWei)
        .send({
          from: account,
          value: transporterFeeWei,
        });

      setProductId("");
      setDistributorFee("");
      setProduct(null);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Distribute Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-4">
            <Input
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={() => fetchProduct(productId)}>
              Fetch Details
            </Button>
          </div>

          {product && (
            <>
              <div className="p-4 border rounded-md bg-gray-50">
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Transporter Fee to Pay:</strong>{" "}
                  {product.transporterFee} ETH
                </p>
                <p>
                  <strong>State:</strong>{" "}
                  {
                    [
                      "Created",
                      "Collected",
                      "In Transit",
                      "With Distributor",
                      "With Retailer",
                      "Sold",
                    ][product.state]
                  }
                </p>
              </div>

              <Input
                placeholder="Your Distribution Fee (ETH)"
                type="number"
                value={distributorFee}
                onChange={(e) => setDistributorFee(e.target.value)}
              />
            </>
          )}

          <Button
            onClick={distributeProduct}
            className="w-full"
            disabled={!product || !distributorFee}
          >
            Distribute and Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const RetailerDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [retailerFee, setRetailerFee] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  // const fetchProduct = async (id) => {
  //   try {
  //     const productInfo = await contract.methods.getProductBasicInfo(id).call();

  //     if (!productInfo.isValid || productInfo.state !== '3') {
  //       setError("Product not available for retail");
  //       setProduct(null);
  //       return;
  //     }

  //     const fees = await contract.methods.getProductFees(id).call();

  //     setProduct({
  //       id: productInfo.id,
  //       name: productInfo.name,
  //       state: productInfo.state,
  //       distributorFee: web3.utils.fromWei(fees.distributorFee, 'ether')
  //     });
  //     setError("");
  //   } catch (error) {
  //     setError("Error fetching product details");
  //     setProduct(null);
  //   }
  // };
  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching product:", id);
      const productInfo = await contract.methods.getProductBasicInfo(id).call();
      console.log("Product info:", productInfo);

      // Convert state to number for comparison
      const productState = Number(productInfo.state);
      console.log("Product state:", productState);

      if (!productInfo.isValid) {
        setError("Product does not exist");
        setProduct(null);
        return;
      }

      // Check for WITH_DISTRIBUTOR state (3)
      if (productState !== 3) {
        setError("Product not available for retail - must be with distributor");
        setProduct(null);
        return;
      }

      const fees = await contract.methods.getProductFees(id).call();
      console.log("Product fees:", fees);

      setProduct({
        id: productInfo.id,
        name: productInfo.name,
        state: productState,
        distributorFee: web3.utils.fromWei(fees.distributorFee, "ether"),
      });
      setError("");
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Error fetching product details");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const sendToRetail = async () => {
    try {
      if (!product) {
        setError("Please fetch product details first");
        return;
      }

      const retailerFeeWei = web3.utils.toWei(retailerFee, "ether");
      const distributorFeeWei = web3.utils.toWei(
        product.distributorFee,
        "ether"
      );

      await contract.methods.sendToRetailer(productId, retailerFeeWei).send({
        from: account,
        value: distributorFeeWei,
      });

      setProductId("");
      setRetailerFee("");
      setProduct(null);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Retail Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-4">
            <Input
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button onClick={() => fetchProduct(productId)}>
              Fetch Details
            </Button>
          </div>

          {product && (
            <>
              <div className="p-4 border rounded-md bg-gray-50">
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Distributor Fee to Pay:</strong>{" "}
                  {product.distributorFee} ETH
                </p>
                <p>
                  <strong>State:</strong>{" "}
                  {
                    [
                      "Created",
                      "Collected",
                      "In Transit",
                      "With Distributor",
                      "With Retailer",
                      "Sold",
                    ][product.state]
                  }
                </p>
              </div>

              <Input
                placeholder="Your Retail Fee (ETH)"
                type="number"
                value={retailerFee}
                onChange={(e) => setRetailerFee(e.target.value)}
              />
            </>
          )}

          <Button
            onClick={sendToRetail}
            className="w-full"
            disabled={!product || !retailerFee}
          >
            Accept and Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionHistory: React.FC<DashboardProps> = ({
  contract,
  account,
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        // Get past events
        const events = await contract.getPastEvents("ProductStateChanged", {
          fromBlock: 0,
          toBlock: "latest",
        });
        setTransactions(events);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchTransactionHistory();
  }, [contract]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="font-semibold">
                  Product ID: {tx.returnValues.productId}
                </p>
                <p className="text-sm text-gray-500">
                  New State: {tx.returnValues.newState}
                </p>
                <p className="text-xs text-gray-400">
                  Transaction: {tx.transactionHash}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: string;
  onDisconnect: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userRole,
  onDisconnect,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Wheat className="w-6 h-6" />
              <h1 className="text-xl font-bold">AgriSupplyChain</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Badge className="bg-transparent border-0 p-0 text-gray-700 font-medium">
                  {userRole}
                </Badge>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
                onClick={onDisconnect}
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6">
          {children}
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-auto">
        <div className="text-center text-sm text-gray-500">
          © 2024 AgriSupplyChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default function Home() {
  const { connect, disconnect, account, isActive, contract, error } = useWeb3();
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [registrationComplete, setRegistrationComplete] =
    useState<boolean>(false);

  const handleConnection = async () => {
    try {
      setConnectionStatus("Connecting...");
      if (window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await connect();
        // After successful connection, immediately show registration
        setShowRegistration(true);
      } else {
        setConnectionStatus("Please install MetaMask!");
      }
    } catch (err: any) {
      console.error(err);
      setConnectionStatus(err.message || "Failed to connect");
    }
  };

  // Effect to check user role whenever registration might have completed
  useEffect(() => {
    const checkUserRole = async () => {
      if (isActive && account && contract) {
        try {
          const role = await contract.methods.userRoles(account).call();
          if (role && role !== "") {
            setUserRole(role);
            setShowRegistration(false);
            setRegistrationComplete(true);
          }
        } catch (err) {
          console.error("Error checking role:", err);
        }
      }
    };

    checkUserRole();
  }, [isActive, account, contract, registrationComplete]);

  // Check for MetaMask on component mount
  useEffect(() => {
    if (!window.ethereum) {
      setConnectionStatus(
        "MetaMask is not installed. Please install MetaMask to use this application."
      );
    }
  }, []);

  const renderDashboard = () => {
    switch (userRole) {
      case "FARMER":
        return <FarmerDashboard contract={contract} account={account} />;
      case "COLLECTOR":
        return <CollectorDashboard contract={contract} account={account} />;
      case "TRANSPORTER":
        return <TransporterDashboard contract={contract} account={account} />;
      case "DISTRIBUTOR":
        return <DistributorDashboard contract={contract} account={account} />;
      case "RETAILER":
        return <RetailerDashboard contract={contract} account={account} />;
      default:
        return (
          <Card>
            <CardContent>
              <p className="text-center text-gray-500">
                Unknown role or role not assigned
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  if (!isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg backdrop-blur-sm bg-white/90 shadow-xl border-0">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <Wheat className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Welcome to AgriSupplyChain
              </CardTitle>
              <p className="text-gray-500 mt-2">
                Connect your wallet to start managing your agricultural supply
                chain
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {connectionStatus && (
              <Alert className="border-l-4 border-blue-500 bg-blue-50">
                <AlertDescription className="text-blue-700">
                  {connectionStatus}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert
                variant="destructive"
                className="border-l-4 border-red-500 bg-red-50"
              >
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <Button
                onClick={handleConnection}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <img
                  src="/metamask-fox.svg"
                  alt="MetaMask"
                  className="w-6 h-6"
                />
                Connect with MetaMask
              </Button>
            </div>
          </CardContent>

          <div className="border-t border-gray-100 mt-6 px-6 py-4 bg-gray-50/50">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Network Status: Active
              </div>
              <a href="#" className="hover:text-gray-700">
                Need Help?
              </a>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (showRegistration) {
    return (
      <div className="container mx-auto p-4">
        <UserRegistration contract={contract} account={account} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Wheat className="w-6 h-6" />
              <h1 className="text-xl font-bold">AgriSupplyChain</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Badge className="bg-transparent border-0 p-0 text-gray-700 font-medium">
                  {userRole}
                </Badge>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
                onClick={disconnect}
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Welcome, {userRole}!
          </h2>

          <div className="mt-6">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="inline-flex w-full gap-4 p-1 bg-gray-50 rounded-lg">
                <TabsTrigger
                  value="dashboard"
                  className="flex-1 px-4 py-2.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600 transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    {/* <LayoutDashboard className="w-4 h-4" /> */}
                    Dashboard
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="flex-1 px-4 py-2.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600 transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <History className="w-4 h-4" />
                    Transaction History
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                {renderDashboard()}
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <TransactionHistory contract={contract} account={account} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-auto">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>© 2024 AgriSupplyChain</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to Blockchain</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
