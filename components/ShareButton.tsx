"use client";

import { useState } from "react";

interface ShareButtonProps {
    title: string;
    url: string;
    description?: string;
}

export default function ShareButton({
    title,
    url,
    description,
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description || title,
                    url: url,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            setShowShareMenu(true);
        }
    };

    const shareOnWhatsApp = () => {
        const text = encodeURIComponent(
            `${title}\n\n${description || ""}\n\n${url}`
        );
        window.open(`https://wa.me/?text=${text}`, "_blank");
        setShowShareMenu(false);
    };

    const shareOnFacebook = () => {
        const shareUrl = encodeURIComponent(url);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            "_blank"
        );
        setShowShareMenu(false);
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent(title);
        const shareUrl = encodeURIComponent(url);
        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
            "_blank"
        );
        setShowShareMenu(false);
    };

    const shareOnTelegram = () => {
        const text = encodeURIComponent(`${title}\n\n${url}`);
        window.open(
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`,
            "_blank"
        );
        setShowShareMenu(false);
    };

    return (
        <div className="relative">
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                {/* Copy Link Button */}
                <button
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center px-3 py-2 sm:px-4 rounded-lg border transition-all duration-200 text-sm ${copied
                            ? "bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-700 dark:text-green-200"
                            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    title="Copy Link"
                >
                    {copied ? (
                        <>
                            <svg
                                className="w-4 h-4 sm:mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span className="hidden sm:inline ml-2">Copied!</span>
                            <span className="sm:hidden">✓</span>
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-4 h-4 sm:mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="hidden sm:inline ml-2">Copy Link</span>
                        </>
                    )}
                </button>

                {/* Share Button */}
                <button
                    onClick={handleNativeShare}
                    className="flex items-center justify-center px-3 py-2 sm:px-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
                    title="Share Resepi"
                >
                    <svg
                        className="w-4 h-4 sm:mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                    </svg>
                    <span className="hidden sm:inline ml-2">Share Resepi</span>
                </button>
            </div>

            {/* Share Menu Overlay */}
            {showShareMenu && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 z-40"
                        onClick={() => setShowShareMenu(false)}
                    />
                    <div className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                        <div className="p-2">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 px-3 py-2">
                                Share to:
                            </div>
                            <button
                                onClick={shareOnWhatsApp}
                                className="w-full flex items-center px-3 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200 rounded transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-4 sm:h-4 mr-3"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={shareOnFacebook}
                                className="w-full flex items-center px-3 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 rounded transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-4 sm:h-4 mr-3"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                            <button
                                onClick={shareOnTwitter}
                                className="w-full flex items-center px-3 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-900 hover:text-sky-700 dark:hover:text-sky-200 rounded transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-4 sm:h-4 mr-3"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Twitter
                            </button>
                            <button
                                onClick={shareOnTelegram}
                                className="w-full flex items-center px-3 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-cyan-50 dark:hover:bg-cyan-900 hover:text-cyan-700 dark:hover:text-cyan-200 rounded transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-4 sm:h-4 mr-3"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                                Telegram
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
