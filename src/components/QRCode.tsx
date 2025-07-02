"use client";

import { useEffect, useRef } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCode = ({ value, size = 128, className = "" }: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return;

      try {
        // Ensure we have a complete URL
        let completeUrl = value;
        
        // If it's a relative URL, make it absolute
        if (value.startsWith('/')) {
          completeUrl = `${window.location.origin}${value}`;
        }
        // If it doesn't start with http/https, assume it's relative
        else if (!value.startsWith('http://') && !value.startsWith('https://')) {
          completeUrl = `${window.location.origin}/${value}`;
        }

        // Dynamic import of qrcode library
        const QRCodeLib = await import('qrcode');
        
        await QRCodeLib.toCanvas(canvasRef.current, completeUrl, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [value, size]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      width={size}
      height={size}
    />
  );
};

export default QRCode; 