# Burns Bounty App

A decentralized bounty platform with AI-mediated task agreements.

## Features

- Create and manage bounties
- AI-mediated agreements between employers and employees
- Smart contract integration for secure fund management
- Real-time chat for task discussions

## Prerequisites

- Bun runtime (latest version)
- Supabase account
- OpenAI API key
- Ethereum wallet and some test ETH (for local development)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/burns-bounty-app.git
   cd burns-bounty-app
   ```

2. Install dependencies:

   ```
   bun install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env.local` and fill in the required values:

   ```
   cp .env.example .env.local
   ```

4. Set up Supabase:
   - Create a new project in Supabase
   - Run the migration:

     ```
     bun run migrate
     ```

5. Deploy the smart contract (for local development):
   - Set up a local Ethereum network (e.g., Hardhat)
   - Deploy the contract and update the `CONTRACT_ADDRESS` in your `.env.local`

6. Start the development server:

   ```
   bun run dev
   ```

## Usage

1. Connect your Ethereum wallet
2. Create a bounty or browse existing ones
3. Engage in AI-mediated discussions for task agreements
4. Complete tasks and release funds through the smart contract

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
