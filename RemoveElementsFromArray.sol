// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error Remove_Index_Out_Of_Array_Length(uint arrayLength, uint givenIndex);

contract RemoveElementsFromArray {
    uint[] dynArray;

    function addElementToArray(uint[] memory _arr) public {
        for (uint i = 0; i < _arr.length; i++) {
            dynArray.push(_arr[i]);
        }
    }

    function getDynArray() public view returns (uint[] memory) {
        return dynArray;
    }

    function RemoveElementsFromDynArray(uint index) public {
        if (index >= dynArray.length)
            revert Remove_Index_Out_Of_Array_Length(dynArray.length, index);
        // require(index < dynArray.length, "Array Index Out of Bound");

        for (uint i = index; i < dynArray.length - 1; i++) {
            dynArray[i] = dynArray[i + 1];
        }
        delete dynArray[dynArray.length - 1];
        dynArray.pop();
    }
}
