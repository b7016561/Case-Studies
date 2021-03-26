import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "./App";
import { Router } from "react-router-dom";

test("/ renders Home component", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText("ABC Energy Limited")).toBeInTheDocument();
});

test("/catalogue renders Catalog component", () => {
  const history = createMemoryHistory();
  history.push("/catalogue")
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText("ABC Catalog")).toBeInTheDocument();
});

test("/signup renders SignUp component", () => {
  const history = createMemoryHistory();
  history.push("/signup")
  const { getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByLabelText("First Name")).toBeInTheDocument();
});

test("/login renders login component", () => {
  const history = createMemoryHistory();
  history.push("/login")
  const { getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByLabelText("Username")).toBeInTheDocument();
});

test("/catalogueItem renders CatalogItem component", () => {
  const history = createMemoryHistory();
  history.push("/catalogueItem")
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText("Request Quote")).toBeInTheDocument();
});

test("/quoteRequests renders QuoteRequestList component", () => {
  const history = createMemoryHistory();
  history.push("/quoteRequests")
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText("Quote Requests")).toBeInTheDocument();
});

test("/quotes renders QuoteList component", () => {
  const history = createMemoryHistory();
  history.push("/quotes")
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText("Quotes")).toBeInTheDocument();
});