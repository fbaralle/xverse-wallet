import useContent from "@/hooks/useContent";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useEffect, useState } from "react";

const ContentComponent = ({ url }: { url: string }) => {
  // const { content, isLoading, error } = useContent(url);
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchContent();
    }
  }, [url]);

  if (isLoading) return <Skeleton className="size-full" />;

  if (error) return <div>Error: {error.message}</div>;

  const isJson = (str: unknown): boolean => {
    if (typeof str !== "string") return false;
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const isHtml = (str: unknown): boolean => {
    if (typeof str !== "string") return false;
    const trimmedStr = str.trim();
    return (
      trimmedStr.startsWith("<html") || trimmedStr.startsWith("<!DOCTYPE html>")
    );
  };

  const isSvg = (str: unknown): boolean => {
    if (typeof str !== "string") return false;
    return str.trim().startsWith("<svg");
  };

  if (!content) return null;

  if (isHtml(content)) {
    const blob = new Blob([content], { type: "text/html" });
    const iframeSrc = URL.createObjectURL(blob);

    return (
      <div className="w-full h-full">
        <iframe
          src={iframeSrc}
          title="HTML Content"
          className="w-full h-full border-none"
        />
      </div>
    );
  }

  if (isSvg(content)) {
    return (
      <div className="w-full">
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: String(content) }}
        />
      </div>
    );
  }

  if (isJson(content)) {
    return (
      <div className="w-full max-h-full overflow-auto bg-gray-100 p-4 rounded-md shadow-md">
        <pre className="whitespace-pre-wrap break-words">
          {JSON.stringify(JSON.parse(String(content)), null, 2)}
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
