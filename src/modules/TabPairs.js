import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";

const [expandCookies, setExpandCookies] = useState([]);

const handleCookieListExpand = () => {
  if (pairCookies.length === 0) {
    setExpandCookies(pair.cookies);
  } else {
    setExpandCookies([]);
  }
};

function TabPairs({ pairedTabs }) {
  const [pairedTabs, setPairedTabs] = useState(pairedTabs);

  useEffect(() => {
    const checkCookieValueChanged = () => {
      const updatedPairedTabs = [...pairedTabs];
      updatedPairedTabs.forEach((pair) => {
        chrome.cookies.getAll({ url: pair.toTab.url }, (cookies) => {
          cookies = cookies.filter((cookie) =>
            selectedCookies.includes(cookie.name)
          );
          cookies.find((cookie) => {
            if (cookie.value !== pair.cookies[cookie.name].value) {
              pair.cookie.isExpired = true;
              return true;
            }
            return false;
          });
        });
      });
      setPairedTabs(updatedPairedTabs);
    };

    checkCookieValueChanged();
  }, [pairedTabs, setPairedTabs]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {pairedTabs.map((pair, index) => (
        <Card
          bg="light"
          border="dark"
          className="m-2 position-relative"
          key={index}
        >
          <Card.Body>
            <Card.Text>
              <strong>From tab:</strong> {pair.fromTab.domain}
            </Card.Text>
            <Card.Text>
              <strong>To tab:</strong> {pair.toTab.domain}
            </Card.Text>
            {expandCookies.length === 0 ? (
              <Card.Text onClick={handleCookieListExpand}>
                <strong>Cookies list:</strong>{" "}
                {pair.cookies.length > 5
                  ? pair.cookies.slice(0, 5).join(",") + "..."
                  : pair.cookies.join(",")}
              </Card.Text>
            ) : (
              <Card.Text onClick={handleCookieListExpand}>
                <strong>Cookies list:</strong> {pairCookies.join(", ")}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default TabPairs;
