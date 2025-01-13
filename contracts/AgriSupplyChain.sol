// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriSupplyChain {
enum ProductState { Created, CollectedByCollector, WithTransporter, WithDistributor, WithRetailer, Sold }
    
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address farmer;
        address collector;
        address transporter;
        address distributor;
        address retailer;
        address consumer;
        ProductState state;
        bool isValid;
    }
    
    mapping(uint256 => Product) public products;
    uint256 public productCount;
    
    mapping(address => string) public userRoles;
    
    event ProductCreated(uint256 productId, string name, uint256 price, address farmer);
    event ProductStateChanged(uint256 productId, ProductState newState);
    
    // Modified constructor
    constructor() {
    productCount = 0;
    userRoles[msg.sender] = "ADMIN";
    assert(bytes(userRoles[msg.sender]).length > 0); // Debug assertion
}

    
    function registerUser(address _user, string memory _role) public {
        // Allow only admin or empty role to register
        require(
            keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("ADMIN")) || 
            bytes(userRoles[_user]).length == 0,
            "Unauthorized or user already registered"
        );
        userRoles[_user] = _role;
    }
    
    function createProduct(string memory _name, uint256 _price) public {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("FARMER")), "Only farmers can create products");
        
        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            address(0),
            address(0),
            address(0),
            address(0),
            address(0),
            ProductState.Created,
            true
        );
        
        emit ProductCreated(productCount, _name, _price, msg.sender);
    }
    
    function collectProduct(uint256 _productId) public {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("COLLECTOR")), "Only collectors can collect products");
        require(products[_productId].isValid, "Product does not exist");
        require(products[_productId].state == ProductState.Created, "Product not in correct state");
        
        products[_productId].collector = msg.sender;
        products[_productId].state = ProductState.CollectedByCollector;
        
        emit ProductStateChanged(_productId, ProductState.CollectedByCollector);
    }
    
    function transportProduct(uint256 _productId) public {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("TRANSPORTER")), "Only transporters can transport products");
        require(products[_productId].state == ProductState.CollectedByCollector, "Product not in correct state");
        
        products[_productId].transporter = msg.sender;
        products[_productId].state = ProductState.WithTransporter;
        
        emit ProductStateChanged(_productId, ProductState.WithTransporter);
    }
    
    function distributeProduct(uint256 _productId) public {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("DISTRIBUTOR")), "Only distributors can receive products");
        require(products[_productId].state == ProductState.WithTransporter, "Product not in correct state");
        
        products[_productId].distributor = msg.sender;
        products[_productId].state = ProductState.WithDistributor;
        
        emit ProductStateChanged(_productId, ProductState.WithDistributor);
    }
    
    function sendToRetailer(uint256 _productId) public {
        require(bytes(userRoles[msg.sender]).length > 0, "User not registered");
        require(keccak256(bytes(userRoles[msg.sender])) == keccak256(bytes("RETAILER")), "Only retailers can receive products");
        require(products[_productId].state == ProductState.WithDistributor, "Product not in correct state");
        
        products[_productId].retailer = msg.sender;
        products[_productId].state = ProductState.WithRetailer;
        
        emit ProductStateChanged(_productId, ProductState.WithRetailer);
    }
    
    function purchaseProduct(uint256 _productId) public {
        require(products[_productId].state == ProductState.WithRetailer, "Product not available for purchase");
        require(products[_productId].isValid, "Product does not exist");
        
        products[_productId].consumer = msg.sender;
        products[_productId].state = ProductState.Sold;
        
        emit ProductStateChanged(_productId, ProductState.Sold);
    }
    
    function getProduct(uint256 _productId) public view returns (
        uint256 id,
        string memory name,
        uint256 price,
        address farmer,
        address collector,
        address transporter,
        address distributor,
        address retailer,
        address consumer,
        ProductState state
    ) {
        Product memory product = products[_productId];
        return (
            product.id,
            product.name,
            product.price,
            product.farmer,
            product.collector,
            product.transporter,
            product.distributor,
            product.retailer,
            product.consumer,
            product.state
        );
    }
}