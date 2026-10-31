import { cjk } from "@streamdown/cjk";
import type { ComponentProps } from "react";
import { Streamdown } from "streamdown";

// Compass replies are plain prose: code highlighting, math and mermaid are not needed.
const streamdownPlugins = { cjk };

export default function StreamdownRenderer(props: ComponentProps<typeof Streamdown>) {
  return <Streamdown plugins={streamdownPlugins} {...props} />;
}
