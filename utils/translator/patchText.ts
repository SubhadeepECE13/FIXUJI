import React, { useEffect, useState } from "react";
import { Text as RNText } from "react-native";
import { translateText } from "./liveTranslator";

const OriginalRender = (RNText as any)._render || (RNText as any).render;

// Monkey patch
(RNText as any).render = function (...args: any[]) {
  const origin = OriginalRender.call(this, ...args);
  const { children, ...props } = origin.props;

  const [translatedChildren, setTranslatedChildren] = useState(children);

  useEffect(() => {
    const process = async () => {
      if (typeof children === "string") {
        const translated = await translateText(children.trim());
        setTranslatedChildren(translated);
      } else if (Array.isArray(children)) {
        const translatedArray = await Promise.all(
          children.map(async (child) =>
            typeof child === "string"
              ? await translateText(child.trim())
              : child
          )
        );
        setTranslatedChildren(translatedArray);
      }
    };
    process();
  }, [children]);

  return React.cloneElement(origin, props, translatedChildren);
};
