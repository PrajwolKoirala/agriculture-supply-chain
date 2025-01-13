// //page.tsx

// 'use client';

// import { useWeb3 } from "@/contexts/web3Context";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";

// export default function Home() {
//   const { connect, disconnect, account, isActive, contract } = useWeb3();

//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productId, setProductId] = useState("");

//   const createProduct = async () => {
//     if (!contract || !account) return;
//     try {
//       await contract.methods
//         .createProduct(productName, productPrice)
//         .send({ from: account });
//       alert("Product created successfully!");
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   };

//   const handleRoleAction = async (action: string) => {
//     if (!contract || !account) return;
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
//     } catch (error) {
//       console.error("Error performing action:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>AgriSupplyChain Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {!isActive ? (
//             <Button onClick={connect}>Connect Wallet</Button>
//           ) : (
//             <div className="space-y-4">
//               <p>Connected Account: {account}</p>
//               <Button onClick={disconnect} variant="outline">
//                 Disconnect
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {isActive && (
//         <>
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

'use client';

import { useWeb3 } from "@/contexts/web3Context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UserRegistration from "./registration/page";
import TransactionHistory from "./transaction-history/page";
import Web3 from "web3";

export default function Home() {
  const { connect, disconnect, account, isActive, contract, error } = useWeb3();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  const handleConnection = async () => {
    try {
      setConnectionStatus("Connecting...");
      // First request account access
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        await connect();
      } else {
        setConnectionStatus("Please install MetaMask!");
      }
    } catch (err: any) {
      console.error(err);
      setConnectionStatus(err.message || "Failed to connect");
    }
  };

  const createProduct = async () => {
    if (!contract || !account) {
      setConnectionStatus("Please connect your wallet first");
      return;
    }
    try {
      await contract.methods
        .createProduct(productName, productPrice)
        .send({ from: account });
      alert("Product created successfully!");
      console.log("🚀 ~ file: page.tsx:151 ~ Home ~ productId:", productId);
    } catch (error: any) {
      console.error("Error creating product:", error);
      setConnectionStatus(error.message);
    }
  };

  const handleRoleAction = async (action: string) => {
    if (!contract || !account) {
      setConnectionStatus("Please connect your wallet first");
      return;
    }
    try {
      switch (action) {
        case "collect":
          await contract.methods.collectProduct(productId).send({ from: account });
          break;
        case "transport":
          await contract.methods.transportProduct(productId).send({ from: account });
          break;
        case "distribute":
          await contract.methods.distributeProduct(productId).send({ from: account });
          break;
        case "retail":
          await contract.methods.sendToRetailer(productId).send({ from: account });
          break;
        case "purchase":
          await contract.methods.purchaseProduct(productId).send({ from: account });
          break;
      }
      alert("Action completed successfully!");
    } catch (error: any) {
      console.error("Error performing action:", error);
      setConnectionStatus(error.message);
    }
  };

  // Check for MetaMask on component mount
  useEffect(() => {
    if (!window.ethereum) {
      setConnectionStatus("MetaMask is not installed. Please install MetaMask to use this application.");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AgriSupplyChain Management</CardTitle>
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

          {!isActive ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">
                Connect your MetaMask wallet to interact with the supply chain.
              </p>
              <Button
                onClick={handleConnection}
                className="w-full sm:w-auto"
              >
                Connect MetaMask
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">Connected Account: {account}</p>
              <Button onClick={disconnect} variant="outline">
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isActive && (
        <>
        <UserRegistration contract={contract} account={account} />
        <TransactionHistory
      web3={new Web3(window.ethereum)} 
      contract={contract} 
      account={account} 
    />
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Input
                placeholder="Product Price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Button onClick={createProduct}>Create Product</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button onClick={() => handleRoleAction("collect")}>
                  Collect Product
                </Button>
                <Button onClick={() => handleRoleAction("transport")}>
                  Transport Product
                </Button>
                <Button onClick={() => handleRoleAction("distribute")}>
                  Distribute Product
                </Button>
                <Button onClick={() => handleRoleAction("retail")}>
                  Send to Retailer
                </Button>
                <Button onClick={() => handleRoleAction("purchase")}>
                  Purchase Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// "use client";

// import { useWeb3 } from "@/contexts/web3Context";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useState, useEffect } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import UserRegistration from "./registration/page";
// import Web3 from "web3";
// export default function Home() {
//   const { connect, disconnect, account, isActive, contract } = useWeb3();
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productId, setProductId] = useState("");
//   const [transactionStatus, setTransactionStatus] = useState("");
//   const [productStatus, setProductStatus] = useState<string | null>(null);

//   // Function to check product status
//   const checkProductStatus = async (id: string) => {
//     if (!contract || !account) return;
//     try {
//       const product = await contract.methods.products(id).call();
//       setProductStatus(product.status);
//       return product.status;
//     } catch (error) {
//       console.error("Error checking product status:", error);
//       setTransactionStatus("Error checking product status");
//     }
//   };

//   // const createProduct = async () => {
//   //   if (!contract || !account) {
//   //     setTransactionStatus("Please connect your wallet first");
//   //     return;
//   //   }

//   //   // Check user role first
//   //   try {
//   //     const userRole = await contract.methods.userRoles(account).call();
//   //     console.log("User role:", userRole);

//   //     if (userRole !== "FARMER") {
//   //       setTransactionStatus(
//   //         "Error: Only farmers can create products. Your role: " + userRole
//   //       );
//   //       return;
//   //     }

//   //     // Validate inputs
//   //     if (!productName || !productPrice) {
//   //       setTransactionStatus("Please fill in all fields");
//   //       return;
//   //     }

//   //     setTransactionStatus("Creating product...");

//   //     // Estimate gas first
//   //     const gasEstimate = await contract.methods
//   //       .createProduct(productName, productPrice)
//   //       .estimateGas({ from: account });

//   //     console.log("Estimated gas:", gasEstimate);

//   //     // Add 20% buffer to gas estimate
//   //     const gasLimit = Math.ceil(gasEstimate * 1.2);

//   //     const result = await contract.methods
//   //       .createProduct(productName, productPrice)
//   //       .send({
//   //         from: account,
//   //         gas: gasLimit,
//   //       });

//   //     const productId = result.events.ProductCreated.returnValues.productId;
//   //     setProductId(productId);
//   //     setTransactionStatus(
//   //       `Product created successfully! Product ID: ${productId}`
//   //     );

//   //     // Clear form
//   //     setProductName("");
//   //     setProductPrice("");
//   //   } catch (error: any) {
//   //     console.error("Error details:", error);

//   //     // More detailed error reporting
//   //     let errorMessage = "Error creating product: ";
//   //     if (error.message.includes("User not registered")) {
//   //       errorMessage += "You are not registered as a farmer";
//   //     } else if (error.message.includes("Only farmers can create products")) {
//   //       errorMessage += "Only farmers can create products";
//   //     } else {
//   //       errorMessage += error.message;
//   //     }

//   //     setTransactionStatus(errorMessage);
//   //   }
//   // };


//   const createProduct = async () => {
//     if (!contract || !account) {
//       setTransactionStatus("Please connect your wallet first");
//       return;
//     }
  
//     try {
//       const userRole = await contract.methods.userRoles(account).call();
//       console.log("User role:", userRole);
      
//       if (userRole !== "FARMER") {
//         setTransactionStatus("Error: Only farmers can create products. Your role: " + userRole);
//         return;
//       }
  
//       // Validate inputs
//       if (!productName || !productPrice) {
//         setTransactionStatus("Please fill in all fields");
//         return;
//       }
  
//       setTransactionStatus("Creating product...");
      
//       // Convert price to Wei (or your desired denomination)
//       const priceInWei = Web3.utils.toWei(productPrice, 'ether');
      
//       // Estimate gas
//       const gasEstimate = await contract.methods
//         .createProduct(productName, priceInWei)
//         .estimateGas({ from: account });
      
//       console.log("Estimated gas:", Number(gasEstimate)); // Convert BigInt to Number for logging
      
//       // Add 20% buffer to gas estimate
//       const gasLimit = Math.ceil(Number(gasEstimate) * 1.2);
  
//       const result = await contract.methods
//         .createProduct(productName, priceInWei)
//         .send({ 
//           from: account,
//           gas: gasLimit.toString() // Convert to string for web3
//         });
      
//       const productId = result.events.ProductCreated.returnValues.productId;
//       setProductId(productId);
//       setTransactionStatus(`Product created successfully! Product ID: ${productId}`);
      
//       // Clear form
//       setProductName("");
//       setProductPrice("");
      
//     } catch (error: any) {
//       console.error("Error details:", error);
//       let errorMessage = "Error creating product: ";
      
//       if (error.message.includes("User not registered")) {
//         errorMessage += "You are not registered as a farmer";
//       } else if (error.message.includes("Only farmers can create products")) {
//         errorMessage += "Only farmers can create products";
//       } else {
//         errorMessage += error.message;
//       }
      
//       setTransactionStatus(errorMessage);
//     }
//   };

//   // const createProduct = async () => {
//   //   if (!contract || !account) return;
//   //   setTransactionStatus("Creating product...");
//   //   try {
//   //     const result = await contract.methods
//   //       .createProduct(productName, productPrice)
//   //       .send({ from: account });

//   //     // Get the product ID from the event
//   //     const productId = result.events.ProductCreated.returnValues.productId;
//   //     setProductId(productId);
//   //     setTransactionStatus(`Product created successfully! Product ID: ${productId}`);

//   //     // Clear form
//   //     setProductName("");
//   //     setProductPrice("");
//   //   } catch (error: any) {
//   //     console.error("Error creating product:", error);
//   //     setTransactionStatus(`Error: ${error.message}`);
//   //   }
//   // };

//   const handleRoleAction = async (action: string) => {
//     if (!contract || !account || !productId) {
//       setTransactionStatus("Please enter a product ID");
//       return;
//     }

//     setTransactionStatus(`Processing ${action}...`);
//     try {
//       // Check current status first
//       const currentStatus = await checkProductStatus(productId);
//       console.log("Current product status:", currentStatus);

//       let transaction;
//       switch (action) {
//         case "collect":
//           transaction = await contract.methods
//             .collectProduct(productId)
//             .send({ from: account });
//           break;
//         case "transport":
//           transaction = await contract.methods
//             .transportProduct(productId)
//             .send({ from: account });
//           break;
//         case "distribute":
//           transaction = await contract.methods
//             .distributeProduct(productId)
//             .send({ from: account });
//           break;
//         case "retail":
//           transaction = await contract.methods
//             .sendToRetailer(productId)
//             .send({ from: account });
//           break;
//         case "purchase":
//           transaction = await contract.methods
//             .purchaseProduct(productId)
//             .send({ from: account });
//           break;
//       }

//       await checkProductStatus(productId);
//       setTransactionStatus(`${action} completed successfully!`);
//     } catch (error: any) {
//       console.error(`Error during ${action}:`, error);
//       setTransactionStatus(`Error: ${error.message}`);
//     }
//   };

//   // Automatically check product status when ID is entered
//   useEffect(() => {
//     console.log("🚀 ~ file: page.tsx:418 ~ useEffect ~ productId:", productId);
//     if (productId) {
//       checkProductStatus(productId);
//     }
//   }, [productId, contract, account]);

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>AgriSupplyChain Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {!isActive ? (
//             <Button onClick={connect}>Connect Wallet</Button>
//           ) : (
//             <div className="space-y-4">
//               <p>Connected Account: {account}</p>
//               <Button onClick={disconnect} variant="outline">
//                 Disconnect
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {isActive && (
//         <>
//           <UserRegistration contract={contract} account={account} />

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

//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle>Product Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Input
//                 placeholder="Product ID"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//               />
//               {productStatus && (
//                 <Alert>
//                   <AlertDescription>
//                     Current Product Status: {productStatus}
//                   </AlertDescription>
//                 </Alert>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <Button
//                   onClick={() => handleRoleAction("collect")}
//                   disabled={productStatus !== "Created"}
//                 >
//                   Collect Product
//                 </Button>
//                 <Button
//                   onClick={() => handleRoleAction("transport")}
//                   disabled={productStatus !== "Collected"}
//                 >
//                   Transport Product
//                 </Button>
//                 <Button
//                   onClick={() => handleRoleAction("distribute")}
//                   disabled={productStatus !== "InTransit"}
//                 >
//                   Distribute Product
//                 </Button>
//                 <Button
//                   onClick={() => handleRoleAction("retail")}
//                   disabled={productStatus !== "Distributed"}
//                 >
//                   Send to Retailer
//                 </Button>
//                 <Button
//                   onClick={() => handleRoleAction("purchase")}
//                   disabled={productStatus !== "AtRetailer"}
//                 >
//                   Purchase Product
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {transactionStatus && (
//             <Alert className="mt-4">
//               <AlertDescription>{transactionStatus}</AlertDescription>
//             </Alert>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
