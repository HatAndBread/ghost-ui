import type { Templater } from "./types";
import { templateBuilder, ComponentBase } from "./template-builder";
import type { StateObject } from "./template-builder";
import { router, initR } from "./route";

export type Component = (h: Templater, ...args: any) => ComponentBase;
export type Template = Templater;
export type State<T> = StateObject<T>;
export type AppOptions = {
  spa: boolean;
};
export { router };
export default (i: Component, el: string | HTMLElement, options?: AppOptions) => {
  const element = typeof el === "string" ? document.querySelector(el) : el;
  if (!element && typeof el === "string") {
    const err = "No element found with css selector: " + el;
    throw new Error(err);
  } else if (!element) {
    const err = "No element found: " + el;
    throw new Error(err);
  }

  const h = templateBuilder(element as HTMLElement);

  if (options?.spa) {
    h.component(({ state }) => {
      // Initialize reouter path
      initR(state(window.location.pathname), state([] as string[]), state({}));
      i(h);
    });
    return;
  } else {
    i(h);
  }
};
