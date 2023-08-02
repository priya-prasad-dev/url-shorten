import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/index";

test("renders Home component", () => {
  render(<Home urlList={[]} />);
  expect(screen.getByText("URL-Shorten")).toBeInTheDocument();
});

test("input field should be empty initially", () => {
  render(<Home urlList={[]} />);
  const inputElement = screen.getByPlaceholderText("Enter long url...");
  expect(inputElement).toHaveValue("");
});

test("changing input field value", () => {
  render(<Home urlList={[]} />);
  const inputElement = screen.getByPlaceholderText("Enter long url...");
  fireEvent.change(inputElement, { target: { value: "https://example.com" } });
  expect(inputElement).toHaveValue("https://example.com");
});

// form submission
test("form submission adds new URL to the list", async () => {
  const mockResponse = {
    url: "https://example.com",
    code: "ABC123",
    clicked: 0,
  };

  // Mock fetch API
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  }) as jest.Mock;

  render(<Home urlList={[]} />);
  const inputElement = screen.getByPlaceholderText("Enter long url...");
  const createButton = screen.getByText("Create Short Url");

  fireEvent.change(inputElement, { target: { value: "https://example.com" } });
  fireEvent.click(createButton);

  // Wait for the async operation to finish
  await screen.findByText("https://example.com");

  // Assert that the new URL is added to the list
  expect(screen.getByText("https://example.com")).toBeInTheDocument();
});

test("table headers are rendered", () => {
  render(<Home urlList={[]} />);
  expect(screen.getByText("Long URL")).toBeInTheDocument();
  expect(screen.getByText("Short URL")).toBeInTheDocument();
  expect(screen.getByText("Clicked")).toBeInTheDocument();
});

test("table displays URL data", () => {
  const urlList = [
    {
      url: "https://example.com",
      code: "ABC123",
      clicked: 0,
    },
    {
      url: "https://example.org",
      code: "XYZ789",
      clicked: 10,
    },
  ];

  render(<Home urlList={urlList} />);
  expect(screen.getByText("https://example.com")).toBeInTheDocument();
  expect(screen.getByText("ABC123")).toBeInTheDocument();
  expect(screen.getByText("0")).toBeInTheDocument();

  expect(screen.getByText("https://example.org")).toBeInTheDocument();
  expect(screen.getByText("XYZ789")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
});

test("form submission adds new URL to the list", async () => {
  const mockResponse = {
    url: "https://example.com",
    code: "ABC123",
    clicked: 0,
  };

  // Mock fetch API
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  }) as jest.Mock;

  render(<Home urlList={[]} />);
  const inputElement = screen.getByPlaceholderText("Enter long url...");
  const createButton = screen.getByText("Create Short Url");

  fireEvent.change(inputElement, { target: { value: "https://example.com" } });
  fireEvent.click(createButton);

  // Wait for the async operation to finish
  await screen.findByText("https://example.com");

  // Assert that the new URL is added to the list
  expect(screen.getByText("https://example.com")).toBeInTheDocument();
});
