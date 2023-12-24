// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Certification.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract OrgFactoryContract{
    struct Organisation {
        string name;
        string email;
        address account_address;
        address contract_address;
        bool isCreated;
    }

    mapping (uint16 => Organisation) organisations;
    address public immutable certificate;

    constructor(){
        certificate= address(new Certification());
    }

    function register(string memory name, string memory email, uint16 id) external returns(address){

        require(organisations[id].isCreated==false, "This Organisation Id is already in use");
        require(bytes(name).length!=0 && bytes(email).length!=0, "Invalid Organisation Details");

        //initialise a contract
        address payable clone= payable(Clones.clone(certificate));
        Certification newCertificate= Certification(clone);
        newCertificate.initialize(name, email, id, msg.sender);

        //save the org details
        organisations[id]= Organisation(name, email, msg.sender, clone, true);
        return clone;
    }

    function getOrgData(uint16 org_id) external view returns(string memory, string memory, address, address){
        Organisation memory org= organisations[org_id];
        return (org.name, org.email, org.account_address, org.contract_address);
    }

    function removeOrgData(uint16 org_id) external returns(bool isDeleted){
        Organisation memory org= organisations[org_id];
        require(org.isCreated && msg.sender==org.account_address, "You are not authorized to remove this Organisation");

        //Invalidate the Certification Contract
        Certification newCertificate= Certification(org.contract_address);
        newCertificate.deleteContract();

        delete organisations[org_id];
        isDeleted=true;
    }
}