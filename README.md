# SecurePay 🔐💳

### Decentralized Payment Application using Solana & Web3

SecurePay is a **Web3-based decentralized payment application** that enables users to connect their Solana wallet, send SOL payments, receive payments through QR codes, verify transactions, and manage their payment activity through a modern web interface.

The project is built with **Next.js, React, Solana Web3.js, Solana Pay, Solana Wallet Adapter, and Tailwind CSS**, with the current payment workflow operating on **Solana Devnet**. The application focuses on demonstrating practical blockchain payment integration inside a modern web application.

---

## 🚀 Features

### 🔗 Wallet Connection

Users can connect a compatible Solana wallet and use their wallet's public address as their payment identity.

### 💸 Send SOL

Users can initiate a payment by providing:

* Payment amount
* Recipient wallet address
* Payment purpose

SecurePay creates a Solana transfer transaction and submits it through the connected wallet.

### 📱 QR-Based Payments

SecurePay supports QR-based payment requests using **Solana Pay**.

A payment QR code can contain:

* Recipient wallet address
* Payment amount
* Unique transaction reference
* Payment label
* Payment message

This allows another wallet application to scan and complete the payment.

### ✅ Payment Verification

The application uses a generated transaction reference to locate the corresponding transaction and validates the transfer before adding it to the application history.

### 📊 Transaction History

Users can view their payment activity, including:

* Sender
* Receiver
* Amount
* Transaction purpose
* Date
* Transaction status

### 🎨 Modern Payment Interface

The UI is divided into reusable React components for:

* Navigation
* User profile
* Payment creation
* Transaction list
* Transaction details
* QR payments
* Modals

---

# 🏗️ Architecture

                         ┌─────────────────────┐
                         │      User           │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Next.js        │
                         │   React Frontend    │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
                  ▼                                   ▼
        ┌─────────────────────┐            ┌─────────────────────┐
        │  Wallet Adapter     │            │    Solana Pay       │
        │ Wallet Connection   │            │ QR Payment Flow     │
        └──────────┬──────────┘            └──────────┬──────────┘
                   │                                  │
                   └────────────────┬─────────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │   Solana Web3.js    │
                         │ Transaction Logic   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Solana Devnet     │
                         │ Blockchain Network  │
                         └─────────────────────┘
```

---

# 🔄 Application Flow

## 1. Connect Wallet

```text
User
  ↓
Connect Solana Wallet
  ↓
Wallet Adapter
  ↓
Retrieve Public Key
  ↓
Application identifies user
```

The connected wallet's public key is used as the user's blockchain identity.

---

## 2. Send Payment

```text
Enter Amount
      ↓
Enter Recipient Address
      ↓
Enter Payment Purpose
      ↓
Create Transaction
      ↓
SystemProgram.transfer()
      ↓
Wallet Signs Transaction
      ↓
Submit to Solana
      ↓
Transaction Recorded
```

SecurePay creates a native SOL transfer using Solana's `SystemProgram.transfer`.

---

## 3. Receive Payment

```text
Generate Payment Request
          ↓
Create Solana Pay URL
          ↓
Generate QR Code
          ↓
User Scans QR
          ↓
Payment Submitted
          ↓
Reference Transaction Found
          ↓
Transfer Validated
          ↓
Payment Added to History
```

This provides a payment experience similar to QR-based payment systems while using Solana infrastructure.

---

# 🛠️ Technology Stack

| Technology                | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| **Next.js 12**            | Web application framework                            |
| **React 18**              | Frontend component architecture                      |
| **JavaScript**            | Application development                              |
| **Tailwind CSS**          | UI styling                                           |
| **Solana Web3.js**        | Blockchain interaction and transaction creation      |
| **Solana Pay**            | QR-based payment requests and transaction validation |
| **Solana Wallet Adapter** | Wallet connection and signing                        |
| **BigNumber.js**          | Accurate payment amount handling                     |
| **html5-qrcode**          | QR-related browser functionality                     |
| **TypeScript**            | Supporting xxNetwork integration module              |
| **xxNetwork**             | Additional network/RPC integration                   |

---

# 📁 Project Structure

```text
SecurePay/
│
├── components/
│   ├── header/
│   │   ├── Action.js
│   │   ├── Login.js
│   │   ├── NavMenu.js
│   │   ├── Profile.js
│   │   └── QRButton.js
│   │
│   ├── home/
│   │   └── SearchBar.js
│   │
│   ├── transaction/
│   │   ├── NewTransactionModal.js
│   │   ├── TransactionDetailModal.js
│   │   ├── TransactionItem.js
│   │   ├── TransactionQRModal.js
│   │   └── TransactionsList.js
│   │
│   ├── xxNetwork/
│   │   └── src/
│   │       └── Rpc/
│   │
│   └── Modal.js
│
├── context/
│   └── WalletConnectionProvider.js
│
├── functions/
│   └── getAvatarUrl.js
│
├── hooks/
│   └── cashapp.js
│
├── pages/
│   ├── _app.js
│   └── index.js
│
├── public/
│
├── styles/
│
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Core Components

## `hooks/cashapp.js`

This is one of the main business-logic layers of the application.

It handles:

* Wallet state
* Connected public key
* Transaction creation
* SOL amount handling
* Transaction history
* Local storage
* Sending transactions to Solana

The hook creates the transaction using:

```javascript
SystemProgram.transfer({
    fromPubkey: fromWallet,
    lamports: amount,
    toPubkey: toWallet
});
```

This keeps blockchain-related logic separate from the UI components.

---

## `TransactionQRModal.js`

Responsible for the QR payment workflow.

The component uses Solana Pay to:

1. Generate a unique reference.
2. Build a payment URL.
3. Generate a QR code.
4. Search for the reference on the blockchain.
5. Validate the transaction.
6. Add the payment to the transaction history.

---

## `NewTransactionModal.js`

Provides the payment form where users enter:

```text
Amount
Recipient
Payment Purpose
```

The component then passes the payment information to the transaction logic.

---

## `TransactionsList.js`

Displays the user's recorded payment activity through reusable transaction components.

---

# 🔐 Security Considerations

SecurePay is currently a **development and educational Web3 project** and should not be considered production-ready financial software.

Production deployment would require additional security controls such as:

* Strong server-side validation
* Backend transaction persistence
* Authentication and authorization
* Rate limiting
* Fraud detection
* Transaction replay protection
* Secure configuration management
* Detailed transaction auditing
* Automated security testing
* Monitoring and alerting
* Production-grade wallet/network configuration

Private keys are not handled directly by the application. Transaction signing is delegated to the connected wallet.

---

# 🌐 Network

SecurePay currently uses:

```text
Solana Devnet
```

Devnet is used for development and testing so that users can experiment with the payment workflow without using real SOL.

### Testing Requirements

For testing:

1. Install a compatible Solana wallet.
2. Switch the wallet to **Devnet**.
3. Obtain Devnet SOL.
4. Connect the wallet to SecurePay.
5. Create and test transactions.

> ⚠️ Never use real funds with an unverified development configuration.

---

# 💻 Installation

## Prerequisites

Make sure you have:

* Node.js installed
* npm installed
* A Solana-compatible wallet

---

## Clone Repository

```bash
git clone https://github.com/TheDineshJanghu/SecurePay.git
```

```bash
cd SecurePay
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# 📦 Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🧪 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm start`     | Start production server  |
| `npm run lint`  | Run linting              |

---

# 🧠 Technical Concepts Demonstrated

This project demonstrates practical knowledge of several modern software-development concepts:

### Frontend Development

* React component architecture
* React hooks
* State management
* Reusable components
* Modal-based workflows
* Responsive UI design

### Blockchain Development

* Solana wallet integration
* Solana public/private-key architecture
* Blockchain transactions
* SOL transfers
* Transaction references
* Transaction confirmation
* Transaction validation

### Web3 Development

* Wallet adapters
* Solana Pay
* QR payment workflows
* Wallet signing
* Blockchain RPC communication

### Application Architecture

* Separation of UI and business logic
* Custom React hooks
* Context providers
* Reusable component design
* Client-side persistence

---

# 🎯 Why SecurePay?

Traditional payment applications depend heavily on centralized payment processors.

SecurePay explores an alternative architecture where:

```text
User
  ↓
Crypto Wallet
  ↓
Blockchain Transaction
  ↓
Recipient
```

Instead of relying exclusively on a centralized payment processor, the payment can be executed directly on a blockchain network.

This project demonstrates how decentralized payment infrastructure can be combined with a familiar web-based payment experience.

---

# 🔮 Future Improvements

The project can be extended with:

### Backend

* Persistent database
* User accounts
* Transaction indexing
* Server-side validation
* Payment history synchronization

### Security

* Rate limiting
* Fraud detection
* Transaction monitoring
* Improved address validation
* Secure API architecture

### User Experience

* Pending / Confirmed / Failed transaction states
* Transaction explorer links
* Notifications
* Better QR scanning
* Payment receipts
* Improved mobile experience

### Infrastructure

* Production Solana cluster configuration
* CI/CD pipeline
* Automated testing
* Monitoring
* Analytics

---

# 📊 Current Limitations

The current implementation is primarily intended for development and demonstration.

Some limitations include:

* Transaction history is stored on the client side.
* The payment workflow currently targets Solana Devnet.
* Production-level authentication is not implemented.
* Backend persistence is not currently provided.
* Comprehensive automated test coverage should be added before production use.

---

# 👨‍💻 Team

SecurePay was developed by:

**Dinesh Janghu**
GitHub: [@TheDineshJanghu](https://github.com/TheDineshJanghu)

**Shivam Taneja**
GitHub: [@ShivamTaneja07](https://github.com/ShivamTaneja07)

**Harshita Sharma**
GitHub: [@HarshitaSharma08](https://github.com/HarshitaSharma08)

**Bhavya Munjal**
GitHub: [@bhaviii17](https://github.com/bhaviii17)

---

---

