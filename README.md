# Memory Allocation Algorithms

This project implements various **Memory Allocation Algorithms** in Operating Systems. Memory allocation is a critical part of memory management in an OS. This project demonstrates the working of four key algorithms used for memory allocation:

- **First Fit**
- **Next Fit**
- **Worst Fit**
- **Best Fit**

Additionally, the project handles both types of partitioning:

- **Fixed Size Partitions**
- **Variable Size Partitions**

## Algorithms Implemented

### 1. **First Fit**
The **First Fit** algorithm searches for the first available memory block that is large enough to accommodate the process. It allocates the process to the first free partition that is large enough.

### 2. **Next Fit**
The **Next Fit** algorithm is similar to First Fit, but instead of starting the search for free memory blocks from the beginning each time, it continues searching from where it left off after the last allocation.

### 3. **Worst Fit**
The **Worst Fit** algorithm allocates the process to the largest available memory block. This method tries to keep large gaps of free memory that can be utilized for future allocations.

### 4. **Best Fit**
The **Best Fit** algorithm allocates the process to the smallest available memory block that is large enough to fit the process. This method tries to minimize the unused space in the memory blocks.

## Partitioning Types

### 1. **Fixed Size Partitions**
In **Fixed Size Partitions**, memory is divided into partitions of fixed size. The OS will allocate each process to one of these partitions, with the process size being smaller than or equal to the partition size.

### 2. **Variable Size Partitions**
In **Variable Size Partitions**, memory partitions can be of any size, and the process will be allocated to a partition that is just large enough for its size, minimizing waste.

## Features

- **Fixed Size Partitions** and **Variable Size Partitions** are supported.
- Implementations of **First Fit**, **Next Fit**, **Worst Fit**, and **Best Fit** memory allocation algorithms.
- Calculation of **internal fragmentation** and **external fragmentation** for each algorithm.
- Command-line interface (CLI) to run the program and test different memory allocation strategies.

## Technologies Used

- **Programming Language**: HTML,CSS,JavaScript
- **Algorithms**: First Fit, Next Fit, Worst Fit, Best Fit
- **Concepts**: Memory Management, Fragmentation

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **JavaScript** (e.g., GCC, Clang)
- **Make** (optional, for building the project)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/memory-allocation-algorithms.git
   cd memory-allocation-algorithms
