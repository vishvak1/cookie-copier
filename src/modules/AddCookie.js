import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CookieSelection from "./CookieSelection";

function AddCookie({ tabs, currentSessionPairs,updateCurrentSessionPairs }) {
  const [selectedFromTab, setSelectedFromTab] = useState(null);
  const [selectedToTab, setSelectedToTab] = useState(null);
  const [showCookieSelection, setShowCookieSelection] = useState(false);

  const content = {
    formLabels: {
      label1: "From tab",
      label2: "To tab",
    },
    nextButtonLabel: "Next",
  };

  // Handle changes in the "from tab" dropdown
  const handleFromTabChange = (event) => {
    setSelectedFromTab(tabs[event.target.value]);
  };

  // Handle changes in the "to tab" dropdown
  const handleToTabChange = (event) => {
    setSelectedToTab(tabs[event.target.value]);
  };

  // Handle clicking the "Next" button
  const handleNextClick = () => {
    if (selectedFromTab && selectedToTab) {
      setShowCookieSelection(true);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {!showCookieSelection ? (
        <Form className="text-center">
          <br />
          <Form.Select
            className="inputField minimalistic-select"
            onChange={handleFromTabChange}
          >
            <option>{content?.formLabels?.label1}</option>
            {tabs.map((tab, index) => (
              <option value={index}>{tab.domain}</option>
            ))}
          </Form.Select>
          <br />
          <Form.Select
            className="inputField minimalistic-select"
            onChange={handleToTabChange}
          >
            <option>{content?.formLabels?.label2}</option>
            {tabs.map((tab, index) => (
              <option value={index}>{tab.domain}</option>
            ))}
          </Form.Select>
          <br />
          <Button
            variant="primary"
            className="addCta"
            onClick={handleNextClick}
          >
            {content?.nextButtonLabel}
          </Button>
        </Form>
      ) : (
        <CookieSelection
          selectedFromTab={selectedFromTab}
          selectedToTab={selectedToTab}
          currentSessionPairs={currentSessionPairs}
          updateCurrentSessionPairs={updateCurrentSessionPairs}
        />
      )}
    </div>
  );
}

export default AddCookie;
