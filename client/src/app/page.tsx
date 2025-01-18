
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
//   const [basePrice, setBasePrice] = useState("");
//   const [error, setError] = useState("");
//   const { web3 } = useWeb3();

//   const createProduct = async () => {
//     try {
//       if (!web3) {
//         setError("Web3 not initialized");
//         return;
//       }
//       await contract.methods
//         .createProduct(
//           productName,
//           web3.utils.toWei(basePrice, 'ether')
//         )
//         .send({ from: account });
      
//       setProductName("");
//       setBasePrice("");
//       await fetchProducts();
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       if (!contract || !web3) {
//         console.error("Contract or web3 not initialized");
//         return;
//       }

//       const count = await contract.methods.productCount().call();
//       const fetchedProducts = [];
      
//       for (let i = 1; i <= count; i++) {
//         try {
//           // Call each method separately and access the returned object properties
//           const basicInfo = await contract.methods.getProductBasicInfo(i).call();
//           const fees = await contract.methods.getProductFees(i).call();
//           const actors = await contract.methods.getProductActors(i).call();
          
//           if (basicInfo.isValid && actors.farmer.toLowerCase() === account.toLowerCase()) {
//             fetchedProducts.push({
//               id: basicInfo.id,
//               name: basicInfo.name,
//               price: web3.utils.fromWei(basicInfo.basePrice, 'ether'),
//               state: basicInfo.state,
//               collectorFee: web3.utils.fromWei(fees.collectorFee, 'ether'),
//               transporterFee: web3.utils.fromWei(fees.transporterFee, 'ether'),
//               distributorFee: web3.utils.fromWei(fees.distributorFee, 'ether'),
//               retailerFee: web3.utils.fromWei(fees.retailerFee, 'ether')
//             });
//           }
//         } catch (err) {
//           console.error(`Error fetching product ${i}:`, err);
//           continue;
//         }
//       }
      
//       setProducts(fetchedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to fetch products. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (contract && account) {
//       fetchProducts();
//     }
//   }, [contract, account]);

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
//             placeholder="Base Price (ETH)"
//             type="number"
//             value={basePrice}
//             onChange={(e) => setBasePrice(e.target.value)}
//           />
//           <Button 
//             onClick={createProduct} 
//             className="w-full"
//             disabled={!productName || !basePrice}
//           >
//             Create Product
//           </Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>My Products</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {products.length === 0 ? (
//               <p className="text-gray-500 col-span-2 text-center py-4">
//                 No products found. Create your first product above.
//               </p>
//             ) : (
//               products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const CollectorDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [collectorFee, setCollectorFee] = useState("");
//   const [error, setError] = useState("");
//   const [product, setProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const { web3 } = useWeb3();
// const [loading, setLoading] = useState(false);

//   const fetchProduct = async (id) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       console.log("Fetching product:", id);
//       const productInfo = await contract.methods.getProductBasicInfo(id).call();
//       console.log("Product info:", productInfo);
      
//       // Convert state to number for comparison
//       const productState = Number(productInfo.state);
//       console.log("Product state:", productState);

//       if (!productInfo.isValid) {
//         setError("Product does not exist");
//         setProduct(null);
//         return;
//       }

//       if (productState !== 0) { // CREATED state = 0
//         setError("Product not in CREATED state");
//         setProduct(null);
//         return;
//       }

//       setProduct({
//         id: productInfo.id,
//         name: productInfo.name,
//         basePrice: web3.utils.fromWei(productInfo.basePrice, 'ether'),
//         state: productState
//       });
//       setError("");
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       setError("Error fetching product details");
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const collectProduct = async () => {
//     try {
//       if (!product) {
//         setError("Please fetch product details first");
//         return;
//       }

//       const collectorFeeWei = web3.utils.toWei(collectorFee, 'ether');
//       const basePriceWei = web3.utils.toWei(product.basePrice, 'ether');
      
//       await contract.methods.collectProduct(productId, collectorFeeWei).send({ 
//         from: account,
//         value: basePriceWei
//       });
      
//       setProductId("");
//       setCollectorFee("");
//       setProduct(null);
//       setError("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

  

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Box className="w-5 h-5" />
//             Collect Products
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <div className="flex gap-4">
//             <Input
//               placeholder="Product ID"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//             />
//             <Button onClick={() => fetchProduct(productId)}>
//               Fetch Details
//             </Button>
//           </div>
          
//           {product && (
//             <>
//               <div className="p-4 border rounded-md bg-gray-50">
//                 <p><strong>Name:</strong> {product.name}</p>
//                 <p><strong>Base Price:</strong> {product.basePrice} ETH</p>
//                 <p><strong>State:</strong> {['Created', 'Collected', 'In Transit', 'With Distributor', 'With Retailer', 'Sold'][product.state]}</p>
//               </div>
              
//               <Input
//                 placeholder="Your Collection Fee (ETH)"
//                 type="number"
//                 value={collectorFee}
//                 onChange={(e) => setCollectorFee(e.target.value)}
//               />
//             </>
//           )}
          
//           <Button 
//             onClick={collectProduct} 
//             className="w-full"
//             disabled={!product || !collectorFee}
//           >
//             Collect and Pay
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const TransporterDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [transporterFee, setTransporterFee] = useState("");
//   const [error, setError] = useState("");
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { web3 } = useWeb3();

//   const fetchProduct = async (id) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       console.log("Fetching product:", id);
//       const productInfo = await contract.methods.getProductBasicInfo(id).call();
//       console.log("Product info:", productInfo);
      
//       // Convert state to number for comparison
//       const productState = Number(productInfo.state);
//       console.log("Product state:", productState);

//       if (!productInfo.isValid) {
//         setError("Product does not exist");
//         setProduct(null);
//         return;
//       }

//       // Check for COLLECTED state (1)
//       if (productState !== 1) {
//         setError("Product not available for transport - must be in COLLECTED state");
//         setProduct(null);
//         return;
//       }

//       // Get collector fee that needs to be paid
//       const fees = await contract.methods.getProductFees(id).call();
//       console.log("Product fees:", fees);

//       setProduct({
//         id: productInfo.id,
//         name: productInfo.name,
//         collectorFee: web3.utils.fromWei(fees.collectorFee, 'ether'),
//         state: productState
//       });
//       setError("");
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       setError("Error fetching product details");
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transportProduct = async () => {
//     try {
//       if (!product) {
//         setError("Please fetch product details first");
//         return;
//       }

//       const transporterFeeWei = web3.utils.toWei(transporterFee, 'ether');
//       const collectorFeeWei = web3.utils.toWei(product.collectorFee, 'ether');
      
//       await contract.methods.transportProduct(productId, transporterFeeWei).send({ 
//         from: account,
//         value: collectorFeeWei
//       });
      
//       setProductId("");
//       setTransporterFee("");
//       setProduct(null);
//       setError("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Truck className="w-5 h-5" />
//             Transport Products
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <div className="flex gap-4">
//             <Input
//               placeholder="Product ID"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//             />
//             <Button onClick={() => fetchProduct(productId)}>
//               Fetch Details
//             </Button>
//           </div>
          
//           {product && (
//             <>
//               <div className="p-4 border rounded-md bg-gray-50">
//                 <p><strong>Name:</strong> {product.name}</p>
//                 <p><strong>Collector Fee to Pay:</strong> {product.collectorFee} ETH</p>
//                 <p><strong>State:</strong> {['Created', 'Collected', 'In Transit', 'With Distributor', 'With Retailer', 'Sold'][product.state]}</p>
//               </div>
              
//               <Input
//                 placeholder="Your Transport Fee (ETH)"
//                 type="number"
//                 value={transporterFee}
//                 onChange={(e) => setTransporterFee(e.target.value)}
//               />
//             </>
//           )}
          
//           <Button 
//             onClick={transportProduct} 
//             className="w-full"
//             disabled={!product || !transporterFee}
//           >
//             Transport and Pay
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };


// const DistributorDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [distributorFee, setDistributorFee] = useState("");
//   const [error, setError] = useState("");
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { web3 } = useWeb3();

//   const fetchProduct = async (id) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       console.log("Fetching product:", id);
//       const productInfo = await contract.methods.getProductBasicInfo(id).call();
//       console.log("Product info:", productInfo);
      
//       // Convert state to number for comparison
//       const productState = Number(productInfo.state);
//       console.log("Product state:", productState);

//       if (!productInfo.isValid) {
//         setError("Product does not exist");
//         setProduct(null);
//         return;
//       }

//       // Check for IN_TRANSIT state (2)
//       if (productState !== 2) {
//         setError("Product not available for distribution - must be in IN_TRANSIT state");
//         setProduct(null);
//         return;
//       }

//       const fees = await contract.methods.getProductFees(id).call();
//       console.log("Product fees:", fees);
      
//       setProduct({
//         id: productInfo.id,
//         name: productInfo.name,
//         state: productState,
//         transporterFee: web3.utils.fromWei(fees.transporterFee, 'ether')
//       });
//       setError("");
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       setError("Error fetching product details");
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const distributeProduct = async () => {
//     try {
//       if (!product) {
//         setError("Please fetch product details first");
//         return;
//       }

//       const distributorFeeWei = web3.utils.toWei(distributorFee, 'ether');
//       const transporterFeeWei = web3.utils.toWei(product.transporterFee, 'ether');
      
//       await contract.methods.distributeProduct(productId, distributorFeeWei).send({ 
//         from: account,
//         value: transporterFeeWei
//       });
      
//       setProductId("");
//       setDistributorFee("");
//       setProduct(null);
//       setError("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Store className="w-5 h-5" />
//             Distribute Products
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <div className="flex gap-4">
//             <Input
//               placeholder="Product ID"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//             />
//             <Button onClick={() => fetchProduct(productId)}>
//               Fetch Details
//             </Button>
//           </div>
          
//           {product && (
//             <>
//               <div className="p-4 border rounded-md bg-gray-50">
//                 <p><strong>Name:</strong> {product.name}</p>
//                 <p><strong>Transporter Fee to Pay:</strong> {product.transporterFee} ETH</p>
//                 <p><strong>State:</strong> {['Created', 'Collected', 'In Transit', 'With Distributor', 'With Retailer', 'Sold'][product.state]}</p>
//               </div>
              
//               <Input
//                 placeholder="Your Distribution Fee (ETH)"
//                 type="number"
//                 value={distributorFee}
//                 onChange={(e) => setDistributorFee(e.target.value)}
//               />
//             </>
//           )}
          
//           <Button 
//             onClick={distributeProduct} 
//             className="w-full"
//             disabled={!product || !distributorFee}
//           >
//             Distribute and Pay
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };



// const RetailerDashboard = ({ contract, account }) => {
//   const [productId, setProductId] = useState("");
//   const [retailerFee, setRetailerFee] = useState("");
//   const [error, setError] = useState("");
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { web3 } = useWeb3();

//   // const fetchProduct = async (id) => {
//   //   try {
//   //     const productInfo = await contract.methods.getProductBasicInfo(id).call();
      
//   //     if (!productInfo.isValid || productInfo.state !== '3') {
//   //       setError("Product not available for retail");
//   //       setProduct(null);
//   //       return;
//   //     }

//   //     const fees = await contract.methods.getProductFees(id).call();
      
//   //     setProduct({
//   //       id: productInfo.id,
//   //       name: productInfo.name,
//   //       state: productInfo.state,
//   //       distributorFee: web3.utils.fromWei(fees.distributorFee, 'ether')
//   //     });
//   //     setError("");
//   //   } catch (error) {
//   //     setError("Error fetching product details");
//   //     setProduct(null);
//   //   }
//   // };
//   const fetchProduct = async (id) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       console.log("Fetching product:", id);
//       const productInfo = await contract.methods.getProductBasicInfo(id).call();
//       console.log("Product info:", productInfo);
      
//       // Convert state to number for comparison
//       const productState = Number(productInfo.state);
//       console.log("Product state:", productState);

//       if (!productInfo.isValid) {
//         setError("Product does not exist");
//         setProduct(null);
//         return;
//       }

//       // Check for WITH_DISTRIBUTOR state (3)
//       if (productState !== 3) {
//         setError("Product not available for retail - must be with distributor");
//         setProduct(null);
//         return;
//       }

//       const fees = await contract.methods.getProductFees(id).call();
//       console.log("Product fees:", fees);
      
//       setProduct({
//         id: productInfo.id,
//         name: productInfo.name,
//         state: productState,
//         distributorFee: web3.utils.fromWei(fees.distributorFee, 'ether')
//       });
//       setError("");
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       setError("Error fetching product details");
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendToRetail = async () => {
//     try {
//       if (!product) {
//         setError("Please fetch product details first");
//         return;
//       }

//       const retailerFeeWei = web3.utils.toWei(retailerFee, 'ether');
//       const distributorFeeWei = web3.utils.toWei(product.distributorFee, 'ether');
      
//       await contract.methods.sendToRetailer(productId, retailerFeeWei).send({ 
//         from: account,
//         value: distributorFeeWei
//       });
      
//       setProductId("");
//       setRetailerFee("");
//       setProduct(null);
//       setError("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <ShoppingBag className="w-5 h-5" />
//             Retail Products
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <div className="flex gap-4">
//             <Input
//               placeholder="Product ID"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//             />
//             <Button onClick={() => fetchProduct(productId)}>
//               Fetch Details
//             </Button>
//           </div>
          
//           {product && (
//             <>
//               <div className="p-4 border rounded-md bg-gray-50">
//                 <p><strong>Name:</strong> {product.name}</p>
//                 <p><strong>Distributor Fee to Pay:</strong> {product.distributorFee} ETH</p>
//                 <p><strong>State:</strong> {['Created', 'Collected', 'In Transit', 'With Distributor', 'With Retailer', 'Sold'][product.state]}</p>
//               </div>
              
//               <Input
//                 placeholder="Your Retail Fee (ETH)"
//                 type="number"
//                 value={retailerFee}
//                 onChange={(e) => setRetailerFee(e.target.value)}
//               />
//             </>
//           )}
          
//           <Button 
//             onClick={sendToRetail} 
//             className="w-full"
//             disabled={!product || !retailerFee}
//           >
//             Accept and Pay
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
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




"use client"
import React, { useState, useEffect } from 'react';
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
import UserRegistration from './registration/page';

const ProductCard = ({ product }) => {
  const stateColors = {
    Created: "bg-blue-100 text-blue-800",
    CollectedByCollector: "bg-purple-100 text-purple-800",
    WithTransporter: "bg-yellow-100 text-yellow-800",
    WithDistributor: "bg-green-100 text-green-800",
    WithRetailer: "bg-pink-100 text-pink-800",
    Sold: "bg-gray-100 text-gray-800"
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{product.name}</h3>
          <Badge className={stateColors[product.state]}>
            {product.state}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">ID: {product.id}</p>
        <p className="text-sm text-gray-500">Price: {product.price} ETH</p>
      </CardContent>
    </Card>
  );
};

const ProductList = ({ products, onSelect, selectedId, stateLabel }) => {
  if (!products.length) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-md">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {products.map((product) => (
        <Card 
          key={product.id}
          className={`cursor-pointer transition-all ${
            selectedId === product.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onSelect(product.id)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{product.name}</h3>
              <Badge className="bg-blue-100 text-blue-800">
                {stateLabel}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">ID: {product.id}</p>
            {product.basePrice && (
              <p className="text-sm text-gray-500">Base Price: {product.basePrice} ETH</p>
            )}
            {product.collectorFee && (
              <p className="text-sm text-gray-500">Collector Fee: {product.collectorFee} ETH</p>
            )}
            {product.transporterFee && (
              <p className="text-sm text-gray-500">Transporter Fee: {product.transporterFee} ETH</p>
            )}
            {product.distributorFee && (
              <p className="text-sm text-gray-500">Distributor Fee: {product.distributorFee} ETH</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
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
        .createProduct(
          productName,
          web3.utils.toWei(basePrice, 'ether')
        )
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
          const basicInfo = await contract.methods.getProductBasicInfo(i).call();
          const fees = await contract.methods.getProductFees(i).call();
          const actors = await contract.methods.getProductActors(i).call();
          
          if (basicInfo.isValid && actors.farmer.toLowerCase() === account.toLowerCase()) {
            fetchedProducts.push({
              id: basicInfo.id,
              name: basicInfo.name,
              price: web3.utils.fromWei(basicInfo.basePrice, 'ether'),
              state: basicInfo.state,
              collectorFee: web3.utils.fromWei(fees.collectorFee, 'ether'),
              transporterFee: web3.utils.fromWei(fees.transporterFee, 'ether'),
              distributorFee: web3.utils.fromWei(fees.distributorFee, 'ether'),
              retailerFee: web3.utils.fromWei(fees.retailerFee, 'ether')
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
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [collectorFee, setCollectorFee] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  const fetchAvailableProducts = async () => {
    try {
      setLoading(true);
      const count = await contract.methods.productCount().call();
      const products = [];

      for (let i = 1; i <= count; i++) {
        const productInfo = await contract.methods.getProductBasicInfo(i).call();
        if (productInfo.isValid && Number(productInfo.state) === 0) {
          products.push({
            id: productInfo.id,
            name: productInfo.name,
            basePrice: web3.utils.fromWei(productInfo.basePrice, 'ether'),
            state: productInfo.state
          });
        }
      }

      setAvailableProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch available products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchAvailableProducts();
    }
  }, [contract, account]);

  const collectProduct = async () => {
    try {
      if (!selectedProductId) {
        setError("Please select a product first");
        return;
      }

      const product = availableProducts.find(p => p.id === selectedProductId);
      const collectorFeeWei = web3.utils.toWei(collectorFee, 'ether');
      const basePriceWei = web3.utils.toWei(product.basePrice, 'ether');
      
      await contract.methods.collectProduct(selectedProductId, collectorFeeWei)
        .send({ from: account, value: basePriceWei });
      
      setCollectorFee("");
      setSelectedProductId(null);
      await fetchAvailableProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Products for Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <ProductList
            products={availableProducts}
            onSelect={setSelectedProductId}
            selectedId={selectedProductId}
            stateLabel="Available"
          />
          
          {selectedProductId && (
            <>
              <Input
                placeholder="Your Collection Fee (ETH)"
                type="number"
                value={collectorFee}
                onChange={(e) => setCollectorFee(e.target.value)}
              />
              <Button 
                onClick={collectProduct} 
                className="w-full"
                disabled={!collectorFee}
              >
                Collect and Pay
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


const TransporterDashboard = ({ contract, account }) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [transporterFee, setTransporterFee] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  const fetchAvailableProducts = async () => {
    try {
      setLoading(true);
      const count = await contract.methods.productCount().call();
      const products = [];

      for (let i = 1; i <= count; i++) {
        const productInfo = await contract.methods.getProductBasicInfo(i).call();
        if (productInfo.isValid && Number(productInfo.state) === 1) {
          const fees = await contract.methods.getProductFees(i).call();
          products.push({
            id: productInfo.id,
            name: productInfo.name,
            collectorFee: web3.utils.fromWei(fees.collectorFee, 'ether'),
            state: productInfo.state
          });
        }
      }

      setAvailableProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch available products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchAvailableProducts();
    }
  }, [contract, account]);

  const transportProduct = async () => {
    try {
      if (!selectedProductId) {
        setError("Please select a product first");
        return;
      }

      const product = availableProducts.find(p => p.id === selectedProductId);
      const transporterFeeWei = web3.utils.toWei(transporterFee, 'ether');
      const collectorFeeWei = web3.utils.toWei(product.collectorFee, 'ether');
      
      await contract.methods.transportProduct(selectedProductId, transporterFeeWei)
        .send({ from: account, value: collectorFeeWei });
      
      setTransporterFee("");
      setSelectedProductId(null);
      await fetchAvailableProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Products Ready for Transport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <ProductList
            products={availableProducts}
            onSelect={setSelectedProductId}
            selectedId={selectedProductId}
            stateLabel="Ready for Transport"
          />
          
          {selectedProductId && (
            <>
              <Input
                placeholder="Your Transport Fee (ETH)"
                type="number"
                value={transporterFee}
                onChange={(e) => setTransporterFee(e.target.value)}
              />
              <Button 
                onClick={transportProduct} 
                className="w-full"
                disabled={!transporterFee}
              >
                Transport and Pay
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


const DistributorDashboard = ({ contract, account }) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [distributorFee, setDistributorFee] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  const fetchAvailableProducts = async () => {
    try {
      setLoading(true);
      const count = await contract.methods.productCount().call();
      const products = [];

      for (let i = 1; i <= count; i++) {
        const productInfo = await contract.methods.getProductBasicInfo(i).call();
        if (productInfo.isValid && Number(productInfo.state) === 2) { // IN_TRANSIT state
          const fees = await contract.methods.getProductFees(i).call();
          products.push({
            id: productInfo.id,
            name: productInfo.name,
            transporterFee: web3.utils.fromWei(fees.transporterFee, 'ether'),
            state: productInfo.state
          });
        }
      }

      setAvailableProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch available products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchAvailableProducts();
    }
  }, [contract, account]);

  const distributeProduct = async () => {
    try {
      if (!selectedProductId) {
        setError("Please select a product first");
        return;
      }

      const product = availableProducts.find(p => p.id === selectedProductId);
      const distributorFeeWei = web3.utils.toWei(distributorFee, 'ether');
      const transporterFeeWei = web3.utils.toWei(product.transporterFee, 'ether');
      
      await contract.methods.distributeProduct(selectedProductId, distributorFeeWei)
        .send({ from: account, value: transporterFeeWei });
      
      setDistributorFee("");
      setSelectedProductId(null);
      await fetchAvailableProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Products Ready for Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <ProductList
            products={availableProducts}
            onSelect={setSelectedProductId}
            selectedId={selectedProductId}
            stateLabel="In Transit"
          />
          
          {selectedProductId && (
            <>
              <Input
                placeholder="Your Distribution Fee (ETH)"
                type="number"
                value={distributorFee}
                onChange={(e) => setDistributorFee(e.target.value)}
              />
              <Button 
                onClick={distributeProduct} 
                className="w-full"
                disabled={!distributorFee}
              >
                Distribute and Pay
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};



const RetailerDashboard = ({ contract, account }) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [retailerFee, setRetailerFee] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { web3 } = useWeb3();

  const fetchAvailableProducts = async () => {
    try {
      setLoading(true);
      const count = await contract.methods.productCount().call();
      const products = [];

      for (let i = 1; i <= count; i++) {
        const productInfo = await contract.methods.getProductBasicInfo(i).call();
        if (productInfo.isValid && Number(productInfo.state) === 3) { // WITH_DISTRIBUTOR state
          const fees = await contract.methods.getProductFees(i).call();
          products.push({
            id: productInfo.id,
            name: productInfo.name,
            distributorFee: web3.utils.fromWei(fees.distributorFee, 'ether'),
            state: productInfo.state
          });
        }
      }

      setAvailableProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch available products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchAvailableProducts();
    }
  }, [contract, account]);

  const sendToRetail = async () => {
    try {
      if (!selectedProductId) {
        setError("Please select a product first");
        return;
      }

      const product = availableProducts.find(p => p.id === selectedProductId);
      const retailerFeeWei = web3.utils.toWei(retailerFee, 'ether');
      const distributorFeeWei = web3.utils.toWei(product.distributorFee, 'ether');
      
      await contract.methods.sendToRetailer(selectedProductId, retailerFeeWei)
        .send({ from: account, value: distributorFeeWei });
      
      setRetailerFee("");
      setSelectedProductId(null);
      await fetchAvailableProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Products Available for Retail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <ProductList
            products={availableProducts}
            onSelect={setSelectedProductId}
            selectedId={selectedProductId}
            stateLabel="With Distributor"
          />
          
          {selectedProductId && (
            <>
              <Input
                placeholder="Your Retail Fee (ETH)"
                type="number"
                value={retailerFee}
                onChange={(e) => setRetailerFee(e.target.value)}
              />
              <Button 
                onClick={sendToRetail} 
                className="w-full"
                disabled={!retailerFee}
              >
                Accept and Pay
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { CollectorDashboard, TransporterDashboard, DistributorDashboard, RetailerDashboard };


const TransactionHistory = ({ contract, account }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        // Get past events
        const events = await contract.getPastEvents('ProductStateChanged', {
          fromBlock: 0,
          toBlock: 'latest'
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
                <p className="font-semibold">Product ID: {tx.returnValues.productId}</p>
                <p className="text-sm text-gray-500">New State: {tx.returnValues.newState}</p>
                <p className="text-xs text-gray-400">Transaction: {tx.transactionHash}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardLayout = ({ children, userRole, onDisconnect }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Wheat className="w-6 h-6" />
              <h1 className="text-xl font-bold">AgriSupplyChain</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                Role: {userRole}
              </Badge>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
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
        {children}
      </main>
    </div>
  );
};

export default function Home() {
  const { connect, disconnect, account, isActive, contract, error } = useWeb3();
  const [connectionStatus, setConnectionStatus] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleConnection = async () => {
    try {
      setConnectionStatus("Connecting...");
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        await connect();
        // After successful connection, immediately show registration
        setShowRegistration(true);
      } else {
        setConnectionStatus("Please install MetaMask!");
      }
    } catch (err) {
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
      setConnectionStatus("MetaMask is not installed. Please install MetaMask to use this application.");
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
              <p className="text-center text-gray-500">Unknown role or role not assigned</p>
            </CardContent>
          </Card>
        );
    }
  };

  if (!isActive) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wheat className="w-6 h-6" />
              Welcome to AgriSupplyChain
            </CardTitle>
          </CardHeader>
          <CardContent>
            {connectionStatus && (
              <Alert className="mb-4">
                <AlertDescription>{connectionStatus}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              onClick={handleConnection}
              className="w-full"
            >
              Connect with MetaMask
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showRegistration) {
    return (
      <div className="container mx-auto p-4">
        <UserRegistration
          contract={contract} 
          account={account} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Wheat className="w-6 h-6" />
              <h1 className="text-xl font-bold">AgriSupplyChain</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                Role: {userRole}
              </Badge>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
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
        <h2>Welcome, {userRole}!</h2>
        <div className="mt-6">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              {renderDashboard()}
            </TabsContent>
            
            <TabsContent value="history">
              <TransactionHistory 
                contract={contract} 
                account={account}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}