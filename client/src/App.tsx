import React from 'react';
import { Layout, Row, Col, Button } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
const provider = new Provider(Network.DEVNET);


function App() {
  const { account } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(false);

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    const moduleAddress = "6059daea60c3856afe108bd91bd414221bcf455c41f50e12dee3cc66736085c1";
    try {
      const TodoListResource = await provider.getAccountResource(
        account.address,
        `${moduleAddress}::todolist::TodoList`
      );
      setAccountHasList(true);
    } catch (e: any) {
      setAccountHasList(false);
    }
  };

  return (
    <>
      <Layout>
        <Row align="middle">
          <Col span={10} offset={2}>
            <h1>Our todolist</h1>
          </Col>
          <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <WalletSelector />
          </Col>
        </Row>
      </Layout>
      {!accountHasList && (
        <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
          <Col span={8} offset={8}>
            <Button block type="primary" style={{ height: "40px", backgroundColor: "#3f67ff" }}>
              Add new list
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default App;
