pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChainAccessControl is AccessControl {

    modifier only(bytes32 role) {
        require(hasRole(role, msg.sender), "Caller is not authorized due to role");
        _;
    }

    bytes32 public constant OEM = keccak256("OEM");

    bytes32 public constant DEALERSHIP = keccak256("DEALERSHIP_ROLE");

}
