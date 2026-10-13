import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { describe, expect, it } from "vitest";

import Footer from "../Footer.vue";

describe("Footer", () => {
  it("links to the framework talking points", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: "/",
          component: { template: "<h1>Home</h1>" },
        },
        {
          path: "/talking-points",
          component: { template: "<h1>Talking points</h1>" },
        },
      ],
    });

    await router.push("/");
    await router.isReady();

    const wrapper = mount(Footer, {
      global: {
        plugins: [router],
      },
    });

    const link = wrapper.get('a[href="/talking-points"]');
    expect(link.text()).toBe("Talking points");
  });
});
