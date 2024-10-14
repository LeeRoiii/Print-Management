import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

const QRPAGE: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [orderFormURL, setOrderFormURL] = useState(`${window.location.origin}/order-form?access=12345`);
    const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        generateQRCode();
    }, [orderFormURL]);

    const generateQRCode = () => {
        setLoading(true);
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, orderFormURL, { errorCorrectionLevel: 'H' }, (error: any) => {
                setLoading(false);
                if (error) {
                    console.error(error);
                    setMessage('Failed to generate QR code.');
                } else {
                    const canvas = canvasRef.current;
                    if (canvas) {
                        setQrCodeImage(canvas.toDataURL('image/png'));
                        setMessage('QR code generated successfully!');
                    }
                }
            });
        }
    };

    const handleRegenerateQRCode = () => {
        if (window.confirm('Are you sure you want to generate a new QR code?')) {
            setOrderFormURL(`${window.location.origin}/order-form?access=${new Date().getTime()}`);
            setMessage(null); // Clear previous messages
        }
    };

    const handleShareQRCode = () => {
        if (qrCodeImage) {
            const link = document.createElement('a');
            link.href = qrCodeImage;
            link.download = 'QRCode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setMessage('QR code downloaded successfully!');
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(orderFormURL).then(() => {
            setMessage('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            setMessage('Failed to copy the link.');
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">QR Code Generator</h1>
            <div className="mt-5 text-center">
                <h2 className="text-2xl font-bold mb-2">Scan to Order</h2>
                {loading ? (
                    <p className="text-blue-600">Generating QR Code...</p>
                ) : (
                    <>
                        <canvas
                            ref={canvasRef}
                            className="mx-auto border border-gray-300 rounded-md"
                            width={256}
                            height={256}
                        />
                        <p className="mt-2">Scan this QR code to access the order form.</p>
                    </>
                )}
                {message && <p className="mt-2 text-green-600">{message}</p>}
                <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleRegenerateQRCode}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Generate New QR Code
                    </button>
                    <button
                        onClick={handleShareQRCode}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg"
                    >
                        Save QR Code
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="bg-yellow-600 text-white px-6 py-3 rounded-lg"
                    >
                        Copy Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRPAGE;
