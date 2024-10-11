"use client";
import { useEffect, useState } from "react";
import { type Address } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import NFT_ABI from "../modules//wagmi/abi/DemoNFT";
import styles from "./page.module.css";
import { soneiumMinato } from "viem/chains";

const nftContractAddress = "0xFd0dA2fC3ac7D18D133b6A87379b80165bF04E14";
const faucetDocs = "https://docs.soneium.org/docs/builders/tools/faucets";

export default function Home(): JSX.Element {
  const [txDetails, setTxDetails] = useState<string>("");
  const account = useAccount();
  const walletAddress = account?.address;

  const connectedId = useChainId();
  const chainId = soneiumMinato.id;
  const isConnectedToMinato = connectedId === soneiumMinato.id;

  const { switchChain } = useSwitchChain();

  const { data: walletClient } = useWalletClient({
    chainId,
    account: walletAddress,
  });

  const publicClient = usePublicClient({
    chainId,
  });

  const [isPending, setIsPending] = useState(false);
  const { data: bal } = useBalance({
    address: walletAddress,
    chainId,
  });
  const isBalanceZero = bal?.value.toString() === "0";

  async function mintNft(): Promise<void> {
    if (!walletClient || !publicClient || !walletAddress) return;
    try {
      setIsPending(true);
      const tx = {
        account: walletAddress as Address,
        address: nftContractAddress as Address,
        abi: NFT_ABI,
        functionName: "safeMint",
        args: [walletAddress],
      } as const;
      const { request } = await publicClient.simulateContract(tx);
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({
        hash,
      });
      setTxDetails(`https://explorer-testnet.soneium.org/tx/${hash}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    setTxDetails("");
  }, [walletAddress]);

  return (
    <div className={styles.container}>
      <button
        disabled={
          isPending || !walletAddress || isBalanceZero || !isConnectedToMinato
        }
        className={styles.buttonAction}
        onClick={mintNft}
        type="button"
      >
        {isPending ? "Confirming..." : "Mint NFT"}
      </button>

      {txDetails && (
        <div className={styles.txDetails}>
          <span>🎉 Congrats! Your NFT has been minted 🐣 </span>
          <a
            href={txDetails}
            target="_blank"
            rel="noreferrer"
            className={styles.txLink}
          >
            View transaction
          </a>
        </div>
      )}

      {walletAddress && isBalanceZero && (
        <div className={styles.rowChecker}>
          <span className={styles.textError}>
            You don't have enough ETH balance to mint NFT
          </span>
          <a
            href={faucetDocs}
            target="_blank"
            rel="noreferrer"
            className={styles.txLink}
          >
            ETH Faucet
          </a>
        </div>
      )}

      {chainId !== soneiumMinato.id && (
        <div className={styles.rowChecker}>
          <span className={styles.textError}>
            You don't have enough ETH balance to mint NFT
          </span>
          <a
            href={faucetDocs}
            target="_blank"
            rel="noreferrer"
            className={styles.txLink}
          >
            ETH Faucet
          </a>
        </div>
      )}

      {!isConnectedToMinato && walletAddress && (
        <div className={styles.rowChecker}>
          <span className={styles.textError}>
            Please connect to Soneium Minato
          </span>

          <button
            className={styles.buttonSwitchChain}
            onClick={() => switchChain({ chainId })}
          >
            Switch to Soneium Minato
          </button>
        </div>
      )}
    </div>
  );
}
