pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Manufacturers.sol";
import "./Dealerships.sol";

contract Vehicles is ERC721, Manufacturers, Dealerships {

  struct Vehicle {
    uint256 tokenId;
    string vin;
    string make;
    string model;
    uint year;
  }

  // Mapping from token ID to vehicle information
  mapping (uint256 => Vehicle) private _vehiclesByToken;

  // Mapping from VIN to token ID
  mapping (string => uint256) private _tokenIdByVin;

  uint256 public lastId = 0;

  event VehicleManufactured(uint256 indexed token, string indexed vin);

  constructor() ERC721("International Vehicle Token", "IVT") public {}

  function manufactureVehicle(string memory vin, string memory make, string memory model, uint year) only(OEM) public returns (uint256) {
    require(_tokenIdByVin[vin] == 0, "This VIN has already been manufactured");

    uint256 tokenId = lastId + 1;
    Vehicle memory newVehicle = Vehicle(tokenId, vin, make, model, year);

    _safeMint(msg.sender, tokenId);
    _vehiclesByToken[tokenId] = newVehicle;
    _tokenIdByVin[vin] = tokenId;

    lastId++;

    emit VehicleManufactured(tokenId, vin);
    return tokenId;
  }

  function getVehicleByTokenId(uint256 tokenId) public view returns (bool isOEM, bool isDealership, string memory vin, string memory make, string memory model, uint year) {
    Vehicle memory result = _vehiclesByToken[tokenId];
    require(result.year > 0, "Vehicle does not exist");

    address vehicleOwnerAddress = ownerOf(tokenId);

    isOEM = hasRole(OEM, vehicleOwnerAddress);
    isDealership = hasRole(DEALERSHIP, vehicleOwnerAddress);
    vin = result.vin;
    make = result.make;
    model = result.model;
    year = result.year;
  }

  function getVehicleByVIN(string memory vin) public view returns (bool isOEM, bool isDealership, uint256 tokenId, string memory make, string memory model, uint year, address owner) {
    tokenId = _tokenIdByVin[vin];
    require(tokenId != 0, "Vehicle does not exist");
    (isOEM , isDealership, vin, make, model, year) = getVehicleByTokenId(tokenId);
    owner = ownerOf(tokenId);
  }

  function getRoles(address account) public view returns (bool isOEM, bool isDealership) {
    isOEM = hasRole(OEM, account);
    isDealership = hasRole(DEALERSHIP, account);
  }

  function transferVehicle(string memory vin, address from, address to) public {
    uint256 tokenId = _tokenIdByVin[vin];
    require(tokenId != 0, "Vehicle does not exist");

    transferFrom(from, to, tokenId);
  }

}
