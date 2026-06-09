import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("renders the search input", () => {
    render(<SearchBar value="" onSearch={() => {}} />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("calls onSearch with input value on change", () => {
    const onSearch = jest.fn();
    render(<SearchBar value="" onSearch={onSearch} />);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Branding" },
    });
    expect(onSearch).toHaveBeenCalledWith("Branding");
  });

  it("shows clear button when value is non-empty", () => {
    render(<SearchBar value="test" onSearch={() => {}} />);
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<SearchBar value="" onSearch={() => {}} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("calls onSearch with empty string when clear button is clicked", () => {
    const onSearch = jest.fn();
    render(<SearchBar value="hello" onSearch={onSearch} />);
    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(onSearch).toHaveBeenCalledWith("");
  });
});
