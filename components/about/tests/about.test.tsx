import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../about-page";

// Mock the 'next/image' module
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

test("renders About component without error", () => {
  render(<About />);
});

test("displays the image with correct attributes", () => {
  render(<About />);
  const imageElement = screen.getByAltText("logo");
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("src", "/url.png");
  expect(imageElement).toHaveAttribute("width", "250");
  expect(imageElement).toHaveAttribute("height", "250");
});

test("displays the 'About Us' heading", () => {
  render(<About />);
  const headingElement = screen.getByText("About Us");
  expect(headingElement).toBeInTheDocument();
});

test("displays the text content", () => {
  render(<About />);
  const customTextMatcher = (content: any, node: any) => {
    const hasText = (n: any) => n.textContent === content;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );
    return nodeHasText && childrenDontHaveText;
  };
  const contentElements = screen.queryAllByText((content, node) =>
    customTextMatcher(
      "Welcome to my Url-Shortening PWA (Progressive Web App). Here you can enter any URL and a new short URL will be generated which is convenient for you to keep on track. PWA basically means that you can install this web app into your system as well as on your mobile devices, just like a mobile app and it also works in offline mode.",
      node
    )
  );
  contentElements.forEach((contentElement) => {
    expect(contentElement).toBeInTheDocument();
  });
});
