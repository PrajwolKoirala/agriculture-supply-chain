
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

// const UserRegistration = ({ contract, account, onComplete }) => {
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");

//   const registerUser = async () => {
//     try {
//       await contract.methods.registerUser(account, role).send({ from: account });
//       onComplete();
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Card className="max-w-md mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <User className="w-5 h-5" />
//           User Registration
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Select Role</label>
//           <select
//             className="w-full p-2 border rounded-md"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="">Select a role</option>
//             <option value="FARMER">Farmer</option>
//             <option value="COLLECTOR">Collector</option>
//             <option value="TRANSPORTER">Transporter</option>
//             <option value="DISTRIBUTOR">Distributor</option>
//             <option value="RETAILER">Retailer</option>
//           </select>
//         </div>
//         <Button onClick={registerUser} className="w-full">
//           Register
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

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

const FarmerDashboard = ({ contract, account }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState("");

  const createProduct = async () => {
    try {
      await contract.methods
        .createProduct(productName, productPrice)
        .send({ from: account });
      setProductName("");
      setProductPrice("");
      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const count = await contract.methods.productCount().call();
      const fetchedProducts = [];
      for (let i = 1; i <= count; i++) {
        const product = await contract.methods.getProduct(i).call();
        if (product.farmer === account) {
          fetchedProducts.push({
            id: product.id,
            name: product.name,
            price: product.price,
            state: product.state
          });
        }
      }
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
            placeholder="Product Price (ETH)"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <Button onClick={createProduct} className="w-full">Create Product</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CollectorDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");

  const collectProduct = async () => {
    try {
      await contract.methods.collectProduct(productId).send({ from: account });
      setProductId("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <Input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button onClick={collectProduct} className="w-full">
          Collect Product
        </Button>
      </CardContent>
    </Card>
  );
};

const TransporterDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");

  const transportProduct = async () => {
    try {
      await contract.methods.transportProduct(productId).send({ from: account });
      setProductId("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <Input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button onClick={transportProduct} className="w-full">
          Transport Product
        </Button>
      </CardContent>
    </Card>
  );
};

const DistributorDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");

  const distributeProduct = async () => {
    try {
      await contract.methods.distributeProduct(productId).send({ from: account });
      setProductId("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <Input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button onClick={distributeProduct} className="w-full">
          Distribute Product
        </Button>
      </CardContent>
    </Card>
  );
};

const RetailerDashboard = ({ contract, account }) => {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");

  const sendToRetail = async () => {
    try {
      await contract.methods.sendToRetailer(productId).send({ from: account });
      setProductId("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <Input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button onClick={sendToRetail} className="w-full">
          Send to Retail
        </Button>
      </CardContent>
    </Card>
  );
};

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

// export default function Home() {
//   const { connect, disconnect, account, isActive, contract, error } = useWeb3();
//   const [connectionStatus, setConnectionStatus] = useState("");
//   const [userRole, setUserRole] = useState(null);
//   const [showRegistration, setShowRegistration] = useState(false);

//   const handleConnection = async () => {
//     try {
//       setConnectionStatus("Connecting...");
//       if (window.ethereum) {
//         await window.ethereum.request({
//           method: 'eth_requestAccounts'
//         });
//         await connect();
        
//         // Check if user has a role
//         const role = await contract.methods.userRoles(account).call();
//         if (!role) {
//           setShowRegistration(true);
//         } else {
//           setUserRole(role);
//         }
//       } else {
//         setConnectionStatus("Please install MetaMask!");
//       }
//     } catch (err) {
//       console.error(err);
//       setConnectionStatus(err.message || "Failed to connect");
//     }
//   };

//   const handleRegistrationComplete = async () => {
//     const role = await contract.methods.userRoles(account).call();
//     console.log("🚀 ~ file: page.tsx:655 ~ handleRegistrationComplete ~ role:", role);
//     setUserRole(role);
//     setShowRegistration(false);
//   };

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
//     return <UserRegistration 
//       contract={contract} 
//       account={account} 
//       onComplete={handleRegistrationComplete}
//     />;
//   }

//   return (
//     <DashboardLayout onDisconnect={disconnect} userRole={userRole}>
//       <Tabs defaultValue="dashboard" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//           <TabsTrigger value="history">Transaction History</TabsTrigger>
//         </TabsList>
        
//         <TabsContent value="dashboard">
//           {renderDashboard()}
//         </TabsContent>
        
//         <TabsContent value="history">
//           <TransactionHistory 
//             contract={contract} 
//             account={account}
//           />
//         </TabsContent>
//       </Tabs>
//     </DashboardLayout>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useWeb3 } from "@/contexts/web3Context";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { 
//   History, 
//   Wheat,
//   LogOut,
// } from "lucide-react";
// import UserRegistration from './registration/page';
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