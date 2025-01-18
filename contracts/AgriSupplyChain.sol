//SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract AgriSupplyChain {
// enum ProductState { Created, CollectedByCollector, WithTransporter, WithDistributor, WithRetailer, Sold }
    
//     struct Product {
//         uint256 id;
//         string name;
//         uint256 price;
//         address farmer;
//         address collector;
//         address transporter;
//         address distributor;
//         address retailer;
//         address consumer;
//         ProductState state;
//         bool isValid;
//     }
    
//     mapping(uint256 => Product) public products;
//     uint256 public productCount;
    
//     mapping(address => string) public userRoles;
    
//     event ProductCreated(uint256 productId, string name, uint256 price, address farmer);
//     event ProductStateChanged(uint256 productId, ProductState newState);
    
//     // Modified constructor
//     constructor() {
//     productCount = 0;
//     userRoles[msg.sender] = "ADMIN";
//     assert(bytes(userRoles[msg.sender]).length > 0); // Debug assertion
// }

    
//     function registerUser(address _user, string memory _role) public {
//         // Allow only admin or empty role to register
//         require(
//             keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("ADMIN")) || 
//             bytes(userRoles[_user]).length == 0,
//             "Unauthorized or user already registered"
//         );
//         userRoles[_user] = _role;
//     }
    
//     function createProduct(string memory _name, uint256 _price) public {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("FARMER")), "Only farmers can create products");
        
//         productCount++;
//         products[productCount] = Product(
//             productCount,
//             _name,
//             _price,
//             msg.sender,
//             address(0),
//             address(0),
//             address(0),
//             address(0),
//             address(0),
//             ProductState.Created,
//             true
//         );
        
//         emit ProductCreated(productCount, _name, _price, msg.sender);
//     }
    
//     function collectProduct(uint256 _productId) public {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("COLLECTOR")), "Only collectors can collect products");
//         require(products[_productId].isValid, "Product does not exist");
//         require(products[_productId].state == ProductState.Created, "Product not in correct state");
        
//         products[_productId].collector = msg.sender;
//         products[_productId].state = ProductState.CollectedByCollector;
        
//         emit ProductStateChanged(_productId, ProductState.CollectedByCollector);
//     }
    
//     function transportProduct(uint256 _productId) public {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("TRANSPORTER")), "Only transporters can transport products");
//         require(products[_productId].state == ProductState.CollectedByCollector, "Product not in correct state");
        
//         products[_productId].transporter = msg.sender;
//         products[_productId].state = ProductState.WithTransporter;
        
//         emit ProductStateChanged(_productId, ProductState.WithTransporter);
//     }
    
//     function distributeProduct(uint256 _productId) public {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("DISTRIBUTOR")), "Only distributors can receive products");
//         require(products[_productId].state == ProductState.WithTransporter, "Product not in correct state");
        
//         products[_productId].distributor = msg.sender;
//         products[_productId].state = ProductState.WithDistributor;
        
//         emit ProductStateChanged(_productId, ProductState.WithDistributor);
//     }
    
//     function sendToRetailer(uint256 _productId) public {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("RETAILER")), "Only retailers can receive products");
//         require(products[_productId].state == ProductState.WithDistributor, "Product not in correct state");
        
//         products[_productId].retailer = msg.sender;
//         products[_productId].state = ProductState.WithRetailer;
        
//         emit ProductStateChanged(_productId, ProductState.WithRetailer);
//     }
    
//     function purchaseProduct(uint256 _productId) public {
//         require(products[_productId].state == ProductState.WithRetailer, "Product not available for purchase");
//         require(products[_productId].isValid, "Product does not exist");
        
//         products[_productId].consumer = msg.sender;
//         products[_productId].state = ProductState.Sold;
        
//         emit ProductStateChanged(_productId, ProductState.Sold);
//     }
    
//     function getProduct(uint256 _productId) public view returns (
//         uint256 id,
//         string memory name,
//         uint256 price,
//         address farmer,
//         address collector,
//         address transporter,
//         address distributor,
//         address retailer,
//         address consumer,
//         ProductState state
//     ) {
//         Product memory product = products[_productId];
//         return (
//             product.id,
//             product.name,
//             product.price,
//             product.farmer,
//             product.collector,
//             product.transporter,
//             product.distributor,
//             product.retailer,
//             product.consumer,
//             product.state
//         );
//     }
// }









// pragma solidity ^0.8.0;

// contract AgriSupplyChain {
//     enum ProductState { Created, CollectedByCollector, WithTransporter, WithDistributor, WithRetailer, Sold }
    
//     struct Product {
//         uint256 id;
//         string name;
//         uint256 price;
//         address payable farmer;
//         address payable collector;
//         address payable transporter;
//         address payable distributor;
//         address payable retailer;
//         address consumer;
//         ProductState state;
//         bool isValid;
//         uint256 transporterFee;
//         uint256 distributorFee;
//         uint256 retailerFee;
//     }
    
//     mapping(uint256 => Product) public products;
//     uint256 public productCount;
//     mapping(address => string) public userRoles;
    
//     event ProductCreated(uint256 productId, string name, uint256 price, address farmer);
//     event ProductStateChanged(uint256 productId, ProductState newState);
//     event PaymentMade(uint256 productId, address from, address to, uint256 amount);
    
//     constructor() {
//         productCount = 0;
//         userRoles[msg.sender] = "ADMIN";
//     }
    
//     // Split the getProduct function into multiple smaller functions
//     function getProductBasics(uint256 _productId) public view returns (
//         uint256 id,
//         string memory name,
//         uint256 price,
//         ProductState state
//     ) {
//         Product storage product = products[_productId];
//         return (product.id, product.name, product.price, product.state);
//     }

//     function getProductParticipants(uint256 _productId) public view returns (
//         address farmer,
//         address collector,
//         address transporter,
//         address distributor,
//         address retailer
//     ) {
//         Product storage product = products[_productId];
//         return (
//             product.farmer,
//             product.collector,
//             product.transporter,
//             product.distributor,
//             product.retailer
//         );
//     }

//     function getProductFees(uint256 _productId) public view returns (
//         uint256 transporterFee,
//         uint256 distributorFee,
//         uint256 retailerFee
//     ) {
//         Product storage product = products[_productId];
//         return (
//             product.transporterFee,
//             product.distributorFee,
//             product.retailerFee
//         );
//     }

//     function getProductStatus(uint256 _productId) public view returns (
//         bool isValid,
//         address consumer,
//         ProductState state
//     ) {
//         Product storage product = products[_productId];
//         return (
//             product.isValid,
//             product.consumer,
//             product.state
//         );
//     }
    
//     function registerUser(address _user, string memory _role) public {
//         require(
//             keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("ADMIN")) || 
//             bytes(userRoles[_user]).length == 0,
//             "Unauthorized or user already registered"
//         );
//         userRoles[_user] = _role;
//     }
    
//     function createProduct(
//         string memory _name, 
//         uint256 _price,
//         uint256 _transporterFee,
//         uint256 _distributorFee,
//         uint256 _retailerFee
//     ) public {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("FARMER")), "Only farmers can create products");
        
//         productCount++;
//         products[productCount] = Product(
//             productCount,
//             _name,
//             _price,
//             payable(msg.sender),
//             payable(address(0)),
//             payable(address(0)),
//             payable(address(0)),
//             payable(address(0)),
//             address(0),
//             ProductState.Created,
//             true,
//             _transporterFee,
//             _distributorFee,
//             _retailerFee
//         );
        
//         emit ProductCreated(productCount, _name, _price, msg.sender);
//     }
    
//     function collectProduct(uint256 _productId) public payable {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("COLLECTOR")), "Only collectors can collect products");
//         require(products[_productId].isValid, "Product does not exist");
//         require(products[_productId].state == ProductState.Created, "Product not in correct state");
//         require(msg.value == products[_productId].price, "Incorrect payment amount");
        
//         Product storage product = products[_productId];
//         product.collector = payable(msg.sender);
//         product.state = ProductState.CollectedByCollector;
        
//         product.farmer.transfer(msg.value);
        
//         emit PaymentMade(_productId, msg.sender, product.farmer, msg.value);
//         emit ProductStateChanged(_productId, ProductState.CollectedByCollector);
//     }
    
//     function transportProduct(uint256 _productId) public payable {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("TRANSPORTER")), "Only transporters can transport products");
//         require(products[_productId].state == ProductState.CollectedByCollector, "Product not in correct state");
//         require(msg.value == products[_productId].transporterFee, "Incorrect transporter fee");
        
//         Product storage product = products[_productId];
//         product.transporter = payable(msg.sender);
//         product.state = ProductState.WithTransporter;
        
//         product.collector.transfer(msg.value);
        
//         emit PaymentMade(_productId, msg.sender, product.collector, msg.value);
//         emit ProductStateChanged(_productId, ProductState.WithTransporter);
//     }
    
//     function distributeProduct(uint256 _productId) public payable {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("DISTRIBUTOR")), "Only distributors can receive products");
//         require(products[_productId].state == ProductState.WithTransporter, "Product not in correct state");
//         require(msg.value == products[_productId].distributorFee, "Incorrect distributor fee");
        
//         Product storage product = products[_productId];
//         product.distributor = payable(msg.sender);
//         product.state = ProductState.WithDistributor;
        
//         product.transporter.transfer(msg.value);
        
//         emit PaymentMade(_productId, msg.sender, product.transporter, msg.value);
//         emit ProductStateChanged(_productId, ProductState.WithDistributor);
//     }
    
//     function sendToRetailer(uint256 _productId) public payable {
//         require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
//         require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("RETAILER")), "Only retailers can receive products");
//         require(products[_productId].state == ProductState.WithDistributor, "Product not in correct state");
//         require(msg.value == products[_productId].retailerFee, "Incorrect retailer fee");
        
//         Product storage product = products[_productId];
//         product.retailer = payable(msg.sender);
//         product.state = ProductState.WithRetailer;
        
//         product.distributor.transfer(msg.value);
        
//         emit PaymentMade(_productId, msg.sender, product.distributor, msg.value);
//         emit ProductStateChanged(_productId, ProductState.WithRetailer);
//     }
    
//     function purchaseProduct(uint256 _productId) public payable {
//         require(products[_productId].state == ProductState.WithRetailer, "Product not available for purchase");
//         require(products[_productId].isValid, "Product does not exist");
//         require(msg.value == products[_productId].price * 2, "Incorrect payment amount");
        
//         Product storage product = products[_productId];
//         product.consumer = msg.sender;
//         product.state = ProductState.Sold;
        
//         product.retailer.transfer(msg.value);
        
//         emit PaymentMade(_productId, msg.sender, product.retailer, msg.value);
//         emit ProductStateChanged(_productId, ProductState.Sold);
//     }
// }






pragma solidity ^0.8.0;

// In AgriSupplyChain.sol
import { IAgriSupplyChain } from "./IAgriSupplyChain.sol";
import { ProductStructs } from "./ProductStructs.sol";

contract AgriSupplyChain is IAgriSupplyChain {
    using ProductStructs for ProductStructs.Product;
    
    mapping(uint256 => ProductStructs.Product) public products;
    uint256 public productCount;
    mapping(address => string) public userRoles;
    
    uint8 constant CREATED = 0;
    uint8 constant COLLECTED = 1;
    uint8 constant IN_TRANSIT = 2;
    uint8 constant WITH_DISTRIBUTOR = 3;
    uint8 constant WITH_RETAILER = 4;
    uint8 constant SOLD = 5;
    
    constructor() {
        productCount = 0;
        userRoles[msg.sender] = "ADMIN";
    }
    
    function registerUser(address _user, string memory _role) public override {
        require(
            keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("ADMIN")) || 
            bytes(userRoles[_user]).length == 0,
            "Unauthorized or user already registered"
        );
        userRoles[_user] = _role;
    }
    
    function createProduct(string memory _name, uint256 _basePrice) public {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("FARMER")), "Only farmers can create products");
        
        productCount++;
        
        ProductStructs.ProductDetails memory details = ProductStructs.ProductDetails({
            name: _name,
            basePrice: _basePrice,
            isValid: true,
            isPaid: false
        });
        
        ProductStructs.ProductActors memory actors = ProductStructs.ProductActors({
            farmer: msg.sender,
            collector: address(0),
            transporter: address(0),
            distributor: address(0),
            retailer: address(0),
            consumer: address(0)
        });
        
        ProductStructs.ProductFees memory fees = ProductStructs.ProductFees({
            collectorFee: 0,
            transporterFee: 0,
            distributorFee: 0,
            retailerFee: 0
        });
        
        products[productCount] = ProductStructs.Product({
            id: productCount,
            details: details,
            actors: actors,
            fees: fees,
            state: CREATED
        });
        
        emit ProductCreated(productCount, _name, _basePrice, msg.sender);
    }
    
    function collectProduct(uint256 _productId, uint256 _collectorFee) public payable {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("COLLECTOR")), "Only collectors can collect products");
        require(products[_productId].details.isValid, "Product does not exist");
        require(products[_productId].state == CREATED, "Product not in correct state");
        require(msg.value >= products[_productId].details.basePrice, "Insufficient payment for farmer");
        
        payable(products[_productId].actors.farmer).transfer(products[_productId].details.basePrice);
        
        products[_productId].actors.collector = msg.sender;
        products[_productId].fees.collectorFee = _collectorFee;
        products[_productId].state = COLLECTED;
        products[_productId].details.isPaid = false;
        
        emit PaymentProcessed(msg.sender, products[_productId].actors.farmer, products[_productId].details.basePrice);
        emit FeeAdded(_productId, msg.sender, _collectorFee);
        emit ProductStateChanged(_productId, COLLECTED);
    }

    function transportProduct(uint256 _productId, uint256 _transporterFee) public payable {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("TRANSPORTER")), "Only transporters can transport products");
        require(products[_productId].state == COLLECTED, "Product not in correct state");
        require(msg.value >= products[_productId].fees.collectorFee, "Insufficient payment for collector");
        
        payable(products[_productId].actors.collector).transfer(products[_productId].fees.collectorFee);
        
        products[_productId].actors.transporter = msg.sender;
        products[_productId].fees.transporterFee = _transporterFee;
        products[_productId].state = IN_TRANSIT;
        products[_productId].details.isPaid = false;
        
        emit PaymentProcessed(msg.sender, products[_productId].actors.collector, products[_productId].fees.collectorFee);
        emit FeeAdded(_productId, msg.sender, _transporterFee);
        emit ProductStateChanged(_productId, IN_TRANSIT);
    }

    function distributeProduct(uint256 _productId, uint256 _distributorFee) public payable {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("DISTRIBUTOR")), "Only distributors can receive products");
        require(products[_productId].state == IN_TRANSIT, "Product not in correct state");
        require(msg.value >= products[_productId].fees.transporterFee, "Insufficient payment for transporter");
        
        payable(products[_productId].actors.transporter).transfer(products[_productId].fees.transporterFee);
        
        products[_productId].actors.distributor = msg.sender;
        products[_productId].fees.distributorFee = _distributorFee;
        products[_productId].state = WITH_DISTRIBUTOR;
        products[_productId].details.isPaid = false;
        
        emit PaymentProcessed(msg.sender, products[_productId].actors.transporter, products[_productId].fees.transporterFee);
        emit FeeAdded(_productId, msg.sender, _distributorFee);
        emit ProductStateChanged(_productId, WITH_DISTRIBUTOR);
    }

    function sendToRetailer(uint256 _productId, uint256 _retailerFee) public payable {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("RETAILER")), "Only retailers can receive products");
        require(products[_productId].state == WITH_DISTRIBUTOR, "Product not in correct state");
        require(msg.value >= products[_productId].fees.distributorFee, "Insufficient payment for distributor");
        
        payable(products[_productId].actors.distributor).transfer(products[_productId].fees.distributorFee);
        
        products[_productId].actors.retailer = msg.sender;
        products[_productId].fees.retailerFee = _retailerFee;
        products[_productId].state = WITH_RETAILER;
        products[_productId].details.isPaid = false;
        
        emit PaymentProcessed(msg.sender, products[_productId].actors.distributor, products[_productId].fees.distributorFee);
        emit FeeAdded(_productId, msg.sender, _retailerFee);
        emit ProductStateChanged(_productId, WITH_RETAILER);
    }

    function purchaseProduct(uint256 _productId) public payable {
        require(products[_productId].details.isValid, "Product does not exist");
        require(products[_productId].state == WITH_RETAILER, "Product not available for purchase");
        require(msg.value >= products[_productId].fees.retailerFee, "Insufficient payment for retailer");
        
        payable(products[_productId].actors.retailer).transfer(products[_productId].fees.retailerFee);
        
        products[_productId].actors.consumer = msg.sender;
        products[_productId].state = SOLD;
        products[_productId].details.isPaid = true;
        
        emit PaymentProcessed(msg.sender, products[_productId].actors.retailer, products[_productId].fees.retailerFee);
        emit ProductStateChanged(_productId, SOLD);
    }
    
    function getProductBasicInfo(uint256 _productId) public view override returns (
        uint256 id,
        string memory name,
        uint256 basePrice,
        uint8 state,
        bool isValid
    ) {
        ProductStructs.Product storage product = products[_productId];
        return (
            product.id,
            product.details.name,
            product.details.basePrice,
            product.state,
            product.details.isValid
        );
    }
    
    function getProductFees(uint256 _productId) public view override returns (
        uint256 collectorFee,
        uint256 transporterFee,
        uint256 distributorFee,
        uint256 retailerFee
    ) {
        ProductStructs.ProductFees storage fees = products[_productId].fees;
        return (
            fees.collectorFee,
            fees.transporterFee,
            fees.distributorFee,
            fees.retailerFee
        );
    }
    
    function getProductActors(uint256 _productId) public view override returns (
        address farmer,
        address collector,
        address transporter,
        address distributor,
        address retailer,
        address consumer
    ) {
        ProductStructs.ProductActors storage actors = products[_productId].actors;
        return (
            actors.farmer,
            actors.collector,
            actors.transporter,
            actors.distributor,
            actors.retailer,
            actors.consumer
        );
    }
    
    function getTotalPrice(uint256 _productId) public view returns (uint256) {
        ProductStructs.Product storage product = products[_productId];
        return product.details.basePrice +
               product.fees.collectorFee +
               product.fees.transporterFee +
               product.fees.distributorFee +
               product.fees.retailerFee;
    }
}