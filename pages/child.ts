import type { Component } from "../lib/app";

const child: Component = (h, initialSomeOtherValue: number) => {
  let inputValue = "I am a text input";
  let someOtherValue = initialSomeOtherValue;
  let sharedState = 0;

  return h.component(({ on, send, stateUpdater, afterMounted, afterDestroyed, ref }) => {
    const updateSharedState = stateUpdater(() => {
      sharedState++;
      send("updateSharedState", sharedState);
    });
    const sharedStateUpdated = on(
      "updateSharedState",
      (newState: number) => (sharedState = newState),
    );

    const updateSomeOtherValue = on("updateValue", (v: number) => (someOtherValue = v));
    const updateInputValue = stateUpdater((e: Event) => {
      inputValue = (e.target as HTMLInputElement).value;
      send("inputValueChanged", inputValue);
    });
    const inputRef = ref();
    const otherRef = ref();
    afterMounted(() => {
      inputRef()?.focus();
    });
    afterDestroyed(() => {
      console.log("I am destroyed");
    });

    let thing = 1;
    const click = stateUpdater((_: Event, i: number) => {
      console.log(i);
      thing++;
    });

    const { div, text, h1, input, button } = h;
    div(() => {
      div(() => {
        button({
          text: () => `Shared State: ${sharedState}`,
          click: updateSharedState,
          subscribe: [updateSharedState, sharedStateUpdated],
        });

        div({ subscribe: click }, () => {
          for (let x = 0; x < thing; x++) {
            div({ id: x }, () => {
              h.button({ text: `Button ${x}`, click: [click, [x]] });
              h.input({ type: "checkbox", checked: x % 2 === 0 });
            });
          }
        });
        text("I am the CHILD 👶");
        h1({ subscribe: updateInputValue }, () => {
          text(inputValue);
        });
        h1({ subscribe: updateSomeOtherValue, ref: otherRef }, () => {
          text(someOtherValue);
        });
        input({
          ref: inputRef,
          type: "text",
          value: () => inputValue,
          subscribe: updateInputValue,
          input: updateInputValue,
        });
      });
    });
  });
};

export { child };
