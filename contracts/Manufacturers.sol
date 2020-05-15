pragma solidity ^0.6.0;

import "./SupplyChainAccessControl.sol";

contract Manufacturers is SupplyChainAccessControl {

    struct Manufacturer {
        address id;
        bytes name;
    }

    // Mapping from wallet address to manufacturer
    mapping (address => Manufacturer) private _manufacturers;

    uint256 public numberOfManufacturers = 0;

    event ManufacturerAdded(address indexed id, bytes indexed name);

    function getManufacturer(address id) public view returns (string memory) {
        bytes memory result = _manufacturers[id].name;
        require(result.length > 0, "Manufacturer does not exist");
        return string(result);
    }

    function addManufacturer(string memory name) public {
        bytes memory bytesName = bytes(name);
        bytes memory existingManufacturerName = _manufacturers[msg.sender].name;

        require(existingManufacturerName.length < 1, "Already registered as manufacturer");
        _manufacturers[msg.sender] = Manufacturer(msg.sender, bytesName);

        _setupRole(OEM, msg.sender);
        emit ManufacturerAdded(msg.sender, bytesName);
        numberOfManufacturers++;
    }

}
