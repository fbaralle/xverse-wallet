"use client";

import useContent from "@/hooks/useContent";
import { Skeleton } from "@/components/atoms/Skeleton";

const ContentComponent = ({ url }: { url: string }) => {
  const { content, isLoading, error } = useContent(url);

  if (isLoading) return <Skeleton className="size-full" />;
  if (error) return <div>Error: {error.message}</div>;

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const isSvgOrHtml = (str: string) => {
    const trimmedStr = str.trim();
    return (
      trimmedStr.startsWith("<svg") ||
      trimmedStr.startsWith("<html") ||
      trimmedStr.startsWith("<!DOCTYPE html>")
    );
  };

  if (!content?.rawContent) return null;

  if (isSvgOrHtml(content.rawContent)) {
    return (
      <div className="w-full">
        {/* Render raw HTML/SVG */}
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: content.rawContent }}
        />
      </div>
    );
  }

  if (isJson(content.rawContent)) {
    return (
      <div className="w-full max-h-screen overflow-auto bg-gray-100 p-4 rounded-md shadow-md">
        <pre className="whitespace-pre-wrap break-words">
          {JSON.stringify(JSON.parse(content.rawContent), null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="size-full bg-gray-900 flex flex-col items-center justify-center">
      Unsupported content type
    </div>
  );
};

export default ContentComponent;
