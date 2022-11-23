//SPDX-License-Identifier:MIT
pragma solidity 0.8.6;

contract structure {
    struct Book {
        string title;
        string author;
        uint bookID;
        uint price;
    }
    // define a struct- name of the struct variable to represent the struct
    Book book;

    function setBookSorage(
        string memory title,
        string memory author,
        uint bookId,
        uint price
    ) public returns (uint) {
        book = Book(title, author, bookId, price);
        return book.price;
    }

    function setBookMemory(
        string memory title,
        string memory author,
        uint bookId,
        uint price
    ) public pure returns (uint) {
        Book memory memoryBook = Book(title, author, bookId, price);
        return memoryBook.price;
    }

    function setBookCallData(
        string calldata title,
        string calldata author,
        uint bookId,
        uint price
    ) public pure returns (uint) {
        Book memory memoryBook = Book(title, author, bookId, price);
        return memoryBook.price;
    }

    function getBookId() public view returns (uint) {
        return book.bookID;
    }
}
