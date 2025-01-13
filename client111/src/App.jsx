import { useState } from 'react'
import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box p={4}>
      <Stack spacing={4} align="center">
        <Stack direction="row" spacing={4}>
          <a href="https://vite.dev" target="_blank">
            <Image src={viteLogo} alt="Vite logo" boxSize="100px" />
          </a>
          <a href="https://react.dev" target="_blank">
            <Image src={reactLogo} alt="React logo" boxSize="100px" />
          </a>
        </Stack>
        
        <Heading>Vite + React</Heading>
        
        <Box>
          <Button onClick={() => setCount((count) => count + 1)} mb={4}>
            count is {count}
          </Button>
          <Text>
            Edit <code>src/App.jsx</code> and save to test HMR
          </Text>
        </Box>
        
        <Text fontSize="sm" color="gray.500">
          Click on the Vite and React logos to learn more
        </Text>
      </Stack>
    </Box>
  )
}

export default App


// // src/App.jsx
// import  { useState, useEffect } from 'react';
// import { ChakraProvider, Box, VStack, Heading, Text, Button, Input, Select } from '@chakra-ui/react';
// import Web3 from 'web3';
// import contractABI from './contractABI.json'; // We'll need to create this after compiling the contract

// function App() {
//   const [web3, setWeb3] = useState(null);
//   const [account, setAccount] = useState('');
//   const [contract, setContract] = useState(null);
//   const [userRole, setUserRole] = useState('');
//   const [products, setProducts] = useState([]);
  
//   const contractAddress = '0x0D3fb8a084Eb06DD964397F1894901f214Ee1507'; // You'll get this after deploying
  
//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         const web3Instance = new Web3(window.ethereum);
//         try {
//           await window.ethereum.enable();
//           const accounts = await web3Instance.eth.getAccounts();
//           const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          
//           setWeb3(web3Instance);
//           setAccount(accounts[0]);
//           setContract(contractInstance);
          
//           // Load user role
//           const role = await contractInstance.methods.userRoles(accounts[0]).call();
//           setUserRole(role);
          
//           // Load products
//           loadProducts(contractInstance);
//         } catch (error) {
//           console.error("User denied account access");
//         }
//       }
//     };
    
//     initWeb3();
//   }, []);
  
//   const loadProducts = async (contractInstance) => {
//     const productCount = await contractInstance.methods.productCount().call();
//     const loadedProducts = [];
    
//     for (let i = 1; i <= productCount; i++) {
//       const product = await contractInstance.methods.getProduct(i).call();
//       loadedProducts.push(product);
//     }
    
//     setProducts(loadedProducts);
//   };
  
//   const createProduct = async (name, price) => {
//     try {
//       await contract.methods.createProduct(name, price)
//         .send({ from: account });
//       loadProducts(contract);
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   };
  
//   const handleStateChange = async (productId, action) => {
//     try {
//       switch(action) {
//         case 'collect':
//           await contract.methods.collectProduct(productId).send({ from: account });
//           break;
//         case 'transport':
//           await contract.methods.transportProduct(productId).send({ from: account });
//           break;
//         case 'distribute':
//           await contract.methods.distributeProduct(productId).send({ from: account });
//           break;
//         case 'retail':
//           await contract.methods.sendToRetailer(productId).send({ from: account });
//           break;
//         case 'purchase':
//           await contract.methods.purchaseProduct(productId).send({ from: account });
//           break;
//       }
//       loadProducts(contract);
//     } catch (error) {
//       console.error("Error changing product state:", error);
//     }
//   };
  
//   return (
//     // <ChakraProvider>
//     //   <Box p={8}>
//     //     <VStack spacing={6} align="stretch">
//     //       <Heading>Agricultural Supply Chain</Heading>
//     //       <Text>Connected Account: {account}</Text>
//     //       <Text>Role: {userRole || 'Not registered'}</Text>
          
//     //       {userRole === 'FARMER' && (
//     //         <Box>
//     //           <Heading size="md">Create New Product</Heading>
//     //           <Input placeholder="Product Name" id="productName" />
//     //           <Input placeholder="Price" id="productPrice" type="number" />
//     //           <Button onClick={() => createProduct(
//     //             document.getElementById('productName').value,
//     //             document.getElementById('productPrice').value
//     //           )}>
//     //             Create Product
//     //           </Button>
//     //         </Box>
//     //       )}
          
//     //       <Box p={8}>
//     //          <VStack spacing={6} align="stretch">
//     //         <Heading size="md">Products</Heading>
//     //         {products.map((product) => (
//     //           <Box key={product.id} p={4} border="1px" borderColor="gray.200" mt={2}>
//     //             <Text>Name: {product.name}</Text>
//     //             <Text>Price: {product.price}</Text>
//     //             <Text>State: {ProductState[product.state]}</Text>
                
//     //             {userRole === 'COLLECTOR' && product.state === '0' && (
//     //               <Button onClick={() => handleStateChange(product.id, 'collect')}>
//     //                 Collect
//     //               </Button>
//     //             )}
                
//     //             {userRole === 'TRANSPORTER' && product.state === '1' && (
//     //               <Button onClick={() => handleStateChange(product.id, 'transport')}>
//     //                 Transport
//     //               </Button>
//     //             )}
                
//     //             {userRole === 'DISTRIBUTOR' && product.state === '2' && (
//     //               <Button onClick={() => handleStateChange(product.id, 'distribute')}>
//     //                 Distribute
//     //               </Button>
//     //             )}
                
//     //             {userRole === 'RETAILER' && product.state === '3' && (
//     //               <Button onClick={() => handleStateChange(product.id, 'retail')}>
//     //                 Receive
//     //               </Button>
//     //             )}
                
//     //             {product.state === '4' && (
//     //               <Button onClick={() => handleStateChange(product.id, 'purchase')}>
//     //                 Purchase
//     //               </Button>
//     //             )}
//     //           </Box>
//     //         ))}
//     //         </VStack>
//     //       </Box>
//     //     </VStack>
//     //   </Box>
//     // </ChakraProvider>
//   <div> hello</div>
  
//   );
// }

// export default App;