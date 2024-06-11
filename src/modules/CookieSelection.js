import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";

/* global chrome */

function CookieSelection({ selectedFromTab, selectedToTab, currentSessionPairs, updateCurrentSessionPairs }) {
  const [cookies, setCookies] = useState([]);
  const [selectedCookies, setSelectedCookies] = useState([]);

  const content = {
    formLabels: {
      label3: "Cookies",
      ctaLabel1: "Copy cookies",
      ctaLabel2: "Copy and save cookies",
      ctaLabel3: "Add all cookies",
    },
    selectedCookiesHeading: "Selected Cookies",
    configNameLabel: "Configuration Name",
  };

  // Fetch cookies from the selected "from tab" on component mount and when the tab changes
  useEffect(() => {
    if (selectedFromTab) {
      chrome.cookies.getAll({ url: selectedFromTab.url }, (cookies) => {
        setCookies(cookies.map((cookie) => cookie.name));
      });
    }
  }, [selectedFromTab]);

  // Handle changes in the cookie selection dropdown
  const handleCookieChange = (event) => {
    const selectedCookie = cookies[event.target.value];
    if (selectedCookie && !selectedCookies.includes(selectedCookie)) {
      setSelectedCookies([...selectedCookies, selectedCookie]);
    }
  };

  // Handle clicking the "Add all cookies" button
  const handleAddAllCookies = () => {
    setSelectedCookies([...cookies]);
  };

  // Copy selected cookies to the "to tab"
  const copyCookies = () => {
    chrome.cookies.getAll({ url: selectedFromTab.url }, (cookies) => {
      cookies = cookies.filter((cookie) =>
        selectedCookies.includes(cookie.name)
      );
      cookies.forEach((cookie) => {
        const url = new URL(selectedToTab.url);
        const domain = url.hostname;
        chrome.cookies.set({
          url: selectedToTab.url,
          name: cookie.name,
          value: cookie.value,
          domain: domain,
          path: cookie.path,
          expirationDate: cookie.expirationDate,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
        });
      });
    });
  };

  // Handle clicking the "Copy cookies" button
  const handleCopyCookies = () => {
    copyCookies();

    const listItem = {
      fromTab: selectedFromTab,
      toTab: selectedToTab,
      cookies: selectedCookies,
    };

    // Update current session pairs
    updateCurrentSessionPairs([...currentSessionPairs, listItem]);
  };

  // Handle clicking the "Copy and save cookies" button
  const handleCopyAndSaveCookies = () => {
    const configName = prompt("Enter a name for the configuration:");
    if (configName) {
      const listItem = {
        fromTab: selectedFromTab,
        toTab: selectedToTab,
        cookies: selectedCookies,
        configName: configName,
      };
      chrome.storage.local.get("savedPairs", (data) => {
        let savedPairs = data.savedPairs;
        if (savedPairs) {
          savedPairs.push(listItem);
        } else {
          savedPairs = [listItem];
        }
        chrome.storage.local.set({ savedPairs });
      });
      copyCookies();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Form className="text-center">
        <br />
        <Form.Select
          className="inputField minimalistic-select"
          onChange={handleCookieChange}
        >
          <option>{content?.formLabels?.label3}</option>
          {cookies.map((cookie, index) => (
            <option value={index}>{cookie}</option>
          ))}
        </Form.Select>
        <br />
        <h5 className="text-white">{content?.selectedCookiesHeading}</h5>
        <ListGroup className="justify-content-center listField">
          {selectedCookies.map((cookie, index) => (
            <ListGroup.Item className="bg-dark text-white listItem" key={index}>
              {cookie}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <br />
        <Button
          variant="secondary"
          className="addCta"
          onClick={handleAddAllCookies}
        >
          {content?.formLabels?.ctaLabel3}
        </Button>
        <br />
        <Button
          variant="primary"
          className="addCta"
          onClick={handleCopyCookies}
        >
          {content?.formLabels?.ctaLabel1}
        </Button>
        <br />
        <Button
          variant="success"
          className="addCta"
          onClick={handleCopyAndSaveCookies}
        >
          {content?.formLabels?.ctaLabel2}
        </Button>
      </Form>
    </div>
  );
}

export default CookieSelection;
