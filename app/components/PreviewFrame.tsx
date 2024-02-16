import React, { useRef, useEffect } from 'react';

interface PreviewFrameProps {
  htmlContent: string;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow?.document) {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(htmlContent);
      iframe.contentWindow.document.close();
    }
  }, [htmlContent]); // Depend on htmlContent to update iframe content if htmlContent changes

  return (
    <iframe ref={iframeRef} width="100%" className="h-full" />
  );
};

export default PreviewFrame;
