// import * as index from "./index";

describe("index", () => {
  it("should run a test", () => {
    expect("").toEqual("");
  });
  it("should display default body text", () => {
    require("./index.ts");
    expect(document.querySelector("p")?.textContent).toEqual(
      "D3 starter works"
    );
  });
  // it ('should do this', () => {
  //   expect(this).to.be(that);
  // });
});
