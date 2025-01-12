"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { Button } from "@/components/base/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function HomeComponent() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4">
        ▲ Next.js + LangChain.js 🦜🔗
      </h1>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            This template showcases a simple chatbot using{" "}
            <a
              href="https://js.langchain.com/"
              target="_blank"
              rel="noreferrer"
            >
              LangChain.js
            </a>{" "}
            and the Vercel{" "}
            <a
              href="https://sdk.vercel.ai/docs"
              target="_blank"
              rel="noreferrer"
            >
              AI SDK
            </a>{" "}
            in a{" "}
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
              Next.js
            </a>{" "}
            project.
          </span>
        </li>
        <li className="hidden text-l md:block">
          💻
          <span className="ml-2">
            You can find the prompt and model logic for this use-case in{" "}
            <code>app/api/chat/route.ts</code>.
          </span>
        </li>
        <li>
          🏴‍☠️
          <span className="ml-2">
            By default, the bot is pretending to be a pirate, but you can change
            the prompt to whatever you want!
          </span>
        </li>
        <li className="hidden text-l md:block">
          🎨
          <span className="ml-2">
            The main frontend logic is found in <code>app/page.tsx</code>.
          </span>
        </li>
        <li className="text-l">
          🐙
          <span className="ml-2">
            This template is open source - you can see the source code and
            deploy your own version{" "}
            <a
              href="https://github.com/langchain-ai/langchain-nextjs-template"
              target="_blank"
              rel="noreferrer"
            >
              from the GitHub repo
            </a>
            !
          </span>
        </li>
        <li className="text-l">
          👇
          <span className="ml-2">
            Try asking e.g. <code>What is it like to be a pirate?</code> below!
          </span>
        </li>
      </ul>
    </div>
  );
  return (
    <>
      <div>
        <h2 className="font-bold">Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <Button
            className="my-2"
            variant="secondary"
            type="button"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        )}
      </div>

      <div className="mt-2">
        <h2 className="mb-1 font-bold">Connect</h2>
        {/* {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </Button>
        ))} */}
        <ConnectButton />
        <div>
          <p>{status}</p>
          <p>{error?.message}</p>
        </div>
      </div>
      <ChatWindow
        endpoint="api/chat"
        emoji="🏴‍☠️"
        titleText="Patchy the Chatty Pirate"
        placeholder="I'm an LLM pretending to be a pirate! Ask me about the pirate life!"
        emptyStateComponent={InfoCard}
      />
    </>
  );
}
