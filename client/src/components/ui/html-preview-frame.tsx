import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type PreviewViewport = "desktop" | "tablet" | "mobile";

export type PreviewScene = {
  width?: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
};

const PREVIEW_HEIGHTS: Record<PreviewViewport, number> = {
  desktop: 420,
  tablet: 500,
  mobile: 667,
};

type HtmlPreviewFrameProps = {
  htmlPreview: string;
  title: string;
  viewport: PreviewViewport;
  className?: string;
  height?: number;
  scene?: PreviewScene;
};

function buildPreviewDocument(htmlPreview: string, scene?: PreviewScene) {
  const headMarkup = Array.from(document.head.querySelectorAll("style, link[rel='stylesheet']"))
    .map((node) => node.outerHTML)
    .join("\n");
  const themeClass = document.documentElement.classList.contains("dark") ? "dark" : "";

  if (scene) {
    const width = scene.width ?? 1600;
    const scale = scene.scale ?? 1;
    const offsetX = scene.offsetX ?? 0;
    const offsetY = scene.offsetY ?? 0;

    return `<!DOCTYPE html>
<html class="${themeClass}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${headMarkup}
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: transparent;
      }

      body {
        overflow: hidden;
      }

      #preview-viewport {
        position: relative;
        min-height: 100%;
        overflow: hidden;
        background: transparent;
      }

      #preview-scene {
        position: absolute;
        top: 0;
        left: 0;
        width: ${width}px;
        transform-origin: top left;
        transform: translate(${offsetX}px, ${offsetY}px) scale(${scale});
      }

      #preview-root {
        min-height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="preview-viewport">
      <div id="preview-scene">
        <div id="preview-root">${htmlPreview}</div>
      </div>
    </div>
  </body>
</html>`;
  }

  return `<!DOCTYPE html>
<html class="${themeClass}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${headMarkup}
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: transparent;
      }

      body {
        overflow: auto;
      }

      #preview-root {
        min-height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="preview-root">${htmlPreview}</div>
  </body>
</html>`;
}

export function HtmlPreviewFrame({ htmlPreview, title, viewport, className, height, scene }: HtmlPreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    iframe.srcdoc = buildPreviewDocument(htmlPreview, scene);
  }, [htmlPreview, viewport, scene]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={cn("block w-full border-0 bg-transparent", className)}
      style={{ height: height ?? PREVIEW_HEIGHTS[viewport] }}
    />
  );
}