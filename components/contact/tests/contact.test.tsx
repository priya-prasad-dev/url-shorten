import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import ContactForm from "../contact-form";
import fetch from "fetch-mock-jest";

// Mock the fetch function
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

// Helper function to mock a successful form submission
const mockSuccessfulSubmission = () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
  });
};

// Helper function to mock a failed form submission
const mockFailedSubmission = () => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
  });
};

test("renders ContactForm without error", () => {
  render(<ContactForm />);
});

test("displays the form fields and submit button", () => {
  render(<ContactForm />);
  const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
  const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  const messageInput = screen.getByLabelText("Message") as HTMLTextAreaElement;
  const submitButton = screen.getByText("Submit") as HTMLButtonElement;

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("allows users to enter input in form fields", () => {
  render(<ContactForm />);
  const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
  const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  const messageInput = screen.getByLabelText("Message") as HTMLTextAreaElement;

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  fireEvent.change(messageInput, { target: { value: "Test message" } });

  expect(nameInput.value).toBe("John Doe");
  expect(emailInput.value).toBe("john@example.com");
  expect(messageInput.value).toBe("Test message");
});
