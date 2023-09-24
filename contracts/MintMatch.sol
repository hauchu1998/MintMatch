// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ERC721{
    function transferFrom(address from, address to, uint256 tokenId) public{}
}


contract MintMatch{

    ERC721 public erc721;

    function transfer(address payable seller, address token, uint256 tokenID, uint256 price) public payable{
        require(msg.value >= price, "should have effcient amount");
        erc721 = ERC721(token);
        erc721.transferFrom(seller, msg.sender, tokenID);
        seller.transfer(msg.value);
    }



}
