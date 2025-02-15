import sinon from "sinon"
import { fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("toggle_css_class")

describe("toggle_css_class", () => {
  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })
    it("should do nothing and print warning if no classes were provided", async () => {
      sinon.replace(console, "warn", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "classes" provided for Turbo Streams operation "toggle_css_class"'

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="toggle_css_class" classes="" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "classes" attribute is missing', async () => {
      sinon.replace(console, "warn", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "classes" provided for Turbo Streams operation "toggle_css_class"'

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="toggle_css_class" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context("target", () => {
    it("should toggle one css class", async () => {
      await fixture('<div id="element"></div>')
      assert.equal(document.querySelector("#element").getAttribute("class"), null)

      await executeStream('<turbo-stream action="toggle_css_class" classes="one" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "one")

      await executeStream('<turbo-stream action="toggle_css_class" classes="one" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "")
    })

    it("should toggle one css class with existing class", async () => {
      await fixture('<div id="element" class="one"></div>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "one")

      await executeStream('<turbo-stream action="toggle_css_class" classes="one" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "")

      await executeStream('<turbo-stream action="toggle_css_class" classes="one" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "one")
    })

    it("should toggle multiple css classes", async () => {
      await fixture('<div id="element"></div>')
      assert.equal(document.querySelector("#element").getAttribute("class"), null)

      await executeStream('<turbo-stream action="toggle_css_class" classes="one two" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "one two")

      await executeStream('<turbo-stream action="toggle_css_class" classes="one two" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "")
    })

    it("should toggle multiple css classes with existing class", async () => {
      await fixture('<div id="element" class="one"></div>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "one")

      await executeStream('<turbo-stream action="toggle_css_class" classes="one two" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "two")

      await executeStream('<turbo-stream action="toggle_css_class" classes="one two" target="element"></turbo-stream>')
      assert.equal(document.querySelector("#element").getAttribute("class"), "one")
    })
  })
})
