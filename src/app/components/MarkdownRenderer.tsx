// components/MarkdownRenderer.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markdown";

import { createUrlId } from "@utils/parseMarkdownHeaders";
import { useDarkMode } from "@hooks/useDarkMode";

interface MarkdownRendererProps {
  content: string;
  entryId: string;
}

export default function MarkdownRenderer({
  content,
  entryId,
}: MarkdownRendererProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // HEADINGS (h1, h2, etc.)
        h1({ children, ...props }: any) {
          const text = flattenToString(children);
          const id = `${entryId}-${createUrlId(text)}`;
          return (
            <h1
              id={id}
              className="text-3xl font-bold tracking-tight"
              {...props}
            >
              {children}
            </h1>
          );
        },
        h2({ children, ...props }: any) {
          const text = flattenToString(children);
          const id = `${entryId}-${createUrlId(text)}`;
          return (
            <h2
              id={id}
              className="text-2xl font-semibold tracking-tight mt-8 mb-4"
              {...props}
            >
              {children}
            </h2>
          );
        },
        h3({ children, ...props }: any) {
          const text = flattenToString(children);
          const id = `${entryId}-${createUrlId(text)}`;
          return (
            <h3
              id={id}
              className="text-xl font-medium tracking-tight mt-6 mb-3"
              {...props}
            >
              {children}
            </h3>
          );
        },

        // Images -> fully responsive
        img({ src, alt, ...props }: any) {
          // if alt starts with "dark_", we only show it if isDarkMode is true
          // if alt starts with "light_", show it if isDarkMode is false
          // else, always show (e.g. alt="normal" or no prefix)
          const isDarkAlt = alt?.startsWith("dark_");
          const isLightAlt = alt?.startsWith("light_");

          // Dark mode => show dark_ images; hide light_ images
          if (isDarkMode && isDarkAlt) {
            return (
              <Image
                src={src}
                alt={alt}
                unoptimized
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="my-4 rounded-md border border-gray-200 dark:border-gray-700"
                {...props}
              />
            );
          } else if (!isDarkMode && isLightAlt) {
            return (
              <Image
                src={src}
                alt={alt}
                unoptimized
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="my-4 rounded-md border border-gray-200 dark:border-gray-700"
                {...props}
              />
            );
          } else if (!isDarkAlt && !isLightAlt) {
            // If alt doesn't start with "dark_" or "light_", always show it
            return (
              <Image
                src={src}
                alt={alt}
                unoptimized
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="my-4 rounded-md border border-gray-200 dark:border-gray-700"
                {...props}
              />
            );
          }

          // If it doesn't match current theme, show nothing
          return null;
        },

        // PRE
        pre({ children, ...props }: any) {
          return (
            <pre
              className="!mt-4 !mb-4 rounded-lg !bg-[#eceff4] dark:!bg-[#2e3440] !border !border-gray-200 dark:!border-gray-700 overflow-x-auto"
              {...props}
            >
              {children}
            </pre>
          );
        },

        // CODE
        code({ inline, className, children, ...props }: any) {
          const codeText = String(children).replace(/\n$/, "");
          if (inline) {
            return (
              <code
                className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm font-mono text-gray-900 dark:text-gray-100"
                {...props}
              >
                {codeText}
              </code>
            );
          }
          const match = /language-(\w+)/.exec(className || "");
          const lang = match && match[1] ? match[1] : "";
          const highlighted =
            lang && Prism.languages[lang]
              ? Prism.highlight(codeText, Prism.languages[lang], lang)
              : codeText;

          return (
            <code
              className={`language-${lang} font-mono`}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          );
        },

        // HR
        hr(props: any) {
          return <hr className="my-4" {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function flattenToString(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (typeof child === "number") return child.toString();
      return "";
    })
    .join("");
}
