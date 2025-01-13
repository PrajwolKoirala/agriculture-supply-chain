"use client"
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UserRegistration = ({ contract, account }) => {
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const registerUser = async () => {
    if (!contract || !account) {
      setStatus('Please connect your wallet first');
      return;
    }

    try {
      setStatus('Registering user...');
      
      // Use the connected account if no address is provided
      const targetAddress = address || account;
      
      const result = await contract.methods
        .registerUser(targetAddress, role)
        .send({ from: account });
      
      setStatus(`Successfully registered address ${targetAddress} as ${role}`);
      setAddress('');
      setRole('');
    } catch (error) {
      console.error('Registration error:', error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Address (leave empty to use connected wallet)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Select onValueChange={setRole} value={role}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FARMER">Farmer</SelectItem>
            <SelectItem value="COLLECTOR">Collector</SelectItem>
            <SelectItem value="TRANSPORTER">Transporter</SelectItem>
            <SelectItem value="DISTRIBUTOR">Distributor</SelectItem>
            <SelectItem value="RETAILER">Retailer</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={registerUser}>Register User</Button>
        {status && (
          <Alert>
            <AlertDescription>{status}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRegistration;