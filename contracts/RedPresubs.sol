pragma solidity ^0.5.0;

import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";


  contract RedPresubs is Crowdsale, AllowanceCrowdsale {
    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token,
        address tokenWallet  // <- new argument
    )
        AllowanceCrowdsale(tokenWallet)  // <- used here
        Crowdsale(rate, wallet, token)
        public
    
{
    
}

 /**
     * @dev Overrides parent behavior by updating rate based on weiAmount sent in.
     */


 function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
      super._getTokenAmount(weiAmount);
      uint256 rate = 400000;
      if (weiAmount < 13*10**18) {
        rate = 66667; 
      } else if(weiAmount < 24*10**18) {
        rate = 100000;
      }
     
      return weiAmount.mul(rate);
    }
    

     
}


