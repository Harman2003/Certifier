// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Certification is Initializable{
  
  string public Org_Name;
  uint16 public Org_Id;
  string public Org_Email;
  address public Org_Address;
  address public OrgFactoryContract;
  bool public isContractExpired; 

  mapping (string => bytes32) private certificates;

  function initialize(string memory OrgName, string memory OrgEmail, uint16 OrgId, address OrgAddress) public initializer{
    Org_Name=OrgName;
    Org_Id= OrgId;
    Org_Address= OrgAddress;
    OrgFactoryContract= msg.sender;
    Org_Email= OrgEmail;
    isContractExpired=false;
  }

  function createCertificate(string memory cert_id, bytes32 hashedCertificate) public contractValid onlyOwner{
    require(certificates[cert_id]==bytes32(0), "This certificate id already exists");
    certificates[cert_id]= hashedCertificate;
  }

  function validateCertificate(string memory name, uint userID, string memory eventID, uint expiration, string memory grade, uint cert_id) public view contractValid returns(bool){

    require(certificates[cert_id]!=bytes32(0), "This certificate Id does not exist");

    //match certificate data hash
    bytes32 hash_prev = certificates[cert_id];
    bytes32 hash_new = keccak256(abi.encodePacked(name, expiration, grade, userID, eventID));
    return (hash_new==hash_prev);
  }

  function deleteContract() external {
    require(msg.sender==OrgFactoryContract, "Unauthorized to perform this operation");
    isContractExpired=true;
  }

   modifier onlyOwner() {
        require(Org_Address==msg.sender, "Not authorised to create a certificate");
        _;
    }

    modifier contractValid(){
        require(isContractExpired==false, "This contract is no longer available");
        _;
    }
}