pragma solidity ^0.5.0;

contract GuiaDoMochileiroDasGalaxias {
    string public appName;
    uint public tipCount = 0;
    mapping(uint => Tip) public tips;

    struct Tip {
        uint id;
        string author;
        string description;
        address owner;
    }

    event TipCreated(
        uint id,
        string author,
        string description,
        address owner
    );

    constructor() public {
        appName = "Dapp - O Guia Do Mochileiro Das Galaxias";
    }

    function createTip(string memory _author, string memory _description) public {
        // Require a valid author name
        require(bytes(_author).length > 0);
        // Require a valid description
        require(bytes(_description).length > 0);
        // Increment tips count
        tipCount ++;
        // Create the tip
        tips[tipCount] = Tip(tipCount, _author, _description, msg.sender);
        // Trigger an event
        emit TipCreated(tipCount, _author, _description, msg.sender);
    }
}
