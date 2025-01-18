"use client";
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/web3Context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CollectorDashboard from "./collector/page";
import DistributorDashboard from "./distributor/page";
import FarmerDashboard from "./farmer/page";
import TransporterDashboard from "./transporter/page";
import {
  LayoutDashboard,
  History,
  Wheat,
  Box,
  Truck,
  Store,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import UserRegistration from "./registration/page";

interface Product {
  id: string;
  name: string;
  price: string;
  state: string;
}

interface DashboardProps {
  contract: any;
  account: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
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

const RetailerDashboard: React.FC<DashboardProps> = ({ contract, account }) => {
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const sendToRetail = async () => {
    try {
      await contract.methods.sendToRetailer(productId).send({ from: account });
      setProductId("");
    } catch (error: any) {
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
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Wheat className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AgriSupplyChain
              </h1>
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

const Home: React.FC = () => {
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
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Wheat className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AgriSupplyChain
              </h1>
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
                    <LayoutDashboard className="w-4 h-4" />
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
};

export default Home;
