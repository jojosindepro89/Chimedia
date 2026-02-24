"use client";

import { CheckCircle, XCircle, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";

export default function ApiConfigPage() {
    // In a real app, these would come from the server/env
    // For now, we'll simulate checking their presence
    const apis = [
        {
            name: "API-Football (API-Sports)",
            description: "Main provider for predictions, fixtures, and live scores.",
            envKey: "API_SPORTS_KEY",
            present: true, // we know it's there from .env check earlier
            url: "https://dashboard.api-football.com/"
        },
        {
            name: "Football-Data.org",
            description: "Alternative provider for live scores and fixtures.",
            envKey: "FOOTBALL_DATA_API_KEY",
            present: false,
            url: "https://www.football-data.org/"
        }
    ];

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white uppercase mb-4">API Configuration</h1>
            <p className="text-gray-400 mb-8">
                Manage your sports data providers. Ensure your API keys are correctly set in your environment variables.
            </p>

            <div className="grid gap-6">
                {apis.map((api) => (
                    <div key={api.name} className="bg-zinc-900 border border-white/10 p-6 rounded-sm">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{api.name}</h3>
                                <p className="text-sm text-gray-400">{api.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {api.present ? (
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold uppercase tracking-wider">
                                        <CheckCircle className="w-3.5 h-3.5" /> Configured
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold uppercase tracking-wider">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Missing
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-black/50 p-4 border border-white/5 rounded flex items-center justify-between">
                                <div>
                                    <span className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Environment Variable</span>
                                    <code className="text-primary font-mono text-sm">{api.envKey}</code>
                                </div>
                                <a
                                    href={api.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 hover:underline"
                                >
                                    Get API Key <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            {!api.present && (
                                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded">
                                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <div className="text-sm text-gray-300">
                                        <p className="font-bold text-white mb-1 uppercase text-xs">Action Required</p>
                                        Please add this key to your <span className="text-white font-mono">.env</span> file or Vercel environment variables to enable this provider.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-zinc-900 border border-white/10 rounded-sm">
                <h3 className="text-white font-bold uppercase mb-4">How to add a new API</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
                    <li>Sign up for a provider using the links above.</li>
                    <li>Copy your API Key from their dashboard.</li>
                    <li>If testing locally, add it to your <code className="text-white font-mono">.env</code> file.</li>
                    <li>For live site, go to your <span className="text-white">Vercel Project Settings &gt; Environment Variables</span> and add the key.</li>
                    <li>Redeploy your application for the changes to take effect.</li>
                </ol>
            </div>
        </div>
    );
}
