import { render, screen } from "@testing-library/react";
import FilterList from "./FilterList";

test("renders text check", () => {
  render(<FilterList />);
  //const primaryButton = screen.getByRole("button", { name: /primary/i });
  screen.getByRole("button", { text: /This is great/i });
});
