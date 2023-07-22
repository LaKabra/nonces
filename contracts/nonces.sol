// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.5;

contract testNonces {

    uint256 public nonces;

    function add() external {
        nonces++;
    }

    function View() external view returns (uint256) {
        return nonces;
    }
}