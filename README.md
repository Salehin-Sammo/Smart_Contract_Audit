# Smart Contract Audit System

A web platform for **auditing Solidity smart contracts** with static analysis, built as a cybersecurity project at Swinburne University of Technology.

## Overview

Upload a Solidity contract and receive a structured security audit. The system runs the **[Slither](https://github.com/crytic/slither)** static-analysis engine over submitted contracts, detects common vulnerability patterns, and persists audit reports to a relational database for later review.

## Features

- Solidity smart-contract auditing via the **Slither** analysis tool
- React frontend for contract submission and report viewing
- Node.js / API backend with server-side audit logic
- Audit reports stored in a relational database
- Sample contract (`ActivityPool.sol`) included for testing

## Structure

| Path | Description |
|---|---|
| `client/` | React frontend |
| `server/` | Backend API and Slither integration |
| `Testing .sol Files/` | Sample Solidity contracts for audit testing |
| `Screenshot Website/` | UI screenshots |

## Stack

`Solidity` · `Slither` · `React.js` · `Node.js` · `Express` · `SQL`
