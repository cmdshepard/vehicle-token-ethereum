# International Vehicle Tokens
A primitive supply chain solution for automotive vehicles on the [Ethereum blockchain](https://ethereum.org/).

## Context
The automotive supply chain is one of the most complex supply chain systems on the planet. On average a vehicle is composed of about 30,000 different parts. These parts are manufactured by many different companies. Each of the parts use source raw materials from many different sources.

Manufacturers typically source components from Tier 1 suppliers who purchase components from Tier 2 suppliers and package it into automotive-grade systems. Tier 2 suppliers source their raw materials from Tier 3 suppliers.Once manufactured, vehicle manufacturers sell their products to consumers via dealerships. These dealerships are mostly independent from the OEM manufacturer with a few exceptions.

Vehicles are then often sold from consumers to other consumers, and sometimes back to the dealership, then sold back to a consumer.

For the purposes of this project, the solution will focus on tracking vehicles starting from the OEM (original equipment manufacturer).

## Advantages
Recording vehicle ownership on a blockchain has the following advantages:

* Open access to ownership data means that vehicles are easier to track by the OEM, dealerships, & consumers
* Vehicle transactions can occur without the need of a middleman (like the DMV)
* Easier international transfer of vehicle ownership
* Valuable information for OEMs and dealerships regarding the lifecycle of their vehicles

## Rinkeby Deployment
The application is deployed on the [Rinkeby test netowrk](https://www.rinkeby.io).

* Contract Address: [0xcd33A42A23650E737D21B119E90DB8bbFa1DC48E](https://rinkeby.etherscan.io/address/0xcd33a42a23650e737d21b119e90db8bbfa1dc48e)
* Rinkeby App Frontend: [https://maz.ninja/international-vehicle-tokens](https://maz.ninja/international-vehicle-tokens)

## Implementation
In this implementation, the lifecycle of the vehicle begins at the manufacturer.

Registered manufacturers can mint an ERC-721 non-fungible token that is tied to the Vehicle Identification Number (VIN) that they produce.

Since the system follows the [ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721), the tokens (or digital deed for a vehicle), can be transferred to any appropriate owner.

Dealerships are given a special role in the system so that manufacturers can track dealership transfer and ownership as a seperate entity.

Dealerships are then free to transfer (or sell) the digital token to any consumer or to another dealership, and even back to the manufacturer.

## Development System Requirements
* Node v10.13+
* Yarn (latest version)
* Truffle ^5.1.24
* Solidity ^0.6.0
* Web3.js v1.2.1
