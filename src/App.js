import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import TabPairs from "./modules/TabPairs";
import AddCookie from "./modules/AddCookie";

/* global chrome */

function App() {
  const [activeKey, setActiveKey] = useState("pairListing");
  const [tabs, setTabs] = useState([]);
  const [pairedTabs, setPairedTabs] = useState([]);

  const content = {
    tabHeadings: {
      tab1: "Tab Pairs",
      tab2: "Add Cookie",
    },
  };

  // Fetch tabs and their domains on component mount
  useEffect(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs = tabs.map((tab) => {
        const url = new URL(tab.url);
        const domain =
          url.hostname === "localhost" || url.hostname === "127.0.0.1"
            ? url.hostname + ":" + url.port
            : url.hostname;
        tab = { ...tab, domain };
        return tab;
      });
      setTabs(tabs);
    });
  }, []);

  // Fetch paired tabs from storage on component mount
  useEffect(() => {
    chrome.storage.local.get("pairedTabs", (data) => {
      setPairedTabs(data.pairedTabs || []);
    });
  }, []);

  return (
    <div>
      <Tab.Container
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
      >
        <Nav variant="tabs" className="justify-content-center d-flex">
          <Nav.Item className="flex-grow-1 text-center">
            <Nav.Link eventKey="pairListing" className="bg-dark text-white">
              {content?.tabHeadings?.tab1}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="flex-grow-1 text-center">
            <Nav.Link eventKey="addCookie" className="bg-dark text-white">
              {content?.tabHeadings?.tab2}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="pairListing">
            <TabPairs pairedTabs={pairedTabs} />
          </Tab.Pane>
          <Tab.Pane eventKey="addCookie">
            <AddCookie tabs={tabs} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default App;
