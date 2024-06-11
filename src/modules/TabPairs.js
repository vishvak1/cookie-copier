import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

/* global chrome */

function TabPairs({ currentSessionPairs, savedPairs }) {

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h4 className="text-white">Current Session</h4>
      {currentSessionPairs.map((pair, index) => (
        <Card bg="light" border="dark" className="mb-2 position-relative" key={index}>
          <Card.Body>
            <Card.Text>
              <strong>From tab:</strong> {pair.fromTab.domain}
            </Card.Text>
            <Card.Text>
              <strong>To tab:</strong> {pair.toTab.domain}
            </Card.Text>
            <Card.Text>
              <strong>Cookies list:</strong>{" "}
              {pair.cookies.length > 5
                ? pair.cookies.slice(0, 5).join(",") + "..."
                : pair.cookies.join(",")}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

      <h4 className="text-white">Saved Pairs</h4>
      {savedPairs.map((pair, index) => (
        <Card bg="light" border="dark" className="mb-2 position-relative" key={index}>
          <Card.Header>{pair.configName}</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>From tab:</strong> {pair.fromTab.domain}
            </Card.Text>
            <Card.Text>
              <strong>To tab:</strong> {pair.toTab.domain}
            </Card.Text>
            <Card.Text>
              <strong>Cookies list:</strong>{" "}
              {pair.cookies.length > 5
                ? pair.cookies.slice(0, 5).join(",") + "..."
                : pair.cookies.join(",")}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default TabPairs;