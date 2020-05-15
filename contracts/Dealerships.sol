pragma solidity ^0.6.0;

import "./SupplyChainAccessControl.sol";

contract Dealerships is SupplyChainAccessControl {

    struct Dealership {
        address id;
        bytes name;
    }

    // Mapping from wallet address to dealership
    mapping (address => Dealership) private _dealerships;

    uint256 public numberOfDealerships;

    event DealershipAdded(address indexed id, bytes indexed name);

    function getDealership(address id) public view returns (string memory) {
        bytes memory result = _dealerships[id].name;
        require(result.length > 0, "Dealership does not exist");
        return string(result);
    }

    function addDealership(string memory name) public {
        bytes memory bytesName = bytes(name);
        bytes memory existingDealershipName = _dealerships[msg.sender].name;

        require(existingDealershipName.length < 1, "Already registered as dealership");
        _dealerships[msg.sender] = Dealership(msg.sender, bytesName);

        _setupRole(DEALERSHIP, msg.sender);
        emit DealershipAdded(msg.sender, bytesName);
        numberOfDealerships++;
    }

}
