// src/contexts/Web3Context.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors' // Changed this line
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/web3Config'

interface Web3ContextType {
  connect: () => Promise<void>
  disconnect: () => void
  contract: any | null
  account: string | null
  isActive: boolean
}

const Web3Context = createContext<Web3ContextType | null>(null)

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { connect } = useConnect({
    connector: injected(), // Changed this line
  })
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const [contract, setContract] = useState<any | null>(null)

  useEffect(() => {
    if (window.ethereum && address) {
      const web3 = new Web3(window.ethereum)
      const newContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
      setContract(newContract)
    }
  }, [address])

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Error connecting:', error)
    }
  }

  return (
    <Web3Context.Provider
      value={{
        connect: handleConnect,
        disconnect,
        contract,
        account: address || null,
        isActive: isConnected,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}