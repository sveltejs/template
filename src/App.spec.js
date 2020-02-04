import "@testing-library/jest-dom/extend-expect";
import {render} from "@testing-library/svelte";
import App from "./App.svelte";

describe('Root Component', () => {

  test("should have a Hello world! message", () => {
    const props = {
      name: "world"
    };

    const { getByText } = render(App, props);

    expect(getByText("Hello world!")).toBeInTheDocument();
  });
})
