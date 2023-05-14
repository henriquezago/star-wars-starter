import { expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import Home from "../app/page";

describe("Home", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => {
        return {
          results: [],
        };
      },
    });
  });

  it("renders a heading", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });

  it("should call fetch on people's api on form submit", () => {
    render(<Home />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Luke" } });

    const submitButton = screen.getByText("Search");
    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledWith("/api/people?search=Luke");
  });

  it("should call fetch on movies's api on form submit", () => {
    render(<Home />);

    const moviesRadio = screen.getByLabelText("Movies");
    fireEvent.click(moviesRadio);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Luke" } });

    const submitButton = screen.getByText("Search");
    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledWith("/api/movies?search=Luke");
  });
});
