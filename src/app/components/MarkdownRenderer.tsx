"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
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

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

export default function MarkdownRenderer({
  content,
  entryId,
}: MarkdownRendererProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // HEADINGS
        h1({
          children,
          ...props
        }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
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
        h2({
          children,
          ...props
        }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
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
        h3({
          children,
          ...props
        }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
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

        // TABLE COMPONENTS
        table({ children, ...props }) {
          return (
            <div className="rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full my-0" {...props}>
                {children}
              </table>
            </div>
          );
        },
        thead({ children, ...props }) {
          return (
            <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
              {children}
            </thead>
          );
        },
        tbody({ children, ...props }) {
          return <tbody {...props}>{children}</tbody>;
        },
        tr({ children, ...props }) {
          return (
            <tr
              className="border-t border-gray-200 dark:border-gray-700 first:border-0"
              {...props}
            >
              {children}
            </tr>
          );
        },
        th({ children, ...props }) {
          return (
            <th
              className="p-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              {...props}
            >
              {children}
            </th>
          );
        },
        td({ children, ...props }) {
          // Process cell content to handle newlines and br tags
          const processContent = (
            content: React.ReactNode
          ): React.ReactNode => {
            if (typeof content === "string") {
              return content.split(/(?:<br\s*\/?>|\n)/g).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ));
            }
            if (Array.isArray(content)) {
              return content.map((child) => processContent(child));
            }
            return content;
          };

          return (
            <td
              className="p-2 text-sm text-gray-700 dark:text-gray-300 align-top"
              {...props}
            >
              {processContent(children)}
            </td>
          );
        },

        // Images & Videos
        img({
          src,
          alt = "",
          width,
          height,
          ...props
        }: React.ImgHTMLAttributes<HTMLImageElement>) {
          const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
          const isVideo =
            src &&
            videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));

          const isDarkAlt = alt?.startsWith("dark_");
          const isLightAlt = alt?.startsWith("light_");

          // Handle Streamable links
          if (src && src.includes("streamable.com")) {
            const streamableId = src.split("/").pop(); // Extract the video ID
            const embedUrl = `https://streamable.com/e/${streamableId}`;

            return (
              <iframe
                src={embedUrl}
                className="my-4 rounded-md border border-gray-200 dark:border-gray-700 w-full aspect-video"
                allowFullScreen
              />
            );
          }

          // Handle local or hosted videos
          if (isVideo) {
            const shouldRender =
              (isDarkMode && isDarkAlt) ||
              (!isDarkMode && isLightAlt) ||
              (!isDarkAlt && !isLightAlt);

            if (!shouldRender) return null;

            const videoProps = {
              src,
              controls: true,
              className:
                "my-4 rounded-md border border-gray-200 dark:border-gray-700",
              style: { width: "100%", height: "auto" },
            };

            return <video {...videoProps} />;
          }

          // Handle image rendering
          const imageProps = {
            src: src || "",
            alt: alt || "",
            unoptimized: true,
            width: Number(width) || 0,
            height: Number(height) || 0,
            style: { width: "100%", height: "auto" },
            className:
              "my-4 rounded-md border border-gray-200 dark:border-gray-700",
            ...props,
          };

          if (isDarkMode && isDarkAlt) {
            return <Image {...imageProps} />;
          } else if (!isDarkMode && isLightAlt) {
            return <Image {...imageProps} />;
          } else if (!isDarkAlt && !isLightAlt) {
            return <Image {...imageProps} />;
          }

          return null;
        },

        // PRE
        pre({
          children,
          ...props
        }: React.PropsWithChildren<React.HTMLAttributes<HTMLPreElement>>) {
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
        code({ inline, className, children, ...props }: CodeProps) {
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
              {...props}
            />
          );
        },

        // HR
        hr(props: React.HTMLAttributes<HTMLHRElement>) {
          return (
            <hr
              className="my-4 border-t border-gray-200 dark:border-gray-700"
              {...props}
            />
          );
        },

        // Handle HTML content
        p({ children, ...props }) {
          return (
            <p
              className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </p>
          );
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
